/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Remove_Member_ErrorInputs */

const en_settings_remove_member_error = /** @type {(inputs: Settings_Remove_Member_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to remove the member. Please try again later.`)
};

const zh_settings_remove_member_error = /** @type {(inputs: Settings_Remove_Member_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除成员失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to remove the member. Please try again later." |
*
* @param {Settings_Remove_Member_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_remove_member_error = /** @type {((inputs?: Settings_Remove_Member_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Remove_Member_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_remove_member_error(inputs)
	return zh_settings_remove_member_error(inputs)
});