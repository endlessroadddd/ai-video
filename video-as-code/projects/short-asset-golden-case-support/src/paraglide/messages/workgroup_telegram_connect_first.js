/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workgroup_Telegram_Connect_FirstInputs */

const en_workgroup_telegram_connect_first = /** @type {(inputs: Workgroup_Telegram_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add a Telegram community in Telegram settings before choosing workgroups.`)
};

const zh_workgroup_telegram_connect_first = /** @type {(inputs: Workgroup_Telegram_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先在 Telegram 设置中添加社区，再回来选择工作群。`)
};

/**
* | output |
* | --- |
* | "Add a Telegram community in Telegram settings before choosing workgroups." |
*
* @param {Workgroup_Telegram_Connect_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_telegram_connect_first = /** @type {((inputs?: Workgroup_Telegram_Connect_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Telegram_Connect_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_telegram_connect_first(inputs)
	return zh_workgroup_telegram_connect_first(inputs)
});