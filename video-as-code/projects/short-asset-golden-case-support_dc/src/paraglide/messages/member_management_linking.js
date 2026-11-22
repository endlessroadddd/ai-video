/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_LinkingInputs */

const en_member_management_linking = /** @type {(inputs: Member_Management_LinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Linking...`)
};

const zh_member_management_linking = /** @type {(inputs: Member_Management_LinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`绑定中...`)
};

/**
* | output |
* | --- |
* | "Linking..." |
*
* @param {Member_Management_LinkingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_linking = /** @type {((inputs?: Member_Management_LinkingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_LinkingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_linking(inputs)
	return zh_member_management_linking(inputs)
});