/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Workspace_Create_FailedInputs */

const en_service_workspace_create_failed = /** @type {(inputs: Service_Workspace_Create_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create the workspace. Please try again later.`)
};

const zh_service_workspace_create_failed = /** @type {(inputs: Service_Workspace_Create_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建工作区失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to create the workspace. Please try again later." |
*
* @param {Service_Workspace_Create_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workspace_create_failed = /** @type {((inputs?: Service_Workspace_Create_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workspace_Create_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_workspace_create_failed(inputs)
	return zh_service_workspace_create_failed(inputs)
});