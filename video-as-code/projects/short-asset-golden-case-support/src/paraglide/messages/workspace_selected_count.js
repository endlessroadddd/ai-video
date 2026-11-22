/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workspace_Selected_CountInputs */

const en_workspace_selected_count = /** @type {(inputs: Workspace_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup(s)`)
};

const zh_workspace_selected_count = /** @type {(inputs: Workspace_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个工作群`)
};

/**
* | output |
* | --- |
* | "{count} workgroup(s)" |
*
* @param {Workspace_Selected_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_selected_count = /** @type {((inputs: Workspace_Selected_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Selected_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_selected_count(inputs)
	return zh_workspace_selected_count(inputs)
});