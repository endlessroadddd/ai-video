/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Workgroup_Delete_FailedInputs */

const en_service_workgroup_delete_failed = /** @type {(inputs: Service_Workgroup_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to delete workgroup settings.`)
};

const zh_service_workgroup_delete_failed = /** @type {(inputs: Service_Workgroup_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除工作群设置失败。`)
};

/**
* | output |
* | --- |
* | "Failed to delete workgroup settings." |
*
* @param {Service_Workgroup_Delete_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workgroup_delete_failed = /** @type {((inputs?: Service_Workgroup_Delete_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workgroup_Delete_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_workgroup_delete_failed(inputs)
	return zh_service_workgroup_delete_failed(inputs)
});