/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Empty_SyncedInputs */

const en_feishu_empty_synced = /** @type {(inputs: Feishu_Empty_SyncedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No synced Feishu groups yet.`)
};

const zh_feishu_empty_synced = /** @type {(inputs: Feishu_Empty_SyncedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前暂无已同步的飞书群聊。`)
};

/**
* | output |
* | --- |
* | "No synced Feishu groups yet." |
*
* @param {Feishu_Empty_SyncedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_empty_synced = /** @type {((inputs?: Feishu_Empty_SyncedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Empty_SyncedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_empty_synced(inputs)
	return zh_feishu_empty_synced(inputs)
});