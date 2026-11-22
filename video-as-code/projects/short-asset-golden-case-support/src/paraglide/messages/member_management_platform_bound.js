/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_BoundInputs */

const en_member_management_platform_bound = /** @type {(inputs: Member_Management_Platform_BoundInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} account linked.`)
};

const zh_member_management_platform_bound = /** @type {(inputs: Member_Management_Platform_BoundInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 账号已绑定。`)
};

/**
* | output |
* | --- |
* | "{platform} account linked." |
*
* @param {Member_Management_Platform_BoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_platform_bound = /** @type {((inputs: Member_Management_Platform_BoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Platform_BoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_platform_bound(inputs)
	return zh_member_management_platform_bound(inputs)
});