/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Workspace_Create_Missing_Company_IdInputs */

const en_service_workspace_create_missing_company_id = /** @type {(inputs: Service_Workspace_Create_Missing_Company_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace creation succeeded, but the company ID was missing.`)
};

const zh_service_workspace_create_missing_company_id = /** @type {(inputs: Service_Workspace_Create_Missing_Company_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建工作区成功，但未获取到公司 ID。`)
};

/**
* | output |
* | --- |
* | "Workspace creation succeeded, but the company ID was missing." |
*
* @param {Service_Workspace_Create_Missing_Company_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_workspace_create_missing_company_id = /** @type {((inputs?: Service_Workspace_Create_Missing_Company_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Workspace_Create_Missing_Company_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_workspace_create_missing_company_id(inputs)
	return zh_service_workspace_create_missing_company_id(inputs)
});