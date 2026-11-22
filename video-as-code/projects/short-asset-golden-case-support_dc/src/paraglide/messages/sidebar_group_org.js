/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Group_OrgInputs */

const en_sidebar_group_org = /** @type {(inputs: Sidebar_Group_OrgInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Organization`)
};

const zh_sidebar_group_org = /** @type {(inputs: Sidebar_Group_OrgInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组织`)
};

/**
* | output |
* | --- |
* | "Organization" |
*
* @param {Sidebar_Group_OrgInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_group_org = /** @type {((inputs?: Sidebar_Group_OrgInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Group_OrgInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_group_org(inputs)
	return zh_sidebar_group_org(inputs)
});