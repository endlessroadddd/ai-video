/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Discord_ReadyInputs */

const en_workgroup_discord_ready = /** @type {(inputs: Workgroup_Discord_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discord is connected. You can continue selecting workgroups.`)
};

const zh_workgroup_discord_ready = /** @type {(inputs: Workgroup_Discord_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已关联 Discord，可继续选择工作群。`)
};

/**
* | output |
* | --- |
* | "Discord is connected. You can continue selecting workgroups." |
*
* @param {Workgroup_Discord_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_ready = /** @type {((inputs?: Workgroup_Discord_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_discord_ready(inputs)
	return zh_workgroup_discord_ready(inputs)
});