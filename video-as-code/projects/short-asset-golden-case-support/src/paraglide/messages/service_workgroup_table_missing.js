/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Workgroup_Table_MissingInputs */

const en_service_workgroup_table_missing = /** @type {(inputs: Service_Workgroup_Table_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The workgroup settings table has not been created yet. Please apply the latest database migration first.`)
};

const zh_service_workgroup_table_missing = /** @type {(inputs: Service_Workgroup_Table_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置表尚未创建，请先执行最新数据库迁移。`)
};

/**
* | output |
* | --- |
* | "The workgroup settings table has not been created yet. Please apply the latest database migration first." |
*
* @param {Service_Workgroup_Table_MissingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_table_missing = /** @type {((inputs?: Service_Workgroup_Table_MissingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Table_MissingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_workgroup_table_missing(inputs)
	return zh_service_workgroup_table_missing(inputs)
});