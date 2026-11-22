/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ page: NonNullable<unknown>, totalPages: NonNullable<unknown>, total: NonNullable<unknown> }} Client_Chat_Page_StatusInputs */

const en_client_chat_page_status = /** @type {(inputs: Client_Chat_Page_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.page}/${i?.totalPages} · total ${i?.total}`)
};

const zh_client_chat_page_status = /** @type {(inputs: Client_Chat_Page_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.page}/${i?.totalPages} · 共 ${i?.total}`)
};

/**
* | output |
* | --- |
* | "{page}/{totalPages} · total {total}" |
*
* @param {Client_Chat_Page_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_page_status = /** @type {((inputs: Client_Chat_Page_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Page_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_page_status(inputs)
	return zh_client_chat_page_status(inputs)
});