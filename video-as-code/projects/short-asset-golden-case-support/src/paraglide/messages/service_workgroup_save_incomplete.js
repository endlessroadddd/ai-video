/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Workgroup_Save_IncompleteInputs */

const en_service_workgroup_save_incomplete = /** @type {(inputs: Service_Workgroup_Save_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup settings were saved, but the returned data is incomplete.`)
};

const zh_service_workgroup_save_incomplete = /** @type {(inputs: Service_Workgroup_Save_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作群设置保存成功，但返回数据不完整。`)
};

/**
* | output |
* | --- |
* | "Workgroup settings were saved, but the returned data is incomplete." |
*
* @param {Service_Workgroup_Save_IncompleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_save_incomplete = /** @type {((inputs?: Service_Workgroup_Save_IncompleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Save_IncompleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_workgroup_save_incomplete(inputs)
	return zh_service_workgroup_save_incomplete(inputs)
});