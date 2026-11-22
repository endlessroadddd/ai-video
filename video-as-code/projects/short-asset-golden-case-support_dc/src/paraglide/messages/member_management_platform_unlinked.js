/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_UnlinkedInputs */

const en_member_management_platform_unlinked = /** @type {(inputs: Member_Management_Platform_UnlinkedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} account not linked.`)
};

const zh_member_management_platform_unlinked = /** @type {(inputs: Member_Management_Platform_UnlinkedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`未绑定 ${i?.platform} 账号。`)
};

/**
* | output |
* | --- |
* | "{platform} account not linked." |
*
* @param {Member_Management_Platform_UnlinkedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_platform_unlinked = /** @type {((inputs: Member_Management_Platform_UnlinkedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Platform_UnlinkedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_platform_unlinked(inputs)
	return zh_member_management_platform_unlinked(inputs)
});