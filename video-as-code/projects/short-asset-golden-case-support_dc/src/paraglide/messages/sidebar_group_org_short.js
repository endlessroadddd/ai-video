/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Group_Org_ShortInputs */

const en_sidebar_group_org_short = /** @type {(inputs: Sidebar_Group_Org_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Org`)
};

const zh_sidebar_group_org_short = /** @type {(inputs: Sidebar_Group_Org_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组织`)
};

/**
* | output |
* | --- |
* | "Org" |
*
* @param {Sidebar_Group_Org_ShortInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_org_short = /** @type {((inputs?: Sidebar_Group_Org_ShortInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_Org_ShortInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_group_org_short(inputs)
	return zh_sidebar_group_org_short(inputs)
});