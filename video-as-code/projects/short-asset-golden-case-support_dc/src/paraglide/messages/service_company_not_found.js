/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Service_Company_Not_FoundInputs */

const en_service_company_not_found = /** @type {(inputs: Service_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current company info was not found. Refresh and try again.`)
};

const zh_service_company_not_found = /** @type {(inputs: Service_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到当前公司信息，请刷新后重试。`)
};

/**
* | output |
* | --- |
* | "Current company info was not found. Refresh and try again." |
*
* @param {Service_Company_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const service_company_not_found = /** @type {((inputs?: Service_Company_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Service_Company_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_service_company_not_found(inputs)
	return zh_service_company_not_found(inputs)
});