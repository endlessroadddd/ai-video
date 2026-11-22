/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Telegram_ReadyInputs */

const en_workgroup_telegram_ready = /** @type {(inputs: Workgroup_Telegram_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Telegram communities bound. You can continue selecting workgroups.`)
};

const zh_workgroup_telegram_ready = /** @type {(inputs: Workgroup_Telegram_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已绑定 ${i?.count} 个 Telegram 社区，可继续选择工作群。`)
};

/**
* | output |
* | --- |
* | "{count} Telegram communities bound. You can continue selecting workgroups." |
*
* @param {Workgroup_Telegram_ReadyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workgroup_telegram_ready = /** @type {((inputs: Workgroup_Telegram_ReadyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workgroup_Telegram_ReadyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workgroup_telegram_ready(inputs)
	return zh_workgroup_telegram_ready(inputs)
});