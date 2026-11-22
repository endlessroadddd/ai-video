/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Discord_Connect_FirstInputs */

const en_workgroup_discord_connect_first = /** @type {(inputs: Workgroup_Discord_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect a Discord community in Discord settings before choosing workgroups.`)
};

const zh_workgroup_discord_connect_first = /** @type {(inputs: Workgroup_Discord_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先在 Discord 设置中完成社区关联，再回来选择工作群。`)
};

/**
* | output |
* | --- |
* | "Connect a Discord community in Discord settings before choosing workgroups." |
*
* @param {Workgroup_Discord_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_connect_first = /** @type {((inputs?: Workgroup_Discord_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_discord_connect_first(inputs)
	return zh_workgroup_discord_connect_first(inputs)
});