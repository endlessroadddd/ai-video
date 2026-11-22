/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Select_CompanyInputs */

const en_client_chat_select_company = /** @type {(inputs: Client_Chat_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first`)
};

const zh_client_chat_select_company = /** @type {(inputs: Client_Chat_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司`)
};

/**
* | output |
* | --- |
* | "Please select a company first" |
*
* @param {Client_Chat_Select_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_select_company = /** @type {((inputs?: Client_Chat_Select_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Select_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_select_company(inputs)
	return zh_client_chat_select_company(inputs)
});