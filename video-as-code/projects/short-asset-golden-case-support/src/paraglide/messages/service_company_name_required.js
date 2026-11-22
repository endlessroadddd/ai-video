/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Company_Name_RequiredInputs */

const en_service_company_name_required = /** @type {(inputs: Service_Company_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a company name.`)
};

const zh_service_company_name_required = /** @type {(inputs: Service_Company_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入公司名称。`)
};

/**
* | output |
* | --- |
* | "Please enter a company name." |
*
* @param {Service_Company_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_company_name_required = /** @type {((inputs?: Service_Company_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Company_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_company_name_required(inputs)
	return zh_service_company_name_required(inputs)
});