/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Ignore_Confirm_DescInputs */

const en_assist_tasks_ignore_confirm_desc = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`After ignoring, this event will be marked as ignored and removed from the pending list.`)
};

const zh_assist_tasks_ignore_confirm_desc = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略后该事件会被标记为“已忽略”，不会再出现在待处理列表中。`)
};

/**
* | output |
* | --- |
* | "After ignoring, this event will be marked as ignored and removed from the pending list." |
*
* @param {Assist_Tasks_Ignore_Confirm_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_confirm_desc = /** @type {((inputs?: Assist_Tasks_Ignore_Confirm_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_Confirm_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_ignore_confirm_desc(inputs)
	return zh_assist_tasks_ignore_confirm_desc(inputs)
});