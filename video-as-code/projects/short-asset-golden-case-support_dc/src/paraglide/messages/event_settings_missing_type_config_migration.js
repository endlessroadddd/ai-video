/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Settings_Missing_Type_Config_MigrationInputs */

const en_event_settings_missing_type_config_migration = /** @type {(inputs: Event_Settings_Missing_Type_Config_MigrationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The database has not finished the event_type_config migration, so this type config cannot be saved yet.`)
};

const zh_event_settings_missing_type_config_migration = /** @type {(inputs: Event_Settings_Missing_Type_Config_MigrationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库尚未完成 event_type_config 迁移，暂时无法保存类型配置。`)
};

/**
* | output |
* | --- |
* | "The database has not finished the event_type_config migration, so this type config cannot be saved yet." |
*
* @param {Event_Settings_Missing_Type_Config_MigrationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_settings_missing_type_config_migration = /** @type {((inputs?: Event_Settings_Missing_Type_Config_MigrationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Settings_Missing_Type_Config_MigrationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_settings_missing_type_config_migration(inputs)
	return zh_event_settings_missing_type_config_migration(inputs)
});