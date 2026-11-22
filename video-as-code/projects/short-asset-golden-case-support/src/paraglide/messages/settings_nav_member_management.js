/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Nav_Member_ManagementInputs */

const en_settings_nav_member_management = /** @type {(inputs: Settings_Nav_Member_ManagementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member Management`)
};

const zh_settings_nav_member_management = /** @type {(inputs: Settings_Nav_Member_ManagementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人员管理`)
};

/**
* | output |
* | --- |
* | "Member Management" |
*
* @param {Settings_Nav_Member_ManagementInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_nav_member_management = /** @type {((inputs?: Settings_Nav_Member_ManagementInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Nav_Member_ManagementInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_nav_member_management(inputs)
	return zh_settings_nav_member_management(inputs)
});