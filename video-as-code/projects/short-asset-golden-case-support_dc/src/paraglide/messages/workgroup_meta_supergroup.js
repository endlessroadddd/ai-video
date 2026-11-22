/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Meta_SupergroupInputs */

const en_workgroup_meta_supergroup = /** @type {(inputs: Workgroup_Meta_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supergroup`)
};

const zh_workgroup_meta_supergroup = /** @type {(inputs: Workgroup_Meta_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超级群组`)
};

/**
* | output |
* | --- |
* | "Supergroup" |
*
* @param {Workgroup_Meta_SupergroupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_meta_supergroup = /** @type {((inputs?: Workgroup_Meta_SupergroupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Meta_SupergroupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_meta_supergroup(inputs)
	return zh_workgroup_meta_supergroup(inputs)
});