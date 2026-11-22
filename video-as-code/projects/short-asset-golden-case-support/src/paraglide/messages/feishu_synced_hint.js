/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Feishu_Synced_HintInputs */

const en_feishu_synced_hint = /** @type {(inputs: Feishu_Synced_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu groups have been synced to the channel library. Go back to Workgroup Settings to mark them as workgroups.`)
};

const zh_feishu_synced_hint = /** @type {(inputs: Feishu_Synced_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`飞书群已同步到平台频道库，可回到“工作群设置”分区把它们标记为工作群。`)
};

/**
* | output |
* | --- |
* | "Feishu groups have been synced to the channel library. Go back to Workgroup Settings to mark them as workgroups." |
*
* @param {Feishu_Synced_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feishu_synced_hint = /** @type {((inputs?: Feishu_Synced_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feishu_Synced_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_feishu_synced_hint(inputs)
	return zh_feishu_synced_hint(inputs)
});