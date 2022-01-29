import { Injectable } from '@nestjs/common';
import { literal, Op } from 'sequelize';
import { Model, ModelCtor, ModelStatic } from 'sequelize-typescript';
import { OptionList } from '../interfaces/optionList';

@Injectable()
export class CrudService<T extends Model> {

	constructor(private readonly repository: ModelCtor<T>) { }

	async create(entity: T): Promise<T> {
		return this.repository.create(entity);
	}

	private buildWhereByFilter(filter: any = {}): any {
		if (!!filter.search) {
			let whereOr: any = [];
			let date = new Date(`${filter.search.split(/[.,\/ -]/)[1]}/${filter.search.split(/[.,\/ -]/)[0]}/${filter.search.split(/[.,\/ -]/)[2]}`);
			whereOr = [
				{ name: { [Op.substring]: filter.search } },
				{ email: { [Op.substring]: filter.search } },
			];

			if (!isNaN(date.getDate())) {
				whereOr.push({
					createdAt: {
						[Op.gte]: date,
						[Op.lt]: new Date(date.valueOf() + 24 * 60 * 60 * 1000),
					}
				});
			}

			if (!isNaN(parseInt(filter.search)) && !filter.search.includes('/')) whereOr.push({ id: parseInt(filter.search) });

			filter = { [Op.or]: whereOr, ...filter };
		}

		delete filter['search'];
		return filter;
	}

	private buildSelectByArray(fields: Array<string> = []): any {
		return fields;
	}

	async list(filter: any = {}, opt: OptionList = {}): Promise<Array<T>> {
		const options: any = {};
		if (!opt.limit) opt.limit = 10;

		options['order'] = literal(`${opt.sort || 'id'} ${opt.sortType || 'DESC'}`);
		options['where'] = this.buildWhereByFilter(filter);
		if (opt.limit > 0) options['limit'] = opt.limit;
		if (opt.page > 0) options['offset'] = opt.page * opt.limit;
		if (!!opt.fields && opt.fields.length > 0) options['attributes'] = this.buildSelectByArray(opt.fields);

		return this.repository.findAll(options);
	}

	async count(filter: any = {}): Promise<Number> {
		const options: any = {};
		options['where'] = this.buildWhereByFilter(filter);
		const result = await this.repository.count(options);
		return result[0].count;
	}

	async sum(field: string, filter: any = {}): Promise<Number> {
		const options: any = {};
		options['where'] = this.buildWhereByFilter(filter);

		const result = await this.repository.sum(field, options);
		return result;
	}

	async findOne(filter: any = {}, fields: Array<string> = []): Promise<T> {
		const options: any = {};
		options['where'] = this.buildWhereByFilter(filter);

		if (fields.length > 0) options['attributes'] = this.buildSelectByArray(fields);

		return this.repository.findOne(options);
	}

	async findById(id: number, fields: Array<string> = []): Promise<T> {
		return this.findOne({ id }, fields);
	}

	async findByEmail(email: string, fields: Array<string> = []): Promise<T> {
		return this.findOne({ email }, fields);
	}

	async updateById(id: number, fields: any): Promise<T> {
		let rep = await this.findById(id);
		for (const key in fields) {
			rep[key] = fields[key];
		}
		return rep.save();
	}

	async update(fields: any, where: any): Promise<[number, T[]]> {
		const options: any = {};
		options['where'] = where;
		return this.repository.update(fields, options);
	}

	async remove(id: number): Promise<void> {
		const filter: any = { id };

		const options: any = {};
		options['where'] = this.buildWhereByFilter(filter);
		await this.repository.destroy(options);
	}
}

