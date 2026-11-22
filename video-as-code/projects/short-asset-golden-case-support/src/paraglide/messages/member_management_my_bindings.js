/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_My_BindingsInputs */

const en_member_management_my_bindings = /** @type {(inputs: Member_Management_My_BindingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`My linked platform accounts`)
};

const zh_member_management_my_bindings = /** @type {(inputs: Member_Management_My_BindingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`我的平台账号关联`)
};

/**
* | output |
* | --- |
* | "My linked platform accounts" |
*
* @param {Member_Management_My_BindingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_my_bindings = /** @type {((inputs?: Member_Management_My_BindingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_My_BindingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_my_bindings(inputs)
	return zh_member_management_my_bindings(inputs)
});