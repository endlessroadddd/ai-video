/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_UnlinkingInputs */

const en_member_management_unlinking = /** @type {(inputs: Member_Management_UnlinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unlinking...`)
};

const zh_member_management_unlinking = /** @type {(inputs: Member_Management_UnlinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`解绑中...`)
};

/**
* | output |
* | --- |
* | "Unlinking..." |
*
* @param {Member_Management_UnlinkingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlinking = /** @type {((inputs?: Member_Management_UnlinkingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_UnlinkingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_unlinking(inputs)
	return zh_member_management_unlinking(inputs)
});