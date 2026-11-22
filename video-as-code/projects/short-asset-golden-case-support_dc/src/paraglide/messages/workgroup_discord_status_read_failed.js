/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Discord_Status_Read_FailedInputs */

const en_workgroup_discord_status_read_failed = /** @type {(inputs: Workgroup_Discord_Status_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Discord connection status.`)
};

const zh_workgroup_discord_status_read_failed = /** @type {(inputs: Workgroup_Discord_Status_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`读取 Discord 关联状态失败。`)
};

/**
* | output |
* | --- |
* | "Failed to load Discord connection status." |
*
* @param {Workgroup_Discord_Status_Read_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_discord_status_read_failed = /** @type {((inputs?: Workgroup_Discord_Status_Read_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Discord_Status_Read_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_discord_status_read_failed(inputs)
	return zh_workgroup_discord_status_read_failed(inputs)
});