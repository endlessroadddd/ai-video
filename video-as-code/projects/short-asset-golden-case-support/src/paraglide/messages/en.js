/* eslint-disable */
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} App_DescriptionInputs */
/** @typedef {{}} App_TitleInputs */
/** @typedef {{}} Auth_BackInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Callback_FailedInputs */
/** @typedef {{}} Auth_Callback_Invalid_LinkInputs */
/** @typedef {{}} Auth_Callback_Missing_SessionInputs */
/** @typedef {{}} Auth_Callback_Unknown_ErrorInputs */
/** @typedef {{}} Auth_Email_LabelInputs */
/** @typedef {{}} Auth_Email_LoginInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Email_Login_FailedInputs */
/** @typedef {{}} Auth_Email_PlaceholderInputs */
/** @typedef {{}} Auth_Email_RequiredInputs */
/** @typedef {{}} Auth_Get_Magic_LinkInputs */
/** @typedef {{}} Auth_Login_TitleInputs */
/** @typedef {{}} Auth_Login_With_GithubInputs */
/** @typedef {{}} Auth_Login_With_GoogleInputs */
/** @typedef {{}} Auth_Magic_Link_Sent_HintInputs */
/** @typedef {{ email: NonNullable<unknown> }} Auth_Magic_Link_Sent_ToInputs */
/** @typedef {{}} Auth_OrInputs */
/** @typedef {{}} Auth_Provider_GithubInputs */
/** @typedef {{}} Auth_Provider_GoogleInputs */
/** @typedef {{ provider: NonNullable<unknown>, message: NonNullable<unknown> }} Auth_Provider_Login_FailedInputs */
/** @typedef {{}} Auth_ResendInputs */
/** @typedef {{ seconds: NonNullable<unknown> }} Auth_Resend_CountdownInputs */
/** @typedef {{ message: NonNullable<unknown> }} Auth_Resend_Email_FailedInputs */
/** @typedef {{}} Auth_Unknown_Error_RetryInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_TitleInputs */
/** @typedef {{}} Assist_Tasks_Add_SupplementalInputs */
/** @typedef {{}} Assist_Tasks_Assignee_LabelInputs */
/** @typedef {{}} Assist_Tasks_Close_Event_DetailInputs */
/** @typedef {{}} Assist_Tasks_Close_Session_DetailInputs */
/** @typedef {{}} Assist_Tasks_Confirm_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Confirm_Reply_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Confirm_Reply_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Confirming_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Reject_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Reject_Reply_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Reject_Reply_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Rejecting_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Show_Suggested_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Hide_Suggested_ReplyInputs */
/** @typedef {{}} Assist_Tasks_Detail_Load_Failed_TitleInputs */
/** @typedef {{}} Assist_Tasks_Detail_Not_Found_DescInputs */
/** @typedef {{}} Assist_Tasks_Detail_Not_Found_TitleInputs */
/** @typedef {{}} Assist_Tasks_Empty_DescInputs */
/** @typedef {{}} Assist_Tasks_Empty_TitleInputs */
/** @typedef {{}} Assist_Tasks_Event_Detail_TitleInputs */
/** @typedef {{}} Assist_Tasks_Session_Detail_TitleInputs */
/** @typedef {{}} Assist_Tasks_Event_Load_FailedInputs */
/** @typedef {{}} Assist_Tasks_Filter_All_TypesInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_AllInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_IgnoredInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_LabelInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_PendingInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_ProcessingInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_ResolvedInputs */
/** @typedef {{}} Assist_Tasks_Filter_Status_Taken_OverInputs */
/** @typedef {{}} Assist_Tasks_Filter_Type_LabelInputs */
/** @typedef {{}} Assist_Tasks_IgnoreInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_ActionInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_DescInputs */
/** @typedef {{}} Assist_Tasks_Ignore_Confirm_TitleInputs */
/** @typedef {{}} Assist_Tasks_Ignore_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Ignore_SuccessInputs */
/** @typedef {{}} Assist_Tasks_IgnoringInputs */
/** @typedef {{}} Assist_Tasks_List_TitleInputs */
/** @typedef {{ message: NonNullable<unknown> }} Assist_Tasks_Messages_Load_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Message_Input_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Message_SendInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_PendingInputs */
/** @typedef {{}} Assist_Tasks_Message_Send_SuccessInputs */
/** @typedef {{}} Assist_Tasks_No_MessagesInputs */
/** @typedef {{}} Assist_Tasks_No_OwnerInputs */
/** @typedef {{}} Assist_Tasks_No_Owner_ShortInputs */
/** @typedef {{}} Assist_Tasks_No_SummaryInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_DaysInputs */
/** @typedef {{}} Assist_Tasks_Overdue_DefaultInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Overdue_HoursInputs */
/** @typedef {{}} Assist_Tasks_Participant_Avatar_AltInputs */
/** @typedef {{}} Assist_Tasks_Review_ConfirmedInputs */
/** @typedef {{}} Assist_Tasks_Review_PendingInputs */
/** @typedef {{}} Assist_Tasks_Review_Taken_OverInputs */
/** @typedef {{}} Assist_Tasks_ResolveInputs */
/** @typedef {{}} Assist_Tasks_Resolve_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Resolve_PendingInputs */
/** @typedef {{}} Assist_Tasks_Resolve_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Save_PendingInputs */
/** @typedef {{}} Assist_Tasks_Save_Supplemental_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Save_Supplemental_SuccessInputs */
/** @typedef {{}} Assist_Tasks_Search_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_Supplemental_PlaceholderInputs */
/** @typedef {{}} Assist_Tasks_TakeoverInputs */
/** @typedef {{}} Assist_Tasks_Takeover_ErrorInputs */
/** @typedef {{}} Assist_Tasks_Takeover_PendingInputs */
/** @typedef {{}} Assist_Tasks_Takeover_SuccessInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Timed_Out_CountInputs */
/** @typedef {{}} Assist_Tasks_Type_AdvertisementInputs */
/** @typedef {{}} Assist_Tasks_Type_Assign_RequestInputs */
/** @typedef {{}} Assist_Tasks_Type_Bug_ReportInputs */
/** @typedef {{}} Assist_Tasks_Type_Business_CooperationInputs */
/** @typedef {{}} Assist_Tasks_Type_Exception_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_FeedbackInputs */
/** @typedef {{}} Assist_Tasks_Type_Knowledge_RequestInputs */
/** @typedef {{}} Assist_Tasks_Type_Message_DeletionInputs */
/** @typedef {{}} Assist_Tasks_Type_Order_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_Payment_IssueInputs */
/** @typedef {{}} Assist_Tasks_Type_Product_FeedbackInputs */
/** @typedef {{}} Assist_Tasks_Type_UnknownInputs */
/** @typedef {{}} Assist_Tasks_Type_Unrecognized_InformationInputs */
/** @typedef {{}} Assist_Tasks_Type_Usage_IssueInputs */
/** @typedef {{}} Assist_Tasks_Unknown_ChannelInputs */
/** @typedef {{}} Assist_Tasks_Unnamed_TaskInputs */
/** @typedef {{}} Assist_Tasks_View_Adopted_KnowledgeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_View_Adopted_Knowledge_CountInputs */
/** @typedef {{ title: NonNullable<unknown> }} Assist_Tasks_View_ItemInputs */
/** @typedef {{}} Client_Chat_Attachment_AltInputs */
/** @typedef {{}} Client_Chat_Draft_SessionInputs */
/** @typedef {{}} Client_Chat_Draft_BadgeInputs */
/** @typedef {{}} Client_Chat_Loading_Session_TitleInputs */
/** @typedef {{}} Client_Chat_Empty_Brand_TitleInputs */
/** @typedef {{}} Client_Chat_Empty_SessionsInputs */
/** @typedef {{}} Client_Chat_Empty_Input_HintInputs */
/** @typedef {{ count: NonNullable<unknown> }} Client_Chat_Image_Count_LimitInputs */
/** @typedef {{}} Client_Chat_Image_OnlyInputs */
/** @typedef {{ size: NonNullable<unknown> }} Client_Chat_Image_Size_LimitInputs */
/** @typedef {{}} Client_Chat_History_SessionsInputs */
/** @typedef {{}} Client_Chat_Input_PlaceholderInputs */
/** @typedef {{}} Client_Chat_Load_Sessions_FailedInputs */
/** @typedef {{}} Client_Chat_Copy_MessageInputs */
/** @typedef {{}} Client_Chat_Copy_SuccessInputs */
/** @typedef {{}} Client_Chat_Copy_FailedInputs */
/** @typedef {{}} Client_Chat_Like_MessageInputs */
/** @typedef {{}} Client_Chat_Dislike_MessageInputs */
/** @typedef {{}} Client_Chat_Regenerate_MessageInputs */
/** @typedef {{}} Client_Chat_Lucius_NameInputs */
/** @typedef {{}} Client_Chat_MeInputs */
/** @typedef {{}} Client_Chat_More_ActionsInputs */
/** @typedef {{}} Client_Chat_New_SessionInputs */
/** @typedef {{}} Client_Chat_Next_PageInputs */
/** @typedef {{}} Client_Chat_No_MessagesInputs */
/** @typedef {{ page: NonNullable<unknown>, totalPages: NonNullable<unknown>, total: NonNullable<unknown> }} Client_Chat_Page_StatusInputs */
/** @typedef {{}} Client_Chat_Pin_SessionInputs */
/** @typedef {{}} Client_Chat_Preview_EmptyInputs */
/** @typedef {{}} Client_Chat_Preview_FallbackInputs */
/** @typedef {{}} Client_Chat_Preview_ImageInputs */
/** @typedef {{}} Client_Chat_Prev_PageInputs */
/** @typedef {{}} Client_Chat_Prompt_CapabilitiesInputs */
/** @typedef {{}} Client_Chat_Prompt_Invite_AgentInputs */
/** @typedef {{}} Client_Chat_Prompt_Role_DifferenceInputs */
/** @typedef {{}} Client_Chat_Prompt_Update_KnowledgeInputs */
/** @typedef {{ title: NonNullable<unknown> }} Client_Chat_Reply_Ready_DescriptionInputs */
/** @typedef {{}} Client_Chat_Reply_Ready_TitleInputs */
/** @typedef {{}} Client_Chat_ReplyingInputs */
/** @typedef {{}} Client_Chat_Remove_SessionInputs */
/** @typedef {{}} Client_Chat_Remove_Selected_ImageInputs */
/** @typedef {{}} Client_Chat_Rename_SessionInputs */
/** @typedef {{}} Client_Chat_Rename_Session_PromptInputs */
/** @typedef {{}} Client_Chat_SearchInputs */
/** @typedef {{}} Client_Chat_Search_EmptyInputs */
/** @typedef {{}} Client_Chat_Search_PlaceholderInputs */
/** @typedef {{}} Client_Chat_Search_TitleInputs */
/** @typedef {{}} Client_Chat_Select_CompanyInputs */
/** @typedef {{}} Client_Chat_Send_MessageInputs */
/** @typedef {{}} Client_Chat_Session_TodayInputs */
/** @typedef {{}} Client_Chat_Session_Week_AgoInputs */
/** @typedef {{}} Client_Chat_Session_YesterdayInputs */
/** @typedef {{}} Client_Chat_SendingInputs */
/** @typedef {{}} Client_Chat_Starred_SessionsInputs */
/** @typedef {{}} Client_Chat_SessionsInputs */
/** @typedef {{}} Client_Chat_TitleInputs */
/** @typedef {{}} Client_Chat_Unpin_SessionInputs */
/** @typedef {{}} Client_Chat_Upload_ImageInputs */
/** @typedef {{}} Client_Chat_User_FallbackInputs */
/** @typedef {{}} Client_Chat_View_ReplyInputs */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_CancelInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_CloseInputs */
/** @typedef {{}} Common_Coming_SoonInputs */
/** @typedef {{}} Common_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Hours_AgoInputs */
/** @typedef {{}} Common_Just_NowInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Minutes_AgoInputs */
/** @typedef {{}} Common_NextInputs */
/** @typedef {{}} Common_Next_StepInputs */
/** @typedef {{}} Common_RetryInputs */
/** @typedef {{}} Common_SaveInputs */
/** @typedef {{}} Common_SavingInputs */
/** @typedef {{}} Common_UnknownInputs */
/** @typedef {{}} Pwa_Install_AppInputs */
/** @typedef {{}} Language_LabelInputs */
/** @typedef {{}} Language_ZhInputs */
/** @typedef {{}} Language_EnInputs */
/** @typedef {{}} Header_Action_FilesInputs */
/** @typedef {{}} Header_Action_MenuInputs */
/** @typedef {{}} Header_Action_NotificationsInputs */
/** @typedef {{}} Header_BrandInputs */
/** @typedef {{}} Sidebar_Group_ServersInputs */
/** @typedef {{}} Sidebar_Group_SessionsInputs */
/** @typedef {{}} Sidebar_Group_OrgInputs */
/** @typedef {{}} Sidebar_Group_Org_ShortInputs */
/** @typedef {{}} Sidebar_Item_ConversationInputs */
/** @typedef {{}} Sidebar_Item_Agent_ConfigInputs */
/** @typedef {{}} Sidebar_Item_User_PortraitInputs */
/** @typedef {{}} Sidebar_Item_Community_ProfileInputs */
/** @typedef {{}} Sidebar_Item_User_ListInputs */
/** @typedef {{}} Sidebar_Item_Assist_TasksInputs */
/** @typedef {{}} Sidebar_Item_All_SessionsInputs */
/** @typedef {{}} Sidebar_Item_Ad_ReviewInputs */
/** @typedef {{}} Sidebar_Item_Client_ChatInputs */
/** @typedef {{}} Sidebar_Item_Knowledge_BaseInputs */
/** @typedef {{}} Sidebar_Item_Daily_ReportInputs */
/** @typedef {{}} Sidebar_SettingsInputs */
/** @typedef {{}} Sidebar_Sign_OutInputs */
/** @typedef {{}} Sidebar_Not_Logged_InInputs */
/** @typedef {{}} Sidebar_Company_Not_FoundInputs */
/** @typedef {{}} Sidebar_Select_CompanyInputs */
/** @typedef {{ count: NonNullable<unknown> }} Sidebar_Servers_CountInputs */
/** @typedef {{}} Kb_TitleInputs */
/** @typedef {{}} Kb_Tab_AllInputs */
/** @typedef {{}} Kb_Tab_DocsInputs */
/** @typedef {{}} Kb_Search_PlaceholderInputs */
/** @typedef {{}} Kb_UploadInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Total_CountInputs */
/** @typedef {{}} Kb_Filter_SourceInputs */
/** @typedef {{}} Kb_EmptyInputs */
/** @typedef {{}} Kb_Pick_Company_FirstInputs */
/** @typedef {{ message: NonNullable<unknown> }} Kb_Load_ErrorInputs */
/** @typedef {{}} Kb_Menu_EditInputs */
/** @typedef {{}} Kb_Menu_DeleteInputs */
/** @typedef {{}} Kb_Source_Official_DocInputs */
/** @typedef {{}} Kb_Source_Session_RecordInputs */
/** @typedef {{}} Kb_Source_ManualInputs */
/** @typedef {{}} Kb_Unknown_TitleInputs */
/** @typedef {{}} Header_Collapse_SidebarInputs */
/** @typedef {{}} Header_Email_LoginInputs */
/** @typedef {{}} Header_Loading_AuthInputs */
/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown>, total: NonNullable<unknown> }} Header_RowsInputs */
/** @typedef {{}} Header_PrevInputs */
/** @typedef {{}} Header_NextInputs */
/** @typedef {{}} Header_Open_Action_MenuInputs */
/** @typedef {{}} Header_SettingsInputs */
/** @typedef {{}} Header_User_Avatar_AltInputs */
/** @typedef {{}} Kb_Doc_TitleInputs */
/** @typedef {{}} Kb_Doc_Generated_CountInputs */
/** @typedef {{}} Kb_Doc_UploaderInputs */
/** @typedef {{}} Kb_Doc_Uploaded_AtInputs */
/** @typedef {{}} Kb_Docs_EmptyInputs */
/** @typedef {{}} Kb_Upload_Doc_TabInputs */
/** @typedef {{}} Kb_Upload_Manual_TabInputs */
/** @typedef {{}} Kb_Upload_Manual_PlaceholderInputs */
/** @typedef {{}} Kb_Upload_Doc_TodoInputs */
/** @typedef {{}} Kb_Upload_CancelInputs */
/** @typedef {{}} Kb_Upload_SubmitInputs */
/** @typedef {{}} Kb_UploadingInputs */
/** @typedef {{}} Kb_Upload_Manual_RequiredInputs */
/** @typedef {{}} Kb_Upload_Doc_ClickInputs */
/** @typedef {{}} Kb_Upload_Doc_Drag_HintInputs */
/** @typedef {{}} Kb_Upload_Doc_Format_HintInputs */
/** @typedef {{}} Kb_Upload_Doc_RequiredInputs */
/** @typedef {{}} Kb_Upload_Doc_Missing_Document_IdInputs */
/** @typedef {{}} Kb_Upload_Doc_TimeoutInputs */
/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Doc_FailedInputs */
/** @typedef {{ name: NonNullable<unknown> }} Kb_Upload_Doc_SelectedInputs */
/** @typedef {{}} Kb_Edit_TitleInputs */
/** @typedef {{}} Kb_Edit_CloseInputs */
/** @typedef {{}} Kb_Edit_Label_TitleInputs */
/** @typedef {{}} Kb_Edit_Label_ContentInputs */
/** @typedef {{}} Kb_Edit_SaveInputs */
/** @typedef {{}} Kb_Edit_SavingInputs */
/** @typedef {{}} Kb_Edit_Missing_TargetInputs */
/** @typedef {{}} Kb_Edit_Title_RequiredInputs */
/** @typedef {{}} Kb_Edit_Content_RequiredInputs */
/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Progress_StatusInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Generated_CountInputs */
/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Updated_CountInputs */
/** @typedef {{ index: NonNullable<unknown> }} Kb_Result_Chunk_PrefixInputs */
/** @typedef {{ document_id: NonNullable<unknown> }} Kb_Result_EmptyInputs */
/** @typedef {{}} Kb_Result_RegenerateInputs */
/** @typedef {{}} Kb_Result_RegeneratingInputs */
/** @typedef {{}} Kb_Result_ConfirmInputs */
/** @typedef {{}} Knowledge_Doc_Processing_TimeoutInputs */
/** @typedef {{}} Knowledge_Document_Status_Load_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunk_AttemptsInputs */
/** @typedef {{}} Knowledge_Failed_Chunk_Heading_FallbackInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_EmptyInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_Select_AllInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunks_Selected_CountInputs */
/** @typedef {{}} Knowledge_Failed_Chunks_TitleInputs */
/** @typedef {{}} Knowledge_Retry_All_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Retry_Failed_Chunks_StartedInputs */
/** @typedef {{}} Knowledge_Retry_Selected_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs */
/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Retry_Selected_Failed_Chunks_StartedInputs */
/** @typedef {{}} Knowledge_Retrying_Failed_ChunksInputs */
/** @typedef {{}} Knowledge_Upload_Progress_PrefixInputs */
/** @typedef {{}} Knowledge_Upload_Status_CompletedInputs */
/** @typedef {{}} Knowledge_Upload_Status_FailedInputs */
/** @typedef {{}} Knowledge_Upload_Status_ProcessingInputs */
/** @typedef {{}} Knowledge_Upload_Status_UploadingInputs */
/** @typedef {{}} Onboarding_Company_Init_ErrorInputs */
/** @typedef {{}} Onboarding_Company_Load_ErrorInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Onboarding_Company_Name_Length_ErrorInputs */
/** @typedef {{}} Onboarding_Company_Name_LabelInputs */
/** @typedef {{}} Onboarding_Company_Name_PlaceholderInputs */
/** @typedef {{}} Onboarding_Company_Description_LabelInputs */
/** @typedef {{}} Onboarding_Company_Description_PlaceholderInputs */
/** @typedef {{}} Onboarding_Company_Save_ErrorInputs */
/** @typedef {{}} Onboarding_Company_SavedInputs */
/** @typedef {{}} Onboarding_Company_Setup_SubtitleInputs */
/** @typedef {{}} Onboarding_Company_Setup_TitleInputs */
/** @typedef {{}} Onboarding_Company_Submit_Create_ContinueInputs */
/** @typedef {{}} Onboarding_Company_Submit_NextInputs */
/** @typedef {{}} Onboarding_Company_Website_LabelInputs */
/** @typedef {{}} Onboarding_Company_Welcome_SubtitleInputs */
/** @typedef {{}} Onboarding_Company_Welcome_TitleInputs */
/** @typedef {{}} Onboarding_Profile_Gate_ErrorInputs */
/** @typedef {{}} Profile_Avatar_Must_Be_ImageInputs */
/** @typedef {{}} Profile_Avatar_Preview_AltInputs */
/** @typedef {{ size: NonNullable<unknown> }} Profile_Avatar_Size_LimitInputs */
/** @typedef {{}} Profile_Choose_AvatarInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Display_Name_Length_ErrorInputs */
/** @typedef {{}} Profile_Enter_NicknameInputs */
/** @typedef {{}} Profile_Init_FailedInputs */
/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Profile_Nickname_HintInputs */
/** @typedef {{}} Profile_Nickname_LabelInputs */
/** @typedef {{}} Profile_Nickname_PlaceholderInputs */
/** @typedef {{}} Profile_Required_Display_NameInputs */
/** @typedef {{}} Profile_Save_ErrorInputs */
/** @typedef {{}} Profile_Save_SuccessInputs */
/** @typedef {{}} Profile_Platform_Accounts_TitleInputs */
/** @typedef {{}} Profile_Platform_Account_ConnectInputs */
/** @typedef {{}} Profile_Platform_Account_DisconnectInputs */
/** @typedef {{}} Profile_Platform_Account_UnavailableInputs */
/** @typedef {{}} Platform_DiscordInputs */
/** @typedef {{}} Platform_FeishuInputs */
/** @typedef {{}} Platform_SlackInputs */
/** @typedef {{}} Platform_TelegramInputs */
/** @typedef {{}} Platform_UnknownInputs */
/** @typedef {{}} Role_AdminInputs */
/** @typedef {{}} Role_AssistantInputs */
/** @typedef {{}} Role_BotInputs */
/** @typedef {{}} Role_LuciusInputs */
/** @typedef {{}} Role_StaffInputs */
/** @typedef {{}} Role_UnknownInputs */
/** @typedef {{}} Role_UserInputs */
/** @typedef {{}} Settings_Back_To_AppInputs */
/** @typedef {{}} Settings_Nav_Event_SettingsInputs */
/** @typedef {{}} Settings_Nav_ManagementInputs */
/** @typedef {{}} Settings_Nav_Member_ManagementInputs */
/** @typedef {{}} Settings_Nav_PackageInputs */
/** @typedef {{}} Settings_Nav_Profile_SettingsInputs */
/** @typedef {{}} Settings_Nav_Usage_HistoryInputs */
/** @typedef {{}} Settings_Nav_User_CommunitiesInputs */
/** @typedef {{}} Settings_Nav_Workgroup_SettingsInputs */
/** @typedef {{}} Settings_Select_Company_FirstInputs */
/** @typedef {{}} Settings_TitleInputs */
/** @typedef {{}} Common_AddInputs */
/** @typedef {{ count: NonNullable<unknown> }} Common_Days_AgoInputs */
/** @typedef {{}} Common_DeleteInputs */
/** @typedef {{}} Common_EditInputs */
/** @typedef {{}} Common_NoneInputs */
/** @typedef {{}} Common_OpenInputs */
/** @typedef {{}} Common_PreviousInputs */
/** @typedef {{}} Common_RefreshInputs */
/** @typedef {{}} Common_RefreshingInputs */
/** @typedef {{}} Common_Unknown_UserInputs */
/** @typedef {{}} Platform_WebsiteInputs */
/** @typedef {{}} Role_MemberInputs */
/** @typedef {{}} Role_OwnerInputs */
/** @typedef {{}} Workspace_Settings_TitleInputs */
/** @typedef {{}} Workspace_State_ReadyInputs */
/** @typedef {{}} Workspace_State_Needs_ConnectionInputs */
/** @typedef {{}} Workspace_State_UnavailableInputs */
/** @typedef {{}} Workspace_Empty_ReadyInputs */
/** @typedef {{}} Workspace_Empty_UnavailableInputs */
/** @typedef {{}} Workspace_Empty_Needs_ConnectionInputs */
/** @typedef {{}} Workspace_StaleInputs */
/** @typedef {{}} Workspace_Save_PendingInputs */
/** @typedef {{}} Workspace_BadgeInputs */
/** @typedef {{}} Workspace_RemoveInputs */
/** @typedef {{}} Workspace_SetInputs */
/** @typedef {{}} Workspace_ReadonlyInputs */
/** @typedef {{}} Workspace_Navigate_Platform_SettingsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workspace_Selected_CountInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workspace_Add_SuccessInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workspace_Remove_SuccessInputs */
/** @typedef {{}} Workspace_Select_Company_ErrorInputs */
/** @typedef {{}} Workspace_Permission_ErrorInputs */
/** @typedef {{}} Workspace_Save_ErrorInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workspace_Summary_SelectedInputs */
/** @typedef {{}} Workspace_Summary_DescriptionInputs */
/** @typedef {{}} Workspace_Permission_EditableInputs */
/** @typedef {{}} Workspace_Permission_ReadonlyInputs */
/** @typedef {{}} Workspace_Member_Readonly_HintInputs */
/** @typedef {{}} Feishu_Settings_TitleInputs */
/** @typedef {{}} Feishu_Default_Chat_TypeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Discovered_CandidatesInputs */
/** @typedef {{}} Feishu_No_Available_CandidatesInputs */
/** @typedef {{}} Feishu_Synced_HintInputs */
/** @typedef {{}} Feishu_Manage_HintInputs */
/** @typedef {{}} Feishu_Readonly_HintInputs */
/** @typedef {{}} Feishu_Empty_SyncedInputs */
/** @typedef {{}} Feishu_Bot_Add_ButtonInputs */
/** @typedef {{}} Feishu_Bot_Summary_Connected_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Connected_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Default_TitleInputs */
/** @typedef {{}} Feishu_Bot_Summary_Default_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Channels_Bound_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Summary_Channels_Bound_HintInputs */
/** @typedef {{}} Feishu_Bot_Summary_Last_Error_TitleInputs */
/** @typedef {{}} Feishu_Bot_Summary_Last_Error_HintInputs */
/** @typedef {{}} Feishu_Bot_Member_Readonly_HintInputs */
/** @typedef {{}} Feishu_Bot_Empty_TitleInputs */
/** @typedef {{}} Feishu_Bot_Empty_Manage_HintInputs */
/** @typedef {{}} Feishu_Bot_Empty_Readonly_HintInputs */
/** @typedef {{}} Feishu_Bot_Dialog_Create_TitleInputs */
/** @typedef {{}} Feishu_Bot_Dialog_Edit_TitleInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_Default_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Enabled_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HintInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_ShowInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotate_Secret_HideInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_LabelInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs */
/** @typedef {{}} Feishu_Bot_Form_Name_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Id_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_App_Secret_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_Rotated_Secret_RequiredInputs */
/** @typedef {{}} Feishu_Bot_Form_SubmittingInputs */
/** @typedef {{}} Feishu_Bot_CreateInputs */
/** @typedef {{}} Feishu_Bot_Default_BadgeInputs */
/** @typedef {{}} Feishu_Bot_Status_ActiveInputs */
/** @typedef {{}} Feishu_Bot_Status_DisabledInputs */
/** @typedef {{}} Feishu_Bot_Status_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Status_PendingInputs */
/** @typedef {{}} Feishu_Bot_Action_VerifyInputs */
/** @typedef {{}} Feishu_Bot_Action_VerifyingInputs */
/** @typedef {{}} Feishu_Bot_Action_RestartInputs */
/** @typedef {{}} Feishu_Bot_Action_RestartingInputs */
/** @typedef {{}} Feishu_Bot_Action_EnableInputs */
/** @typedef {{}} Feishu_Bot_Action_DisableInputs */
/** @typedef {{}} Feishu_Bot_Action_UpdatingInputs */
/** @typedef {{}} Feishu_Bot_Meta_Verified_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Connected_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Heartbeat_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_Event_AtInputs */
/** @typedef {{}} Feishu_Bot_Meta_NeverInputs */
/** @typedef {{}} Feishu_Bot_Last_Error_LabelInputs */
/** @typedef {{}} Feishu_Bot_Assigned_Channels_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Feishu_Bot_Assigned_Channels_CountInputs */
/** @typedef {{}} Feishu_Bot_Assigned_Channels_EmptyInputs */
/** @typedef {{}} Feishu_Bot_Create_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Update_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Save_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Verify_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Verify_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Enable_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Enable_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Restart_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Restart_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Disable_SuccessInputs */
/** @typedef {{}} Feishu_Bot_Disable_ErrorInputs */
/** @typedef {{}} Feishu_Bot_Restart_Confirm_TitleInputs */
/** @typedef {{}} Feishu_Bot_Restart_Confirm_DescriptionInputs */
/** @typedef {{}} Feishu_Bot_Disable_Confirm_TitleInputs */
/** @typedef {{}} Feishu_Bot_Disable_Confirm_DescriptionInputs */
/** @typedef {{}} Billing_Usage_TitleInputs */
/** @typedef {{}} Billing_Current_PeriodInputs */
/** @typedef {{ key: NonNullable<unknown> }} Billing_Period_KeyInputs */
/** @typedef {{}} Billing_Period_Key_LaterInputs */
/** @typedef {{}} Billing_Used_Actions_TitleInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Blocked_ActionsInputs */
/** @typedef {{}} Billing_No_Blocked_ActionsInputs */
/** @typedef {{}} Billing_Overage_TitleInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Projected_OverageInputs */
/** @typedef {{}} Billing_No_Overage_YetInputs */
/** @typedef {{}} Billing_State_TitleInputs */
/** @typedef {{}} Billing_Estimated_Invoice_TitleInputs */
/** @typedef {{}} Billing_Auto_ChargeInputs */
/** @typedef {{}} Billing_Stop_ServiceInputs */
/** @typedef {{}} Billing_Stripe_Invoices_TitleInputs */
/** @typedef {{}} Billing_Stripe_Invoices_HintInputs */
/** @typedef {{}} Billing_Stripe_EmptyInputs */
/** @typedef {{}} Billing_Snapshot_TitleInputs */
/** @typedef {{}} Billing_Snapshot_HintInputs */
/** @typedef {{}} Billing_Snapshot_Export_TitleInputs */
/** @typedef {{}} Billing_Snapshot_ExportInputs */
/** @typedef {{}} Billing_Table_ProjectInputs */
/** @typedef {{}} Billing_Table_QuantityInputs */
/** @typedef {{}} Billing_Table_Unit_PriceInputs */
/** @typedef {{}} Billing_Table_AmountInputs */
/** @typedef {{}} Billing_Estimated_TotalInputs */
/** @typedef {{}} Billing_Period_Export_HintInputs */
/** @typedef {{}} Billing_Export_SuccessInputs */
/** @typedef {{}} Billing_Export_ErrorInputs */
/** @typedef {{}} Billing_Invoice_Status_PaidInputs */
/** @typedef {{}} Billing_Invoice_Status_OpenInputs */
/** @typedef {{}} Billing_Invoice_Status_VoidInputs */
/** @typedef {{}} Billing_Invoice_Status_UncollectibleInputs */
/** @typedef {{}} Billing_Invoice_Status_DraftInputs */
/** @typedef {{}} Billing_Invoice_Status_UnknownInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Created_OnInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Paid_OnInputs */
/** @typedef {{}} Billing_View_InvoiceInputs */
/** @typedef {{}} Billing_Download_InvoiceInputs */
/** @typedef {{}} Billing_Download_ReceiptInputs */
/** @typedef {{}} Billing_Plan_TitleInputs */
/** @typedef {{}} Billing_Display_Free_ActiveInputs */
/** @typedef {{}} Billing_Display_Free_Limit_ReachedInputs */
/** @typedef {{}} Billing_Display_Basic_TrialInputs */
/** @typedef {{}} Billing_Display_Basic_ActiveInputs */
/** @typedef {{}} Billing_Display_Basic_CancelingInputs */
/** @typedef {{}} Billing_Display_Pro_TrialInputs */
/** @typedef {{}} Billing_Display_Pro_ActiveInputs */
/** @typedef {{}} Billing_Display_Pro_CancelingInputs */
/** @typedef {{}} Billing_Display_Promo_Only_BasicInputs */
/** @typedef {{}} Billing_Display_Past_DueInputs */
/** @typedef {{}} Billing_Display_ExpiredInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Trial_Ends_OnInputs */
/** @typedef {{}} Billing_TrialingInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Ends_OnInputs */
/** @typedef {{}} Billing_Stop_After_PeriodInputs */
/** @typedef {{}} Billing_Limit_ReachedInputs */
/** @typedef {{}} Billing_Current_Period_NormalInputs */
/** @typedef {{ date: NonNullable<unknown> }} Billing_Next_BillingInputs */
/** @typedef {{}} Billing_Current_WorkspaceInputs */
/** @typedef {{}} Billing_Start_Basic_TrialInputs */
/** @typedef {{}} Billing_Start_Pro_TrialInputs */
/** @typedef {{}} Billing_Manage_Payment_MethodInputs */
/** @typedef {{}} Billing_Account_LabelInputs */
/** @typedef {{}} Billing_Metric_ProjectedInputs */
/** @typedef {{}} Billing_Metric_AdminsInputs */
/** @typedef {{}} Billing_Metric_PlatformsInputs */
/** @typedef {{}} Billing_Metric_OverageInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Monthly_PriceInputs */
/** @typedef {{}} Billing_Actions_LabelInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Actions_Included_MonthInputs */
/** @typedef {{ count: NonNullable<unknown>, amount: NonNullable<unknown> }} Billing_Overage_SummaryInputs */
/** @typedef {{}} Billing_No_Overage_FeeInputs */
/** @typedef {{ percent: NonNullable<unknown> }} Billing_Usage_RateInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_AdminInputs */
/** @typedef {{}} Billing_No_Extra_AdminInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Extra_PlatformInputs */
/** @typedef {{}} Billing_No_Extra_PlatformInputs */
/** @typedef {{}} Billing_Overage_Policy_TitleInputs */
/** @typedef {{}} Billing_Overage_Policy_SubtitleInputs */
/** @typedef {{}} Billing_Free_Fixed_Stop_ServiceInputs */
/** @typedef {{}} Billing_Policy_Stop_Service_TitleInputs */
/** @typedef {{}} Billing_Policy_Stop_Service_DescInputs */
/** @typedef {{}} Billing_Policy_Auto_Charge_TitleInputs */
/** @typedef {{}} Billing_Policy_Auto_Charge_DescInputs */
/** @typedef {{}} Billing_Monthly_Overage_CapInputs */
/** @typedef {{}} Billing_Example_CapInputs */
/** @typedef {{}} Billing_Save_PolicyInputs */
/** @typedef {{}} Billing_Current_PlanInputs */
/** @typedef {{ amount: NonNullable<unknown> }} Billing_Overage_Per_ActionInputs */
/** @typedef {{}} Billing_UnsupportedInputs */
/** @typedef {{ platform: NonNullable<unknown>, admin: NonNullable<unknown> }} Billing_Addon_SummaryInputs */
/** @typedef {{}} Billing_Start_TrialInputs */
/** @typedef {{}} Member_Management_TitleInputs */
/** @typedef {{}} Member_Management_Add_MemberInputs */
/** @typedef {{}} Member_Management_Table_IdInputs */
/** @typedef {{}} Member_Management_Table_PlatformsInputs */
/** @typedef {{}} Member_Management_Table_RoleInputs */
/** @typedef {{}} Member_Management_Table_Recent_ActivityInputs */
/** @typedef {{}} Member_Management_Table_ActionsInputs */
/** @typedef {{}} Member_Management_Remove_Current_UserInputs */
/** @typedef {{}} Member_Management_Remove_OwnerInputs */
/** @typedef {{}} Member_Management_Admin_Cancel_Member_Invite_OnlyInputs */
/** @typedef {{}} Member_Management_Admin_Remove_Member_OnlyInputs */
/** @typedef {{}} Member_Management_Owner_Only_ActionInputs */
/** @typedef {{}} Member_Management_Menu_Hint_Current_AccountInputs */
/** @typedef {{}} Member_Management_Menu_Hint_OwnerInputs */
/** @typedef {{}} Member_Management_Menu_Hint_No_PermissionInputs */
/** @typedef {{}} Member_Management_Update_Current_User_RoleInputs */
/** @typedef {{}} Member_Management_Update_Owner_RoleInputs */
/** @typedef {{}} Member_Management_Admin_Update_Member_Invite_OnlyInputs */
/** @typedef {{}} Member_Management_Admin_Update_Member_OnlyInputs */
/** @typedef {{}} Member_Management_Status_InvitedInputs */
/** @typedef {{}} Member_Management_Status_JoinedInputs */
/** @typedef {{}} Member_Management_Recent_Pending_JoinInputs */
/** @typedef {{}} Member_Management_Recent_UnrecordedInputs */
/** @typedef {{}} Member_Management_Fallback_NameInputs */
/** @typedef {{}} Member_Management_Invalid_EmailInputs */
/** @typedef {{}} Member_Management_Invite_ErrorInputs */
/** @typedef {{}} Member_Management_Role_Update_ErrorInputs */
/** @typedef {{}} Member_Management_Resend_ErrorInputs */
/** @typedef {{}} Member_Management_Link_Telegram_ErrorInputs */
/** @typedef {{}} Member_Management_Missing_Current_Member_BindInputs */
/** @typedef {{}} Member_Management_Link_Platform_ErrorInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_BoundInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_Bind_FailedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_UnlinkedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Oauth_Link_HintInputs */
/** @typedef {{}} Member_Management_Missing_Current_Member_UnbindInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_Platform_ErrorInputs */
/** @typedef {{}} Member_Management_Cancel_InviteInputs */
/** @typedef {{}} Member_Management_Remove_MemberInputs */
/** @typedef {{}} Member_Management_Actions_TitleInputs */
/** @typedef {{ email: NonNullable<unknown> }} Member_Management_Actions_Menu_AriaInputs */
/** @typedef {{ accounts: NonNullable<unknown> }} Member_Management_Accounts_LabelInputs */
/** @typedef {{}} Member_Management_UnlinkedInputs */
/** @typedef {{}} Member_Management_Adjust_Invite_RoleInputs */
/** @typedef {{}} Member_Management_Change_RoleInputs */
/** @typedef {{}} Member_Management_Resending_InviteInputs */
/** @typedef {{}} Member_Management_Resend_InviteInputs */
/** @typedef {{}} Member_Management_My_BindingsInputs */
/** @typedef {{}} Member_Management_No_Current_MemberInputs */
/** @typedef {{}} Member_Management_Linked_PlatformsInputs */
/** @typedef {{}} Member_Management_Telegram_LinkedInputs */
/** @typedef {{}} Member_Management_Telegram_UnlinkedInputs */
/** @typedef {{}} Member_Management_Telegram_UnavailableInputs */
/** @typedef {{}} Member_Management_UnlinkingInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_PlatformInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Login_And_LinkInputs */
/** @typedef {{}} Member_Management_LinkingInputs */
/** @typedef {{}} Member_Management_Binding_WaitInputs */
/** @typedef {{}} Member_Management_Invite_Dialog_TitleInputs */
/** @typedef {{}} Member_Management_Invite_Dialog_DescInputs */
/** @typedef {{}} Member_Management_Invite_Mode_LabelInputs */
/** @typedef {{}} Member_Management_Invite_Mode_EmailInputs */
/** @typedef {{}} Member_Management_Invite_Mode_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Mode_Link_HintInputs */
/** @typedef {{}} Member_Management_Email_LabelInputs */
/** @typedef {{}} Member_Management_Role_LabelInputs */
/** @typedef {{}} Member_Management_Role_PlaceholderInputs */
/** @typedef {{}} Member_Management_Generate_Invite_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Link_GeneratingInputs */
/** @typedef {{}} Member_Management_Copy_Invite_LinkInputs */
/** @typedef {{}} Member_Management_Invite_Link_LabelInputs */
/** @typedef {{}} Member_Management_Invite_Link_CopiedInputs */
/** @typedef {{}} Member_Management_Invite_Link_ErrorInputs */
/** @typedef {{}} Member_Management_Invite_Link_Copy_FailedInputs */
/** @typedef {{}} Member_Management_Send_InviteInputs */
/** @typedef {{}} Member_Management_Sending_InviteInputs */
/** @typedef {{ email: NonNullable<unknown>, role: NonNullable<unknown> }} Member_Management_Role_Dialog_DescInputs */
/** @typedef {{}} Member_Management_Role_Dialog_Empty_DescInputs */
/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_UpdateInputs */
/** @typedef {{ count: NonNullable<unknown>, limit: NonNullable<unknown> }} Member_Management_Admin_Quota_Full_InviteInputs */
/** @typedef {{}} Member_Management_Admin_Quota_HintInputs */
/** @typedef {{ name: NonNullable<unknown> }} Member_Management_Avatar_AltInputs */
/** @typedef {{}} Member_Management_Save_RoleInputs */
/** @typedef {{}} Member_Invite_Invalid_TitleInputs */
/** @typedef {{}} Member_Invite_Invalid_DescInputs */
/** @typedef {{}} Member_Invite_Switch_Account_ErrorInputs */
/** @typedef {{}} Member_Invite_Accept_ErrorInputs */
/** @typedef {{}} Member_Invite_BadgeInputs */
/** @typedef {{ role: NonNullable<unknown> }} Member_Invite_SummaryInputs */
/** @typedef {{}} Member_Invite_Role_LabelInputs */
/** @typedef {{}} Member_Invite_Expiry_LabelInputs */
/** @typedef {{}} Member_Invite_Status_LabelInputs */
/** @typedef {{}} Member_Invite_Joined_TitleInputs */
/** @typedef {{}} Member_Invite_Joined_DescInputs */
/** @typedef {{}} Member_Invite_Joined_BadgeInputs */
/** @typedef {{}} Member_Invite_Expired_TitleInputs */
/** @typedef {{}} Member_Invite_Expired_DescInputs */
/** @typedef {{}} Member_Invite_Cancelled_TitleInputs */
/** @typedef {{}} Member_Invite_Cancelled_DescInputs */
/** @typedef {{}} Member_Invite_Used_TitleInputs */
/** @typedef {{}} Member_Invite_Used_DescInputs */
/** @typedef {{}} Member_Invite_Email_Mismatch_TitleInputs */
/** @typedef {{ email: NonNullable<unknown> }} Member_Invite_Email_Mismatch_DescInputs */
/** @typedef {{}} Member_Invite_Ready_TitleInputs */
/** @typedef {{}} Member_Invite_Ready_DescInputs */
/** @typedef {{}} Member_Invite_Login_TitleInputs */
/** @typedef {{}} Member_Invite_Login_DescInputs */
/** @typedef {{}} Member_Invite_Open_WorkspaceInputs */
/** @typedef {{}} Member_Invite_Switching_AccountInputs */
/** @typedef {{}} Member_Invite_Switch_AccountInputs */
/** @typedef {{}} Member_Invite_AcceptingInputs */
/** @typedef {{}} Member_Invite_Accept_ActionInputs */
/** @typedef {{}} Member_Invite_Login_ActionInputs */
/** @typedef {{}} Member_Invite_Back_DashboardInputs */
/** @typedef {{}} Telegram_Widget_Load_ErrorInputs */
/** @typedef {{}} Telegram_Settings_GroupInputs */
/** @typedef {{}} Telegram_Settings_SupergroupInputs */
/** @typedef {{}} Telegram_Settings_ChannelInputs */
/** @typedef {{}} Telegram_Settings_PrivateInputs */
/** @typedef {{}} Telegram_Settings_UnknownInputs */
/** @typedef {{}} Telegram_Settings_Status_PendingInputs */
/** @typedef {{}} Telegram_Settings_Status_FulfilledInputs */
/** @typedef {{}} Telegram_Settings_Status_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Status_CancelledInputs */
/** @typedef {{}} Telegram_Settings_Status_FailedInputs */
/** @typedef {{}} Telegram_Settings_Load_Config_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Load_Bound_Channels_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Load_Candidates_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Session_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Select_Company_TopInputs */
/** @typedef {{}} Telegram_Settings_Login_SuccessInputs */
/** @typedef {{}} Telegram_Settings_Create_Session_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Create_Binding_Intent_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Auto_Bind_Success_NamedInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_SuccessInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_ExpiredInputs */
/** @typedef {{}} Telegram_Settings_Auto_Bind_IncompleteInputs */
/** @typedef {{}} Telegram_Settings_Poll_Status_ErrorInputs */
/** @typedef {{}} Telegram_Settings_Select_Company_FirstInputs */
/** @typedef {{}} Telegram_Settings_Open_Telegram_ConfirmInputs */
/** @typedef {{}} Telegram_Settings_Login_FirstInputs */
/** @typedef {{}} Telegram_Settings_Open_Telegram_Add_BotInputs */
/** @typedef {{}} Telegram_Settings_Add_CommunityInputs */
/** @typedef {{}} Telegram_Settings_Empty_With_CompanyInputs */
/** @typedef {{}} Telegram_Settings_Empty_Without_CompanyInputs */
/** @typedef {{}} Telegram_Settings_Dialog_TitleInputs */
/** @typedef {{}} Telegram_Settings_Step_LoginInputs */
/** @typedef {{}} Telegram_Settings_LoginInputs */
/** @typedef {{}} Telegram_Settings_Logging_InInputs */
/** @typedef {{}} Telegram_Settings_Integration_DisabledInputs */
/** @typedef {{}} Telegram_Settings_Verifying_LoginInputs */
/** @typedef {{ name: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_NameInputs */
/** @typedef {{ name: NonNullable<unknown>, username: NonNullable<unknown> }} Telegram_Settings_Logged_In_As_UsernameInputs */
/** @typedef {{}} Telegram_Settings_Step_Add_BotInputs */
/** @typedef {{ username: NonNullable<unknown> }} Telegram_Settings_Add_Bot_ButtonInputs */
/** @typedef {{}} Telegram_Settings_Step_Sync_CommunitiesInputs */
/** @typedef {{}} Telegram_Settings_Refresh_CommunitiesInputs */
/** @typedef {{}} Event_Settings_TitleInputs */
/** @typedef {{}} Event_Settings_Select_Company_FirstInputs */
/** @typedef {{}} Event_Settings_Add_TypeInputs */
/** @typedef {{}} Event_Settings_Trigger_Select_OwnerInputs */
/** @typedef {{}} Event_Settings_Trigger_Owner_UnboundInputs */
/** @typedef {{}} Event_Settings_Trigger_No_ChannelsInputs */
/** @typedef {{}} Event_Settings_Trigger_Select_ChannelInputs */
/** @typedef {{}} Event_Settings_Back_To_ListInputs */
/** @typedef {{}} Event_Settings_Detail_Title_NewInputs */
/** @typedef {{ name: NonNullable<unknown> }} Event_Settings_Detail_Title_ExistingInputs */
/** @typedef {{}} Event_Settings_Detail_Title_DefaultInputs */
/** @typedef {{}} Event_Settings_Type_Not_FoundInputs */
/** @typedef {{}} Event_Settings_Label_Type_KeyInputs */
/** @typedef {{}} Event_Settings_Label_Type_NameInputs */
/** @typedef {{}} Event_Settings_Label_Type_DescriptionInputs */
/** @typedef {{}} Event_Settings_Label_ResponsibleInputs */
/** @typedef {{}} Event_Settings_Select_ResponsibleInputs */
/** @typedef {{}} Event_Settings_Member_List_LabelInputs */
/** @typedef {{}} Event_Settings_No_MembersInputs */
/** @typedef {{ accounts: NonNullable<unknown> }} Event_Settings_Bound_AccountsInputs */
/** @typedef {{}} Event_Settings_Unbound_AccountsInputs */
/** @typedef {{}} Event_Settings_Label_Platform_ChannelsInputs */
/** @typedef {{}} Event_Settings_Platform_Channel_ListInputs */
/** @typedef {{}} Event_Settings_No_ChannelsInputs */
/** @typedef {{}} Event_Settings_Label_Send_NotificationInputs */
/** @typedef {{}} Event_Settings_Notify_Disabled_HintInputs */
/** @typedef {{}} Event_Settings_Notification_TargetsInputs */
/** @typedef {{}} Event_Settings_Notification_Targets_EmptyInputs */
/** @typedef {{}} Event_Settings_List_TitleInputs */
/** @typedef {{}} Event_Settings_List_EmptyInputs */
/** @typedef {{}} Event_Settings_System_BadgeInputs */
/** @typedef {{}} Event_Settings_Unnamed_TypeInputs */
/** @typedef {{}} Event_Type_Label_Exception_IssueInputs */
/** @typedef {{}} Event_Type_Label_Usage_IssueInputs */
/** @typedef {{}} Event_Type_Label_Order_IssueInputs */
/** @typedef {{}} Event_Type_Label_Business_CooperationInputs */
/** @typedef {{}} Event_Type_Label_Product_FeedbackInputs */
/** @typedef {{}} Event_Type_Label_Unrecognized_InformationInputs */
/** @typedef {{}} Event_Type_Label_AdvertisementInputs */
/** @typedef {{}} Event_Type_Label_Message_DeletionInputs */
/** @typedef {{}} Event_Settings_Read_Members_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Bindings_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Type_Config_ErrorInputs */
/** @typedef {{}} Event_Settings_Read_Notification_Target_ErrorInputs */
/** @typedef {{}} Event_Settings_Invalid_Type_KeyInputs */
/** @typedef {{}} Event_Settings_Type_Name_RequiredInputs */
/** @typedef {{}} Event_Settings_Missing_Type_Config_MigrationInputs */
/** @typedef {{}} Event_Settings_Save_Type_Config_ErrorInputs */
/** @typedef {{}} Event_Settings_Missing_Saved_Config_IdInputs */
/** @typedef {{}} Event_Settings_Members_Not_LoadedInputs */
/** @typedef {{}} Event_Settings_Channels_Not_LoadedInputs */
/** @typedef {{}} Event_Settings_Clear_Targets_ErrorInputs */
/** @typedef {{}} Event_Settings_Write_Target_ErrorInputs */
/** @typedef {{}} Event_Settings_SavedInputs */
/** @typedef {{}} Event_Settings_Save_ErrorInputs */
/** @typedef {{}} Event_Settings_Notify_OffInputs */
/** @typedef {{}} Event_Settings_Notify_OnInputs */
/** @typedef {{}} Integration_Status_Not_ConnectedInputs */
/** @typedef {{}} Integration_Status_Degraded_RetryInputs */
/** @typedef {{}} Integration_Status_ConnectedInputs */
/** @typedef {{}} Integration_Status_DisabledInputs */
/** @typedef {{}} Integration_Sync_SuccessInputs */
/** @typedef {{ channels: NonNullable<unknown>, roles: NonNullable<unknown> }} Integration_Sync_Success_Channels_RolesInputs */
/** @typedef {{ channels: NonNullable<unknown> }} Integration_Sync_Success_ChannelsInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_SuccessInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Connected_Backfill_DegradedInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Create_Install_ErrorInputs */
/** @typedef {{}} Integration_Manual_Sync_ErrorInputs */
/** @typedef {{}} Integration_Owner_Admin_OnlyInputs */
/** @typedef {{}} Integration_Add_CommunityInputs */
/** @typedef {{}} Integration_Empty_With_CompanyInputs */
/** @typedef {{}} Integration_Empty_Without_CompanyInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Dialog_TitleInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_Step_ConnectInputs */
/** @typedef {{}} Integration_Step_SyncInputs */
/** @typedef {{}} Integration_Step_RefreshInputs */
/** @typedef {{}} Integration_Creating_Install_LinkInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_ReconnectInputs */
/** @typedef {{ platform: NonNullable<unknown> }} Integration_ConnectInputs */
/** @typedef {{}} Integration_SyncingInputs */
/** @typedef {{}} Integration_Manual_SyncInputs */
/** @typedef {{}} Integration_Refresh_CommunitiesInputs */
/** @typedef {{}} Discord_Channel_TextInputs */
/** @typedef {{}} Discord_Channel_VoiceInputs */
/** @typedef {{}} Discord_Channel_CategoryInputs */
/** @typedef {{}} Discord_Channel_AnnouncementInputs */
/** @typedef {{}} Discord_Channel_StageInputs */
/** @typedef {{}} Discord_Channel_ForumInputs */
/** @typedef {{}} Discord_Channel_DefaultInputs */
/** @typedef {{}} Slack_Channel_PrivateInputs */
/** @typedef {{}} Slack_Channel_PublicInputs */
/** @typedef {{}} Slack_Channel_Direct_MessageInputs */
/** @typedef {{}} Slack_Channel_Multi_Person_DmInputs */
/** @typedef {{}} Slack_Channel_GroupInputs */
/** @typedef {{}} Slack_Channel_DefaultInputs */
/** @typedef {{}} Settings_Remove_Member_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Knowledge_Upload_CompletedInputs */
/** @typedef {{ url: NonNullable<unknown> }} Knowledge_Web_Crawl_CompletedInputs */
/** @typedef {{}} Knowledge_Close_Result_PanelInputs */
/** @typedef {{}} Knowledge_Close_Detail_PopupInputs */
/** @typedef {{}} Knowledge_Close_Document_PopupInputs */
/** @typedef {{}} Knowledge_Chunk_ListInputs */
/** @typedef {{}} Knowledge_Close_Image_PreviewInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_ActionInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_Desc_PrefixInputs */
/** @typedef {{}} Knowledge_Delete_Confirm_TitleInputs */
/** @typedef {{}} Knowledge_Delete_FailedInputs */
/** @typedef {{}} Knowledge_DeletingInputs */
/** @typedef {{}} Knowledge_Doc_Insight_TitleInputs */
/** @typedef {{}} Knowledge_Doc_TitleInputs */
/** @typedef {{}} Knowledge_Generated_CountInputs */
/** @typedef {{}} Knowledge_Image_AttachmentsInputs */
/** @typedef {{}} Knowledge_Image_Preview_HintInputs */
/** @typedef {{}} Knowledge_Load_Attachments_FailedInputs */
/** @typedef {{}} Knowledge_Load_Chunks_FailedInputs */
/** @typedef {{}} Knowledge_Manual_Knowledge_PrefixInputs */
/** @typedef {{}} Knowledge_No_Chunk_DataInputs */
/** @typedef {{}} Knowledge_No_Image_AttachmentsInputs */
/** @typedef {{}} Knowledge_No_Source_Document_UrlInputs */
/** @typedef {{}} Knowledge_PreviewInputs */
/** @typedef {{}} Knowledge_Role_AssistantInputs */
/** @typedef {{}} Knowledge_Role_UserInputs */
/** @typedef {{}} Knowledge_Search_PlaceholderInputs */
/** @typedef {{}} Knowledge_Session_Not_FoundInputs */
/** @typedef {{}} Knowledge_Source_FilterInputs */
/** @typedef {{}} Knowledge_Source_ManualInputs */
/** @typedef {{}} Knowledge_Source_Official_DocInputs */
/** @typedef {{}} Knowledge_Source_Web_CrawlInputs */
/** @typedef {{}} Knowledge_Source_Session_RecordInputs */
/** @typedef {{}} Knowledge_Source_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_HintInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Max_Depth_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Max_Pages_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_TabInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_LabelInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_PlaceholderInputs */
/** @typedef {{}} Knowledge_Upload_Crawl_Url_RequiredInputs */
/** @typedef {{}} Knowledge_Tab_DocsInputs */
/** @typedef {{}} Knowledge_Tab_ItemsInputs */
/** @typedef {{}} Knowledge_Total_Count_PrefixInputs */
/** @typedef {{}} Knowledge_Total_Count_SuffixInputs */
/** @typedef {{}} Knowledge_Total_PrefixInputs */
/** @typedef {{}} Knowledge_Type_SizeInputs */
/** @typedef {{}} Knowledge_Upload_Dialog_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Doc_ClickInputs */
/** @typedef {{}} Knowledge_Upload_Doc_Drag_HintInputs */
/** @typedef {{}} Knowledge_Upload_Doc_Format_HintInputs */
/** @typedef {{}} Knowledge_Upload_Doc_TabInputs */
/** @typedef {{}} Knowledge_Upload_KnowledgeInputs */
/** @typedef {{}} Knowledge_Upload_Manual_TabInputs */
/** @typedef {{}} Knowledge_Upload_Selected_Files_TitleInputs */
/** @typedef {{}} Knowledge_Upload_Selected_PrefixInputs */
/** @typedef {{}} Knowledge_Upload_SubmitInputs */
/** @typedef {{}} Knowledge_UploaderInputs */
/** @typedef {{}} Knowledge_Uploaded_AtInputs */
/** @typedef {{}} Knowledge_UploadingInputs */
/** @typedef {{}} Knowledge_View_DocumentInputs */
/** @typedef {{}} Knowledge_View_SourceInputs */
/** @typedef {{}} Session_Unknown_ChannelInputs */
/** @typedef {{}} App_Logo_AltInputs */
/** @typedef {{}} Onboarding_Company_Website_PlaceholderInputs */
/** @typedef {{}} Member_Management_Email_PlaceholderInputs */
/** @typedef {{}} Service_Login_RequiredInputs */
/** @typedef {{}} Service_Company_Update_Permission_DeniedInputs */
/** @typedef {{}} Service_Company_Not_FoundInputs */
/** @typedef {{}} Service_Company_Name_RequiredInputs */
/** @typedef {{}} Service_Workspace_Create_FailedInputs */
/** @typedef {{}} Service_Workspace_Create_Missing_Company_IdInputs */
/** @typedef {{}} Service_Avatar_Public_Url_MissingInputs */
/** @typedef {{}} Service_Profile_Name_ConflictInputs */
/** @typedef {{}} Service_Profile_Member_InactiveInputs */
/** @typedef {{}} Service_Discord_Request_FailedInputs */
/** @typedef {{}} Service_Slack_Request_FailedInputs */
/** @typedef {{}} Service_Telegram_Request_FailedInputs */
/** @typedef {{}} Service_Feishu_Channels_Read_FailedInputs */
/** @typedef {{}} Service_Member_Management_Request_FailedInputs */
/** @typedef {{}} Service_Member_Activity_Report_FailedInputs */
/** @typedef {{}} Service_Event_Action_Request_FailedInputs */
/** @typedef {{}} Service_Billing_Request_FailedInputs */
/** @typedef {{}} Service_Client_Chat_Request_FailedInputs */
/** @typedef {{}} Service_Workgroup_Table_MissingInputs */
/** @typedef {{}} Service_Workgroup_Fetch_FailedInputs */
/** @typedef {{}} Service_Workgroup_Save_FailedInputs */
/** @typedef {{}} Service_Workgroup_Save_IncompleteInputs */
/** @typedef {{}} Service_Workgroup_Delete_FailedInputs */
/** @typedef {{}} Service_Event_Query_Schema_Not_ExposedInputs */
/** @typedef {{ schemaName: NonNullable<unknown> }} Service_Event_Query_Schema_Permission_DeniedInputs */
/** @typedef {{}} Service_Event_Query_FailedInputs */
/** @typedef {{}} Service_Event_Detail_Request_FailedInputs */
/** @typedef {{}} Service_Event_Query_Empty_ContentInputs */
/** @typedef {{}} Common_Lucius_Ai_NameInputs */
/** @typedef {{}} Workgroup_Meta_SupergroupInputs */
/** @typedef {{}} Workgroup_Channel_Missing_From_PlatformInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_SelectedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_AvailableInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Summary_Saved_Needs_ConnectionInputs */
/** @typedef {{}} Workgroup_Summary_UnavailableInputs */
/** @typedef {{}} Workgroup_Summary_Needs_ConnectionInputs */
/** @typedef {{ name: NonNullable<unknown> }} Workgroup_Helper_Connected_NamedInputs */
/** @typedef {{}} Workgroup_Discord_ReadyInputs */
/** @typedef {{}} Workgroup_Discord_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Discord_Channels_Read_FailedInputs */
/** @typedef {{}} Workgroup_Discord_Status_Read_FailedInputs */
/** @typedef {{}} Workgroup_Slack_ReadyInputs */
/** @typedef {{}} Workgroup_Slack_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Slack_Channels_Read_FailedInputs */
/** @typedef {{}} Workgroup_Slack_Status_Read_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Telegram_ReadyInputs */
/** @typedef {{}} Workgroup_Telegram_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Telegram_Channels_Read_FailedInputs */
/** @typedef {{ count: NonNullable<unknown> }} Workgroup_Feishu_ReadyInputs */
/** @typedef {{}} Workgroup_Feishu_Connect_FirstInputs */
/** @typedef {{}} Workgroup_Feishu_Channels_Read_FailedInputs */
/** @typedef {{ status: NonNullable<unknown> }} Knowledge_Session_Load_FailedInputs */
/** @typedef {{}} Billing_Plan_Name_FreeInputs */
/** @typedef {{}} Billing_Plan_Name_BasicInputs */
/** @typedef {{}} Billing_Plan_Name_ProInputs */
/** @typedef {{}} Billing_Export_Base_Plan_LabelInputs */
/** @typedef {{ planName: NonNullable<unknown> }} Billing_Export_Base_Plan_DescriptionInputs */
/** @typedef {{}} Billing_Export_Base_Plan_QuantityInputs */
/** @typedef {{}} Billing_Export_Included_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Included_Actions_DescInputs */
/** @typedef {{}} Billing_Export_Used_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Used_Actions_Desc_OverInputs */
/** @typedef {{}} Billing_Export_Used_Actions_Desc_IncludedInputs */
/** @typedef {{}} Billing_Export_Extra_Admins_LabelInputs */
/** @typedef {{}} Billing_Export_Extra_Admins_DescInputs */
/** @typedef {{}} Billing_Export_Extra_Platforms_LabelInputs */
/** @typedef {{}} Billing_Export_Extra_Platforms_DescInputs */
/** @typedef {{}} Billing_Export_Overage_Actions_LabelInputs */
/** @typedef {{ mode: NonNullable<unknown> }} Billing_Export_Overage_Actions_DescInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_LabelInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_StopInputs */
/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_CapInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_ActionsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_AdminsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_PlatformsInputs */
/** @typedef {{}} Billing_Export_Csv_Account_IdInputs */
/** @typedef {{}} Billing_Export_Csv_Period_KeyInputs */
/** @typedef {{}} Billing_Export_Csv_Period_StartInputs */
/** @typedef {{}} Billing_Export_Csv_Period_EndInputs */
/** @typedef {{}} Billing_Export_Csv_PlanInputs */
/** @typedef {{}} Billing_Export_Csv_Overage_PolicyInputs */
/** @typedef {{}} Billing_Export_Csv_Projected_TotalInputs */
/** @typedef {{}} Billing_Export_Csv_CategoryInputs */
/** @typedef {{}} Billing_Export_Csv_DescriptionInputs */
/** @typedef {{}} Billing_Export_Csv_ChargeInputs */
/** @typedef {{}} Billing_Export_Csv_InfoInputs */
/** @typedef {{}} Billing_Export_Csv_Estimated_TotalInputs */
/** @typedef {{}} Cp_Page_TitleInputs */
/** @typedef {{}} Cp_Filter_CommunityInputs */
/** @typedef {{}} Cp_Filter_TimeInputs */
/** @typedef {{ count: NonNullable<unknown> }} Cp_All_CommunitiesInputs */
/** @typedef {{}} Cp_Time_7dInputs */
/** @typedef {{}} Cp_Time_14dInputs */
/** @typedef {{}} Cp_Time_30dInputs */
/** @typedef {{}} Cp_Section_MetricsInputs */
/** @typedef {{}} Cp_Total_UsersInputs */
/** @typedef {{}} Cp_Total_Users_HelperInputs */
/** @typedef {{}} Cp_New_UsersInputs */
/** @typedef {{ range: NonNullable<unknown> }} Cp_New_Users_HelperInputs */
/** @typedef {{}} Cp_Active_UsersInputs */
/** @typedef {{ range: NonNullable<unknown> }} Cp_Active_Users_HelperInputs */
/** @typedef {{}} Cp_Section_TrendsInputs */
/** @typedef {{}} Cp_Chart_Total_UsersInputs */
/** @typedef {{}} Cp_Chart_New_UsersInputs */
/** @typedef {{}} Cp_Chart_Active_UsersInputs */
/** @typedef {{}} Cp_No_Chart_DataInputs */
/** @typedef {{}} Ul_Page_TitleInputs */
/** @typedef {{}} Ul_No_DataInputs */
/** @typedef {{}} Ul_Platform_AllInputs */
/** @typedef {{}} Ul_Active_AllInputs */
/** @typedef {{}} Ul_Active_7dInputs */
/** @typedef {{}} Ul_Active_30dInputs */
/** @typedef {{}} Ul_Active_90dInputs */
/** @typedef {{}} Ul_Sort_Last_ActiveInputs */
/** @typedef {{}} Ul_Sort_Total_MessagesInputs */
/** @typedef {{}} Ul_Sort_Last_SummaryInputs */
/** @typedef {{}} Ul_Sort_Last_UpdatedInputs */
/** @typedef {{}} Ul_Sort_Created_AtInputs */
/** @typedef {{}} Ul_Sort_UsernameInputs */
/** @typedef {{}} Ul_Order_DescInputs */
/** @typedef {{}} Ul_Order_AscInputs */
/** @typedef {{}} Ul_Search_PlaceholderInputs */
/** @typedef {{}} Ul_Clear_FiltersInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_UsersInputs */
/** @typedef {{ start: NonNullable<unknown>, end: NonNullable<unknown> }} Ul_Showing_RangeInputs */
/** @typedef {{}} Ul_UpdatingInputs */
/** @typedef {{}} Ul_Pick_Company_FirstInputs */
/** @typedef {{}} Ul_Load_ErrorInputs */
/** @typedef {{}} Ul_Col_UserInputs */
/** @typedef {{}} Ul_Col_PlatformInputs */
/** @typedef {{}} Ul_Col_Total_MessagesInputs */
/** @typedef {{}} Ul_Col_First_InteractionInputs */
/** @typedef {{}} Ul_Col_Last_ActiveInputs */
/** @typedef {{}} Ul_Col_ProfileInputs */
/** @typedef {{}} Ul_Col_TagsInputs */
/** @typedef {{}} Ul_All_TagsInputs */
/** @typedef {{}} Ul_No_TagsInputs */
/** @typedef {{}} Ul_Min_MessagesInputs */
/** @typedef {{}} Ul_Sort_FieldInputs */
/** @typedef {{}} Ul_Sort_OrderInputs */
/** @typedef {{}} Ul_No_ProfileInputs */
/** @typedef {{}} Ul_Empty_ResultsInputs */
/** @typedef {{}} Ul_Detail_TitleInputs */
/** @typedef {{}} Ul_Close_DetailInputs */
/** @typedef {{}} Ul_Detail_First_InteractionInputs */
/** @typedef {{}} Ul_Detail_First_Interaction_HelperInputs */
/** @typedef {{}} Ul_Detail_Last_ActiveInputs */
/** @typedef {{}} Ul_Detail_Last_Active_HelperInputs */
/** @typedef {{}} Ul_Detail_ProfileInputs */
/** @typedef {{}} Ul_Detail_Profile_ExpandInputs */
/** @typedef {{}} Ul_Detail_Profile_CollapseInputs */
/** @typedef {{}} Ul_Detail_TagsInputs */
/** @typedef {{}} Ul_Detail_No_ReasonInputs */
/** @typedef {{}} Ul_Trend_Messages_TitleInputs */
/** @typedef {{}} Ul_Trend_Messages_DescInputs */
/** @typedef {{}} Ul_Trend_Active_TitleInputs */
/** @typedef {{}} Ul_Trend_Active_DescInputs */
/** @typedef {{}} Ul_Chat_RecordsInputs */
/** @typedef {{}} Ul_Loading_MessagesInputs */
/** @typedef {{}} Ul_Load_Messages_ErrorInputs */
/** @typedef {{}} Ul_No_MessagesInputs */
/** @typedef {{}} Ul_Empty_MessageInputs */
/** @typedef {{ channelId: NonNullable<unknown> }} Ul_ChannelInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Total_Messages_CountInputs */
/** @typedef {{}} Ul_Loading_DetailInputs */
/** @typedef {{}} Ul_Loading_Detail_DescInputs */
/** @typedef {{}} Ul_Detail_Load_ErrorInputs */
/** @typedef {{}} Ul_Retry_LaterInputs */
/** @typedef {{}} Ul_Tag_Manage_ButtonInputs */
/** @typedef {{}} Ul_Tag_Manage_TitleInputs */
/** @typedef {{}} Ul_Tag_Manage_DescInputs */
/** @typedef {{}} Ul_Tag_ExistingInputs */
/** @typedef {{ count: NonNullable<unknown> }} Ul_Tag_CountInputs */
/** @typedef {{}} Ul_Tag_LoadingInputs */
/** @typedef {{}} Ul_Tag_Load_ErrorInputs */
/** @typedef {{}} Ul_Tag_EmptyInputs */
/** @typedef {{}} Ul_Tag_Status_ActiveInputs */
/** @typedef {{}} Ul_Tag_Status_InactiveInputs */
/** @typedef {{}} Ul_Tag_Toggle_LabelInputs */
/** @typedef {{}} Ul_Tag_No_DescriptionInputs */
/** @typedef {{}} Ul_Tag_Create_TitleInputs */
/** @typedef {{}} Ul_Tag_Create_DescInputs */
/** @typedef {{}} Ul_Tag_Form_NameInputs */
/** @typedef {{}} Ul_Tag_Form_Name_PlaceholderInputs */
/** @typedef {{}} Ul_Tag_Form_Name_RequiredInputs */
/** @typedef {{}} Ul_Tag_Form_DescriptionInputs */
/** @typedef {{}} Ul_Tag_Form_Description_PlaceholderInputs */
/** @typedef {{}} Ul_Tag_Create_ButtonInputs */
/** @typedef {{}} Ul_Tag_Create_LoadingInputs */
/** @typedef {{}} Ul_Tag_Create_SuccessInputs */
/** @typedef {{}} Ul_Tag_Create_ErrorInputs */
/** @typedef {{}} Ul_Tag_Update_ErrorInputs */
/** @typedef {{}} Ul_Tag_Enable_SuccessInputs */
/** @typedef {{}} Ul_Tag_Disable_SuccessInputs */
/** @typedef {{}} Ul_Tag_Init_ButtonInputs */
/** @typedef {{}} Ul_Tag_Init_LoadingInputs */
/** @typedef {{}} Ul_Tag_Init_SuccessInputs */
/** @typedef {{}} Ul_Tag_Init_ErrorInputs */


export const app_description = /** @type {(inputs: App_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An autonomous AI teammate that learns from your community and works with your team, just like a real human would.`)
};

export const app_title = /** @type {(inputs: App_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

export const auth_back = /** @type {(inputs: Auth_BackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back`)
};

export const auth_callback_failed = /** @type {(inputs: Auth_Callback_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Callback failed: ${i?.message}`)
};

export const auth_callback_invalid_link = /** @type {(inputs: Auth_Callback_Invalid_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email link is invalid or has expired`)
};

export const auth_callback_missing_session = /** @type {(inputs: Auth_Callback_Missing_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No session was found. Please request a new magic link.`)
};

export const auth_callback_unknown_error = /** @type {(inputs: Auth_Callback_Unknown_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown callback error`)
};

export const auth_email_label = /** @type {(inputs: Auth_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email address`)
};

export const auth_email_login = /** @type {(inputs: Auth_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Login`)
};

export const auth_email_login_failed = /** @type {(inputs: Auth_Email_Login_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Email sign-in failed: ${i?.message}`)
};

export const auth_email_placeholder = /** @type {(inputs: Auth_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter your email address`)
};

export const auth_email_required = /** @type {(inputs: Auth_Email_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter your email address.`)
};

export const auth_get_magic_link = /** @type {(inputs: Auth_Get_Magic_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Get sign-in link`)
};

export const auth_login_title = /** @type {(inputs: Auth_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign up / Log in`)
};

export const auth_login_with_github = /** @type {(inputs: Auth_Login_With_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Continue with GitHub`)
};

export const auth_login_with_google = /** @type {(inputs: Auth_Login_With_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Continue with Google`)
};

export const auth_magic_link_sent_hint = /** @type {(inputs: Auth_Magic_Link_Sent_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click the link in the email to sign in.`)
};

export const auth_magic_link_sent_to = /** @type {(inputs: Auth_Magic_Link_Sent_ToInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Email sent to: ${i?.email}`)
};

export const auth_or = /** @type {(inputs: Auth_OrInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Or`)
};

export const auth_provider_github = /** @type {(inputs: Auth_Provider_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub`)
};

export const auth_provider_google = /** @type {(inputs: Auth_Provider_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Google`)
};

export const auth_provider_login_failed = /** @type {(inputs: Auth_Provider_Login_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.provider} sign-in failed: ${i?.message}`)
};

export const auth_resend = /** @type {(inputs: Auth_ResendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resend`)
};

export const auth_resend_countdown = /** @type {(inputs: Auth_Resend_CountdownInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Resend (${i?.seconds}s)`)
};

export const auth_resend_email_failed = /** @type {(inputs: Auth_Resend_Email_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to resend email: ${i?.message}`)
};

export const auth_unknown_error_retry = /** @type {(inputs: Auth_Unknown_Error_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown error. Please try again later.`)
};

export const assist_tasks_adopted_knowledge_load_error = /** @type {(inputs: Assist_Tasks_Adopted_Knowledge_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to load adopted knowledge: ${i?.message}`)
};

export const assist_tasks_adopted_knowledge_title = /** @type {(inputs: Assist_Tasks_Adopted_Knowledge_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Adopted Knowledge (${i?.count})`)
};

export const assist_tasks_add_supplemental = /** @type {(inputs: Assist_Tasks_Add_SupplementalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Supplemental Knowledge`)
};

export const assist_tasks_assignee_label = /** @type {(inputs: Assist_Tasks_Assignee_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assignee`)
};

export const assist_tasks_close_event_detail = /** @type {(inputs: Assist_Tasks_Close_Event_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close event details`)
};

export const assist_tasks_close_session_detail = /** @type {(inputs: Assist_Tasks_Close_Session_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close details`)
};

export const assist_tasks_confirm_reply = /** @type {(inputs: Assist_Tasks_Confirm_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm and Send`)
};

export const assist_tasks_confirm_reply_success = /** @type {(inputs: Assist_Tasks_Confirm_Reply_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suggested reply confirmed.`)
};

export const assist_tasks_confirm_reply_error = /** @type {(inputs: Assist_Tasks_Confirm_Reply_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to confirm reply. Please try again later.`)
};

export const assist_tasks_confirming_reply = /** @type {(inputs: Assist_Tasks_Confirming_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirming...`)
};

export const assist_tasks_reject_reply = /** @type {(inputs: Assist_Tasks_Reject_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismiss Suggestion`)
};

export const assist_tasks_reject_reply_success = /** @type {(inputs: Assist_Tasks_Reject_Reply_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suggested reply dismissed.`)
};

export const assist_tasks_reject_reply_error = /** @type {(inputs: Assist_Tasks_Reject_Reply_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to dismiss the suggested reply. Please try again later.`)
};

export const assist_tasks_rejecting_reply = /** @type {(inputs: Assist_Tasks_Rejecting_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dismissing...`)
};

export const assist_tasks_show_suggested_reply = /** @type {(inputs: Assist_Tasks_Show_Suggested_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Review Suggestion`)
};

export const assist_tasks_hide_suggested_reply = /** @type {(inputs: Assist_Tasks_Hide_Suggested_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Hide Suggestion`)
};

export const assist_tasks_detail_load_failed_title = /** @type {(inputs: Assist_Tasks_Detail_Load_Failed_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load event details`)
};

export const assist_tasks_detail_not_found_desc = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This event does not exist under the current company, or you do not have permission to view it.`)
};

export const assist_tasks_detail_not_found_title = /** @type {(inputs: Assist_Tasks_Detail_Not_Found_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event not found`)
};

export const assist_tasks_empty_desc = /** @type {(inputs: Assist_Tasks_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try clearing the keyword or switching filters.`)
};

export const assist_tasks_empty_title = /** @type {(inputs: Assist_Tasks_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No tasks match the current filters`)
};

export const assist_tasks_event_detail_title = /** @type {(inputs: Assist_Tasks_Event_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task Detail`)
};

export const assist_tasks_session_detail_title = /** @type {(inputs: Assist_Tasks_Session_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task Detail`)
};

export const assist_tasks_event_load_failed = /** @type {(inputs: Assist_Tasks_Event_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load events`)
};

export const assist_tasks_filter_all_types = /** @type {(inputs: Assist_Tasks_Filter_All_TypesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Types`)
};

export const assist_tasks_filter_status_all = /** @type {(inputs: Assist_Tasks_Filter_Status_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Statuses`)
};

export const assist_tasks_filter_status_ignored = /** @type {(inputs: Assist_Tasks_Filter_Status_IgnoredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignored`)
};

export const assist_tasks_filter_status_label = /** @type {(inputs: Assist_Tasks_Filter_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status filter`)
};

export const assist_tasks_filter_status_pending = /** @type {(inputs: Assist_Tasks_Filter_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending`)
};

export const assist_tasks_filter_status_processing = /** @type {(inputs: Assist_Tasks_Filter_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Processing`)
};

export const assist_tasks_filter_status_resolved = /** @type {(inputs: Assist_Tasks_Filter_Status_ResolvedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved`)
};

export const assist_tasks_filter_status_taken_over = /** @type {(inputs: Assist_Tasks_Filter_Status_Taken_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Taken Over`)
};

export const assist_tasks_filter_type_label = /** @type {(inputs: Assist_Tasks_Filter_Type_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type filter`)
};

export const assist_tasks_ignore = /** @type {(inputs: Assist_Tasks_IgnoreInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignore`)
};

export const assist_tasks_ignore_confirm_action = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm Ignore`)
};

export const assist_tasks_ignore_confirm_desc = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`After ignoring, this event will be marked as ignored and removed from the pending list.`)
};

export const assist_tasks_ignore_confirm_title = /** @type {(inputs: Assist_Tasks_Ignore_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignore this event?`)
};

export const assist_tasks_ignore_error = /** @type {(inputs: Assist_Tasks_Ignore_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to ignore the event. Please try again later.`)
};

export const assist_tasks_ignore_success = /** @type {(inputs: Assist_Tasks_Ignore_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event ignored.`)
};

export const assist_tasks_ignoring = /** @type {(inputs: Assist_Tasks_IgnoringInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignoring...`)
};

export const assist_tasks_list_title = /** @type {(inputs: Assist_Tasks_List_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event List`)
};

export const assist_tasks_messages_load_error = /** @type {(inputs: Assist_Tasks_Messages_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to load messages: ${i?.message}`)
};

export const assist_tasks_message_input_placeholder = /** @type {(inputs: Assist_Tasks_Message_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How should Lucius reply to the user?`)
};

export const assist_tasks_suggested_reply_input_placeholder = /** @type {(inputs: Assist_Tasks_Suggested_Reply_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit suggested reply...`)
};

export const assist_tasks_message_send = /** @type {(inputs: Assist_Tasks_Message_SendInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send to Lucius`)
};

export const assist_tasks_message_send_error = /** @type {(inputs: Assist_Tasks_Message_Send_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to send the message. Please try again later.`)
};

export const assist_tasks_message_send_pending = /** @type {(inputs: Assist_Tasks_Message_Send_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending...`)
};

export const assist_tasks_message_send_success = /** @type {(inputs: Assist_Tasks_Message_Send_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message sent.`)
};

export const assist_tasks_no_messages = /** @type {(inputs: Assist_Tasks_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`There is no message content to display for this event.`)
};

export const assist_tasks_no_owner = /** @type {(inputs: Assist_Tasks_No_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No owner`)
};

export const assist_tasks_no_owner_short = /** @type {(inputs: Assist_Tasks_No_Owner_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`N`)
};

export const assist_tasks_no_summary = /** @type {(inputs: Assist_Tasks_No_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No event summary`)
};

export const assist_tasks_overdue_days = /** @type {(inputs: Assist_Tasks_Overdue_DaysInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Overdue ${i?.count} day(s)`)
};

export const assist_tasks_overdue_default = /** @type {(inputs: Assist_Tasks_Overdue_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overdue`)
};

export const assist_tasks_overdue_hours = /** @type {(inputs: Assist_Tasks_Overdue_HoursInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Overdue ${i?.count} hour(s)`)
};

export const assist_tasks_participant_avatar_alt = /** @type {(inputs: Assist_Tasks_Participant_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Participant avatar`)
};

export const assist_tasks_review_confirmed = /** @type {(inputs: Assist_Tasks_Review_ConfirmedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manually Confirmed`)
};

export const assist_tasks_review_pending = /** @type {(inputs: Assist_Tasks_Review_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending Manual Review`)
};

export const assist_tasks_review_taken_over = /** @type {(inputs: Assist_Tasks_Review_Taken_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Taken Over`)
};

export const assist_tasks_resolve = /** @type {(inputs: Assist_Tasks_ResolveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved`)
};

export const assist_tasks_resolve_error = /** @type {(inputs: Assist_Tasks_Resolve_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to resolve the event. Please try again later.`)
};

export const assist_tasks_resolve_pending = /** @type {(inputs: Assist_Tasks_Resolve_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolving...`)
};

export const assist_tasks_resolve_success = /** @type {(inputs: Assist_Tasks_Resolve_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event resolved.`)
};

export const assist_tasks_save_pending = /** @type {(inputs: Assist_Tasks_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

export const assist_tasks_save_supplemental_error = /** @type {(inputs: Assist_Tasks_Save_Supplemental_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save supplemental knowledge. Please try again later.`)
};

export const assist_tasks_save_supplemental_success = /** @type {(inputs: Assist_Tasks_Save_Supplemental_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supplemental knowledge saved.`)
};

export const assist_tasks_search_placeholder = /** @type {(inputs: Assist_Tasks_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search keyword`)
};

export const assist_tasks_supplemental_placeholder = /** @type {(inputs: Assist_Tasks_Supplemental_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter supplemental knowledge...`)
};

export const assist_tasks_takeover = /** @type {(inputs: Assist_Tasks_TakeoverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Take Over Task`)
};

export const assist_tasks_takeover_error = /** @type {(inputs: Assist_Tasks_Takeover_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to take over the event. Please try again later.`)
};

export const assist_tasks_takeover_pending = /** @type {(inputs: Assist_Tasks_Takeover_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Taking over...`)
};

export const assist_tasks_takeover_success = /** @type {(inputs: Assist_Tasks_Takeover_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event taken over.`)
};

export const assist_tasks_timed_out_count = /** @type {(inputs: Assist_Tasks_Timed_Out_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Timed Out (${i?.count})`)
};

export const assist_tasks_type_advertisement = /** @type {(inputs: Assist_Tasks_Type_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Advertisement`)
};

export const assist_tasks_type_assign_request = /** @type {(inputs: Assist_Tasks_Type_Assign_RequestInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assignment Request`)
};

export const assist_tasks_type_bug_report = /** @type {(inputs: Assist_Tasks_Type_Bug_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bug Report`)
};

export const assist_tasks_type_business_cooperation = /** @type {(inputs: Assist_Tasks_Type_Business_CooperationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Business Cooperation`)
};

export const assist_tasks_type_exception_issue = /** @type {(inputs: Assist_Tasks_Type_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exception Issue`)
};

export const assist_tasks_type_feedback = /** @type {(inputs: Assist_Tasks_Type_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feedback`)
};

export const assist_tasks_type_knowledge_request = /** @type {(inputs: Assist_Tasks_Type_Knowledge_RequestInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Knowledge Request`)
};

export const assist_tasks_type_message_deletion = /** @type {(inputs: Assist_Tasks_Type_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message Deleted`)
};

export const assist_tasks_type_order_issue = /** @type {(inputs: Assist_Tasks_Type_Order_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Order Issue`)
};

export const assist_tasks_type_payment_issue = /** @type {(inputs: Assist_Tasks_Type_Payment_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Payment Issue`)
};

export const assist_tasks_type_product_feedback = /** @type {(inputs: Assist_Tasks_Type_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Product Feedback`)
};

export const assist_tasks_type_unknown = /** @type {(inputs: Assist_Tasks_Type_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Other Issue`)
};

export const assist_tasks_type_unrecognized_information = /** @type {(inputs: Assist_Tasks_Type_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unrecognized Information`)
};

export const assist_tasks_type_usage_issue = /** @type {(inputs: Assist_Tasks_Type_Usage_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage Issue`)
};

export const assist_tasks_unknown_channel = /** @type {(inputs: Assist_Tasks_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown channel`)
};

export const assist_tasks_unnamed_task = /** @type {(inputs: Assist_Tasks_Unnamed_TaskInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled task`)
};

export const assist_tasks_view_adopted_knowledge = /** @type {(inputs: Assist_Tasks_View_Adopted_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View adopted knowledge`)
};

export const assist_tasks_view_adopted_knowledge_count = /** @type {(inputs: Assist_Tasks_View_Adopted_Knowledge_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`View adopted knowledge, ${i?.count} item(s)`)
};

export const assist_tasks_view_item = /** @type {(inputs: Assist_Tasks_View_ItemInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`View task: ${i?.title}`)
};

export const client_chat_attachment_alt = /** @type {(inputs: Client_Chat_Attachment_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat attachment`)
};

export const client_chat_draft_session = /** @type {(inputs: Client_Chat_Draft_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled chat`)
};

export const client_chat_draft_badge = /** @type {(inputs: Client_Chat_Draft_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Draft`)
};

export const client_chat_loading_session_title = /** @type {(inputs: Client_Chat_Loading_Session_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading chat title`)
};

export const client_chat_empty_brand_title = /** @type {(inputs: Client_Chat_Empty_Brand_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius Client Agent`)
};

export const client_chat_empty_sessions = /** @type {(inputs: Client_Chat_Empty_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No chats yet. Click “New chat” to begin.`)
};

export const client_chat_empty_input_hint = /** @type {(inputs: Client_Chat_Empty_Input_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Which step should I click?`)
};

export const client_chat_image_count_limit = /** @type {(inputs: Client_Chat_Image_Count_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`You can upload up to ${i?.count} images.`)
};

export const client_chat_image_only = /** @type {(inputs: Client_Chat_Image_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only image files are supported.`)
};

export const client_chat_image_size_limit = /** @type {(inputs: Client_Chat_Image_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Images must be smaller than ${i?.size}.`)
};

export const client_chat_history_sessions = /** @type {(inputs: Client_Chat_History_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`History`)
};

export const client_chat_input_placeholder = /** @type {(inputs: Client_Chat_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type a message...`)
};

export const client_chat_load_sessions_failed = /** @type {(inputs: Client_Chat_Load_Sessions_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load sessions`)
};

export const client_chat_copy_message = /** @type {(inputs: Client_Chat_Copy_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy message`)
};

export const client_chat_copy_success = /** @type {(inputs: Client_Chat_Copy_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message copied.`)
};

export const client_chat_copy_failed = /** @type {(inputs: Client_Chat_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy message. Please try again.`)
};

export const client_chat_like_message = /** @type {(inputs: Client_Chat_Like_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Like message`)
};

export const client_chat_dislike_message = /** @type {(inputs: Client_Chat_Dislike_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dislike message`)
};

export const client_chat_regenerate_message = /** @type {(inputs: Client_Chat_Regenerate_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regenerate message`)
};

export const client_chat_lucius_name = /** @type {(inputs: Client_Chat_Lucius_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

export const client_chat_me = /** @type {(inputs: Client_Chat_MeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Me`)
};

export const client_chat_more_actions = /** @type {(inputs: Client_Chat_More_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`More actions`)
};

export const client_chat_new_session = /** @type {(inputs: Client_Chat_New_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New chat`)
};

export const client_chat_next_page = /** @type {(inputs: Client_Chat_Next_PageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

export const client_chat_no_messages = /** @type {(inputs: Client_Chat_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No messages yet`)
};

export const client_chat_page_status = /** @type {(inputs: Client_Chat_Page_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.page}/${i?.totalPages} · total ${i?.total}`)
};

export const client_chat_pin_session = /** @type {(inputs: Client_Chat_Pin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Star chat`)
};

export const client_chat_preview_empty = /** @type {(inputs: Client_Chat_Preview_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empty message`)
};

export const client_chat_preview_fallback = /** @type {(inputs: Client_Chat_Preview_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Session`)
};

export const client_chat_preview_image = /** @type {(inputs: Client_Chat_Preview_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`[Image]`)
};

export const client_chat_prev_page = /** @type {(inputs: Client_Chat_Prev_PageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous`)
};

export const client_chat_prompt_capabilities = /** @type {(inputs: Client_Chat_Prompt_CapabilitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What can Lucius do for me?`)
};

export const client_chat_prompt_invite_agent = /** @type {(inputs: Client_Chat_Prompt_Invite_AgentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How do I invite Lucius Agent into a user community?`)
};

export const client_chat_prompt_role_difference = /** @type {(inputs: Client_Chat_Prompt_Role_DifferenceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What is the difference between Lucius Agent roles?`)
};

export const client_chat_prompt_update_knowledge = /** @type {(inputs: Client_Chat_Prompt_Update_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How do I update knowledge in the knowledge base?`)
};

export const client_chat_reply_ready_description = /** @type {(inputs: Client_Chat_Reply_Ready_DescriptionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`A new reply is ready in “${i?.title}”.`)
};

export const client_chat_reply_ready_title = /** @type {(inputs: Client_Chat_Reply_Ready_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius has a new reply`)
};

export const client_chat_replying = /** @type {(inputs: Client_Chat_ReplyingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius is replying`)
};

export const client_chat_remove_session = /** @type {(inputs: Client_Chat_Remove_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove`)
};

export const client_chat_remove_selected_image = /** @type {(inputs: Client_Chat_Remove_Selected_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove selected image`)
};

export const client_chat_rename_session = /** @type {(inputs: Client_Chat_Rename_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rename`)
};

export const client_chat_rename_session_prompt = /** @type {(inputs: Client_Chat_Rename_Session_PromptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter a new chat title`)
};

export const client_chat_search = /** @type {(inputs: Client_Chat_SearchInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search`)
};

export const client_chat_search_empty = /** @type {(inputs: Client_Chat_Search_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No matching conversations`)
};

export const client_chat_search_placeholder = /** @type {(inputs: Client_Chat_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter keyword`)
};

export const client_chat_search_title = /** @type {(inputs: Client_Chat_Search_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search conversations`)
};

export const client_chat_select_company = /** @type {(inputs: Client_Chat_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first`)
};

export const client_chat_send_message = /** @type {(inputs: Client_Chat_Send_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send message`)
};

export const client_chat_session_today = /** @type {(inputs: Client_Chat_Session_TodayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Today`)
};

export const client_chat_session_week_ago = /** @type {(inputs: Client_Chat_Session_Week_AgoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A week ago`)
};

export const client_chat_session_yesterday = /** @type {(inputs: Client_Chat_Session_YesterdayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Yesterday`)
};

export const client_chat_sending = /** @type {(inputs: Client_Chat_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending`)
};

export const client_chat_starred_sessions = /** @type {(inputs: Client_Chat_Starred_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Starred`)
};

export const client_chat_sessions = /** @type {(inputs: Client_Chat_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sessions`)
};

export const client_chat_title = /** @type {(inputs: Client_Chat_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

export const client_chat_unpin_session = /** @type {(inputs: Client_Chat_Unpin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove star`)
};

export const client_chat_upload_image = /** @type {(inputs: Client_Chat_Upload_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload image`)
};

export const client_chat_user_fallback = /** @type {(inputs: Client_Chat_User_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User`)
};

export const client_chat_view_reply = /** @type {(inputs: Client_Chat_View_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View`)
};

export const common_back = /** @type {(inputs: Common_BackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back`)
};

export const common_cancel = /** @type {(inputs: Common_CancelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel`)
};

export const common_clear = /** @type {(inputs: Common_ClearInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear`)
};

export const common_close = /** @type {(inputs: Common_CloseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close`)
};

export const common_coming_soon = /** @type {(inputs: Common_Coming_SoonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Coming soon`)
};

export const common_error = /** @type {(inputs: Common_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error`)
};

export const common_hours_ago = /** @type {(inputs: Common_Hours_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} hour(s) ago`)
};

export const common_just_now = /** @type {(inputs: Common_Just_NowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Just now`)
};

export const common_minutes_ago = /** @type {(inputs: Common_Minutes_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} minute(s) ago`)
};

export const common_next = /** @type {(inputs: Common_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

export const common_next_step = /** @type {(inputs: Common_Next_StepInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

export const common_retry = /** @type {(inputs: Common_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry`)
};

export const common_save = /** @type {(inputs: Common_SaveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save`)
};

export const common_saving = /** @type {(inputs: Common_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

export const common_unknown = /** @type {(inputs: Common_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown`)
};

export const pwa_install_app = /** @type {(inputs: Pwa_Install_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install app`)
};

export const language_label = /** @type {(inputs: Language_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Language`)
};

export const language_zh = /** @type {(inputs: Language_ZhInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`中文`)
};

export const language_en = /** @type {(inputs: Language_EnInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`English`)
};

export const header_action_files = /** @type {(inputs: Header_Action_FilesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Files`)
};

export const header_action_menu = /** @type {(inputs: Header_Action_MenuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menu`)
};

export const header_action_notifications = /** @type {(inputs: Header_Action_NotificationsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notifications`)
};

export const header_brand = /** @type {(inputs: Header_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Brand`)
};

export const sidebar_group_servers = /** @type {(inputs: Sidebar_Group_ServersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Servers`)
};

export const sidebar_group_sessions = /** @type {(inputs: Sidebar_Group_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sessions`)
};

export const sidebar_group_org = /** @type {(inputs: Sidebar_Group_OrgInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Organization`)
};

export const sidebar_group_org_short = /** @type {(inputs: Sidebar_Group_Org_ShortInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Org`)
};

export const sidebar_item_conversation = /** @type {(inputs: Sidebar_Item_ConversationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

export const sidebar_item_agent_config = /** @type {(inputs: Sidebar_Item_Agent_ConfigInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agent Config`)
};

export const sidebar_item_user_portrait = /** @type {(inputs: Sidebar_Item_User_PortraitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User Portrait`)
};

export const sidebar_item_community_profile = /** @type {(inputs: Sidebar_Item_Community_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Community Profile`)
};

export const sidebar_item_user_list = /** @type {(inputs: Sidebar_Item_User_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User List`)
};

export const sidebar_item_assist_tasks = /** @type {(inputs: Sidebar_Item_Assist_TasksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tasks`)
};

export const sidebar_item_all_sessions = /** @type {(inputs: Sidebar_Item_All_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Sessions`)
};

export const sidebar_item_ad_review = /** @type {(inputs: Sidebar_Item_Ad_ReviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ads Moderation`)
};

export const sidebar_item_client_chat = /** @type {(inputs: Sidebar_Item_Client_ChatInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

export const sidebar_item_knowledge_base = /** @type {(inputs: Sidebar_Item_Knowledge_BaseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wiki`)
};

export const sidebar_item_daily_report = /** @type {(inputs: Sidebar_Item_Daily_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Daily Report`)
};

export const sidebar_settings = /** @type {(inputs: Sidebar_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

export const sidebar_sign_out = /** @type {(inputs: Sidebar_Sign_OutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign Out`)
};

export const sidebar_not_logged_in = /** @type {(inputs: Sidebar_Not_Logged_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not signed in`)
};

export const sidebar_company_not_found = /** @type {(inputs: Sidebar_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No company found`)
};

export const sidebar_select_company = /** @type {(inputs: Sidebar_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select company`)
};

export const sidebar_servers_count = /** @type {(inputs: Sidebar_Servers_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} organizations`)
};

export const kb_title = /** @type {(inputs: Kb_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wiki`)
};

export const kb_tab_all = /** @type {(inputs: Kb_Tab_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Knowledge`)
};

export const kb_tab_docs = /** @type {(inputs: Kb_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

export const kb_search_placeholder = /** @type {(inputs: Kb_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search keyword`)
};

export const kb_upload = /** @type {(inputs: Kb_UploadInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload`)
};

export const kb_total_count = /** @type {(inputs: Kb_Total_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Total ${i?.count}`)
};

export const kb_filter_source = /** @type {(inputs: Kb_Filter_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source`)
};

export const kb_empty = /** @type {(inputs: Kb_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No knowledge data`)
};

export const kb_pick_company_first = /** @type {(inputs: Kb_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company from the top-left first.`)
};

export const kb_load_error = /** @type {(inputs: Kb_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Knowledge load failed: ${i?.message}`)
};

export const kb_menu_edit = /** @type {(inputs: Kb_Menu_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

export const kb_menu_delete = /** @type {(inputs: Kb_Menu_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

export const kb_source_official_doc = /** @type {(inputs: Kb_Source_Official_DocInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Official Docs`)
};

export const kb_source_session_record = /** @type {(inputs: Kb_Source_Session_RecordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Session Record`)
};

export const kb_source_manual = /** @type {(inputs: Kb_Source_ManualInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual`)
};

export const kb_unknown_title = /** @type {(inputs: Kb_Unknown_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled knowledge`)
};

export const header_collapse_sidebar = /** @type {(inputs: Header_Collapse_SidebarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Collapse sidebar`)
};

export const header_email_login = /** @type {(inputs: Header_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Login`)
};

export const header_loading_auth = /** @type {(inputs: Header_Loading_AuthInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading auth`)
};

export const header_rows = /** @type {(inputs: Header_RowsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Rows ${i?.start}-${i?.end}, total ${i?.total}`)
};

export const header_prev = /** @type {(inputs: Header_PrevInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous page`)
};

export const header_next = /** @type {(inputs: Header_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next page`)
};

export const header_open_action_menu = /** @type {(inputs: Header_Open_Action_MenuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open action menu`)
};

export const header_settings = /** @type {(inputs: Header_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

export const header_user_avatar_alt = /** @type {(inputs: Header_User_Avatar_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User avatar`)
};

export const kb_doc_title = /** @type {(inputs: Kb_Doc_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Title`)
};

export const kb_doc_generated_count = /** @type {(inputs: Kb_Doc_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated Knowledge`)
};

export const kb_doc_uploader = /** @type {(inputs: Kb_Doc_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploader`)
};

export const kb_doc_uploaded_at = /** @type {(inputs: Kb_Doc_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploaded At`)
};

export const kb_docs_empty = /** @type {(inputs: Kb_Docs_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No document data`)
};

export const kb_upload_doc_tab = /** @type {(inputs: Kb_Upload_Doc_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload Document`)
};

export const kb_upload_manual_tab = /** @type {(inputs: Kb_Upload_Manual_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual`)
};

export const kb_upload_manual_placeholder = /** @type {(inputs: Kb_Upload_Manual_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter knowledge content`)
};

export const kb_upload_doc_todo = /** @type {(inputs: Kb_Upload_Doc_TodoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document upload will be wired to the upload endpoint next; manual mode is available now.`)
};

export const kb_upload_cancel = /** @type {(inputs: Kb_Upload_CancelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel`)
};

export const kb_upload_submit = /** @type {(inputs: Kb_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload`)
};

export const kb_uploading = /** @type {(inputs: Kb_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploading...`)
};

export const kb_upload_manual_required = /** @type {(inputs: Kb_Upload_Manual_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter content before uploading.`)
};

export const kb_upload_doc_click = /** @type {(inputs: Kb_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to upload`)
};

export const kb_upload_doc_drag_hint = /** @type {(inputs: Kb_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Or drag and drop files here`)
};

export const kb_upload_doc_format_hint = /** @type {(inputs: Kb_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supported file formats: pdf, doc, docx`)
};

export const kb_upload_doc_required = /** @type {(inputs: Kb_Upload_Doc_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a document before uploading.`)
};

export const kb_upload_doc_missing_document_id = /** @type {(inputs: Kb_Upload_Doc_Missing_Document_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload succeeded but document_id is missing. Please try again.`)
};

export const kb_upload_doc_timeout = /** @type {(inputs: Kb_Upload_Doc_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document processing timed out. Please check status in Documents later.`)
};

export const kb_upload_doc_failed = /** @type {(inputs: Kb_Upload_Doc_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Document processing failed (status: ${i?.status}).`)
};

export const kb_upload_doc_selected = /** @type {(inputs: Kb_Upload_Doc_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Selected: ${i?.name}`)
};

export const kb_edit_title = /** @type {(inputs: Kb_Edit_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit Knowledge`)
};

export const kb_edit_close = /** @type {(inputs: Kb_Edit_CloseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close edit modal`)
};

export const kb_edit_label_title = /** @type {(inputs: Kb_Edit_Label_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Title`)
};

export const kb_edit_label_content = /** @type {(inputs: Kb_Edit_Label_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Content`)
};

export const kb_edit_save = /** @type {(inputs: Kb_Edit_SaveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save`)
};

export const kb_edit_saving = /** @type {(inputs: Kb_Edit_SavingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

export const kb_edit_missing_target = /** @type {(inputs: Kb_Edit_Missing_TargetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No editable knowledge record found. Please try again.`)
};

export const kb_edit_title_required = /** @type {(inputs: Kb_Edit_Title_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a title before saving.`)
};

export const kb_edit_content_required = /** @type {(inputs: Kb_Edit_Content_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter content before saving.`)
};

export const kb_upload_progress_status = /** @type {(inputs: Kb_Upload_Progress_StatusInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Status: ${i?.status}`)
};

export const kb_result_generated_count = /** @type {(inputs: Kb_Result_Generated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Generated Knowledge (${i?.count})`)
};

export const kb_result_updated_count = /** @type {(inputs: Kb_Result_Updated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updated Knowledge (${i?.count})`)
};

export const kb_result_chunk_prefix = /** @type {(inputs: Kb_Result_Chunk_PrefixInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Chunk #${i?.index}`)
};

export const kb_result_empty = /** @type {(inputs: Kb_Result_EmptyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`No result to display (Document ID: ${i?.document_id})`)
};

export const kb_result_regenerate = /** @type {(inputs: Kb_Result_RegenerateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regenerate`)
};

export const kb_result_regenerating = /** @type {(inputs: Kb_Result_RegeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regenerating...`)
};

export const kb_result_confirm = /** @type {(inputs: Kb_Result_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm`)
};

export const knowledge_doc_processing_timeout = /** @type {(inputs: Knowledge_Doc_Processing_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document processing timeout`)
};

export const knowledge_document_status_load_failed = /** @type {(inputs: Knowledge_Document_Status_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load document status`)
};

export const knowledge_failed_chunk_attempts = /** @type {(inputs: Knowledge_Failed_Chunk_AttemptsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} attempt(s)`)
};

export const knowledge_failed_chunk_heading_fallback = /** @type {(inputs: Knowledge_Failed_Chunk_Heading_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled chunk`)
};

export const knowledge_failed_chunks_empty = /** @type {(inputs: Knowledge_Failed_Chunks_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No failed chunks in this document`)
};

export const knowledge_failed_chunks_select_all = /** @type {(inputs: Knowledge_Failed_Chunks_Select_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select all failed chunks`)
};

export const knowledge_failed_chunks_selected_count = /** @type {(inputs: Knowledge_Failed_Chunks_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} selected`)
};

export const knowledge_failed_chunks_title = /** @type {(inputs: Knowledge_Failed_Chunks_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed Chunks`)
};

export const knowledge_retry_all_failed_chunks = /** @type {(inputs: Knowledge_Retry_All_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry all failed chunks`)
};

export const knowledge_retry_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Failed_Chunks_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry started for failed chunks in this document`)
};

export const knowledge_retry_selected_failed_chunks = /** @type {(inputs: Knowledge_Retry_Selected_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry selected chunks`)
};

export const knowledge_retry_selected_failed_chunks_required = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select failed chunks to retry first`)
};

export const knowledge_retry_selected_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_StartedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry started for ${i?.count} failed chunk(s)`)
};

export const knowledge_retrying_failed_chunks = /** @type {(inputs: Knowledge_Retrying_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retrying...`)
};

export const knowledge_upload_progress_prefix = /** @type {(inputs: Knowledge_Upload_Progress_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status: `)
};

export const knowledge_upload_status_completed = /** @type {(inputs: Knowledge_Upload_Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`completed`)
};

export const knowledge_upload_status_failed = /** @type {(inputs: Knowledge_Upload_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`failed`)
};

export const knowledge_upload_status_processing = /** @type {(inputs: Knowledge_Upload_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`processing`)
};

export const knowledge_upload_status_uploading = /** @type {(inputs: Knowledge_Upload_Status_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`uploading`)
};

export const onboarding_company_init_error = /** @type {(inputs: Onboarding_Company_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company created successfully, but onboarding could not be initialized.`)
};

export const onboarding_company_load_error = /** @type {(inputs: Onboarding_Company_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load company information. Please try again later.`)
};

export const onboarding_company_name_length_error = /** @type {(inputs: Onboarding_Company_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Company name must be ${i?.min}-${i?.max} characters.`)
};

export const onboarding_company_name_label = /** @type {(inputs: Onboarding_Company_Name_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company name`)
};

export const onboarding_company_name_placeholder = /** @type {(inputs: Onboarding_Company_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter company name`)
};

export const onboarding_company_description_label = /** @type {(inputs: Onboarding_Company_Description_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company description (optional)`)
};

export const onboarding_company_description_placeholder = /** @type {(inputs: Onboarding_Company_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Briefly describe your company and team.`)
};

export const onboarding_company_save_error = /** @type {(inputs: Onboarding_Company_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save company information. Please try again later.`)
};

export const onboarding_company_saved = /** @type {(inputs: Onboarding_Company_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company information saved.`)
};

export const onboarding_company_setup_subtitle = /** @type {(inputs: Onboarding_Company_Setup_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Complete your company profile first, then continue with your personal profile.`)
};

export const onboarding_company_setup_title = /** @type {(inputs: Onboarding_Company_Setup_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up company information`)
};

export const onboarding_company_submit_create_continue = /** @type {(inputs: Onboarding_Company_Submit_Create_ContinueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create and continue`)
};

export const onboarding_company_submit_next = /** @type {(inputs: Onboarding_Company_Submit_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

export const onboarding_company_website_label = /** @type {(inputs: Onboarding_Company_Website_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company website (optional)`)
};

export const onboarding_company_welcome_subtitle = /** @type {(inputs: Onboarding_Company_Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Welcome to Lucius. Create your first workspace before continuing with your personal profile.`)
};

export const onboarding_company_welcome_title = /** @type {(inputs: Onboarding_Company_Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create your first workspace`)
};

export const onboarding_profile_gate_error = /** @type {(inputs: Onboarding_Profile_Gate_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load onboarding progress. Please try again later.`)
};

export const profile_avatar_must_be_image = /** @type {(inputs: Profile_Avatar_Must_Be_ImageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avatar file must be an image.`)
};

export const profile_avatar_preview_alt = /** @type {(inputs: Profile_Avatar_Preview_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avatar preview`)
};

export const profile_avatar_size_limit = /** @type {(inputs: Profile_Avatar_Size_LimitInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Avatar file must be smaller than ${i?.size}.`)
};

export const profile_choose_avatar = /** @type {(inputs: Profile_Choose_AvatarInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose avatar`)
};

export const profile_display_name_length_error = /** @type {(inputs: Profile_Display_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Nickname must be ${i?.min}-${i?.max} characters.`)
};

export const profile_enter_nickname = /** @type {(inputs: Profile_Enter_NicknameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter your nickname`)
};

export const profile_init_failed = /** @type {(inputs: Profile_Init_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to initialize profile. Please try again later.`)
};

export const profile_nickname_hint = /** @type {(inputs: Profile_Nickname_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.min}-${i?.max} characters. Nicknames must be unique within the same workspace.`)
};

export const profile_nickname_label = /** @type {(inputs: Profile_Nickname_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nickname`)
};

export const profile_nickname_placeholder = /** @type {(inputs: Profile_Nickname_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`your nickname`)
};

export const profile_required_display_name = /** @type {(inputs: Profile_Required_Display_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a nickname.`)
};

export const profile_save_error = /** @type {(inputs: Profile_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save profile. Please try again later.`)
};

export const profile_save_success = /** @type {(inputs: Profile_Save_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile saved successfully.`)
};

export const profile_platform_accounts_title = /** @type {(inputs: Profile_Platform_Accounts_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform accounts`)
};

export const profile_platform_account_connect = /** @type {(inputs: Profile_Platform_Account_ConnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect`)
};

export const profile_platform_account_disconnect = /** @type {(inputs: Profile_Platform_Account_DisconnectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disconnect`)
};

export const profile_platform_account_unavailable = /** @type {(inputs: Profile_Platform_Account_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable`)
};

export const platform_discord = /** @type {(inputs: Platform_DiscordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discord`)
};

export const platform_feishu = /** @type {(inputs: Platform_FeishuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu`)
};

export const platform_slack = /** @type {(inputs: Platform_SlackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack`)
};

export const platform_telegram = /** @type {(inputs: Platform_TelegramInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram`)
};

export const platform_unknown = /** @type {(inputs: Platform_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown`)
};

export const role_admin = /** @type {(inputs: Role_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin`)
};

export const role_assistant = /** @type {(inputs: Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assistant`)
};

export const role_bot = /** @type {(inputs: Role_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot`)
};

export const role_lucius = /** @type {(inputs: Role_LuciusInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

export const role_staff = /** @type {(inputs: Role_StaffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Staff`)
};

export const role_unknown = /** @type {(inputs: Role_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown`)
};

export const role_user = /** @type {(inputs: Role_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User`)
};

export const settings_back_to_app = /** @type {(inputs: Settings_Back_To_AppInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to app`)
};

export const settings_nav_event_settings = /** @type {(inputs: Settings_Nav_Event_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event Settings`)
};

export const settings_nav_management = /** @type {(inputs: Settings_Nav_ManagementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Management`)
};

export const settings_nav_member_management = /** @type {(inputs: Settings_Nav_Member_ManagementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member Management`)
};

export const settings_nav_package = /** @type {(inputs: Settings_Nav_PackageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan`)
};

export const settings_nav_profile_settings = /** @type {(inputs: Settings_Nav_Profile_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile`)
};

export const settings_nav_usage_history = /** @type {(inputs: Settings_Nav_Usage_HistoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage History`)
};

export const settings_nav_user_communities = /** @type {(inputs: Settings_Nav_User_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Communities`)
};

export const settings_nav_workgroup_settings = /** @type {(inputs: Settings_Nav_Workgroup_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup Settings`)
};

export const settings_select_company_first = /** @type {(inputs: Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first.`)
};

export const settings_title = /** @type {(inputs: Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Settings`)
};

export const common_add = /** @type {(inputs: Common_AddInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add`)
};

export const common_days_ago = /** @type {(inputs: Common_Days_AgoInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} day(s) ago`)
};

export const common_delete = /** @type {(inputs: Common_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

export const common_edit = /** @type {(inputs: Common_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

export const common_none = /** @type {(inputs: Common_NoneInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`None`)
};

export const common_open = /** @type {(inputs: Common_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open`)
};

export const common_previous = /** @type {(inputs: Common_PreviousInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previous`)
};

export const common_refresh = /** @type {(inputs: Common_RefreshInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refresh`)
};

export const common_refreshing = /** @type {(inputs: Common_RefreshingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refreshing`)
};

export const common_unknown_user = /** @type {(inputs: Common_Unknown_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown user`)
};

export const platform_website = /** @type {(inputs: Platform_WebsiteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Website`)
};

export const role_member = /** @type {(inputs: Role_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member`)
};

export const role_owner = /** @type {(inputs: Role_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

export const workspace_settings_title = /** @type {(inputs: Workspace_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup Settings`)
};

export const workspace_state_ready = /** @type {(inputs: Workspace_State_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configurable`)
};

export const workspace_state_needs_connection = /** @type {(inputs: Workspace_State_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Needs connection`)
};

export const workspace_state_unavailable = /** @type {(inputs: Workspace_State_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable`)
};

export const workspace_empty_ready = /** @type {(inputs: Workspace_Empty_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available channels on this platform yet.`)
};

export const workspace_empty_unavailable = /** @type {(inputs: Workspace_Empty_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup settings are not available for this platform yet.`)
};

export const workspace_empty_needs_connection = /** @type {(inputs: Workspace_Empty_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finish the platform connection first, then come back to choose workgroups.`)
};

export const workspace_stale = /** @type {(inputs: Workspace_StaleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disconnected`)
};

export const workspace_save_pending = /** @type {(inputs: Workspace_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving`)
};

export const workspace_badge = /** @type {(inputs: Workspace_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup`)
};

export const workspace_remove = /** @type {(inputs: Workspace_RemoveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove from workgroup`)
};

export const workspace_set = /** @type {(inputs: Workspace_SetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set as workgroup`)
};

export const workspace_readonly = /** @type {(inputs: Workspace_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read only`)
};

export const workspace_navigate_platform_settings = /** @type {(inputs: Workspace_Navigate_Platform_SettingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go to platform settings`)
};

export const workspace_selected_count = /** @type {(inputs: Workspace_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup(s)`)
};

export const workspace_add_success = /** @type {(inputs: Workspace_Add_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} was set as a workgroup.`)
};

export const workspace_remove_success = /** @type {(inputs: Workspace_Remove_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} was removed from workgroups.`)
};

export const workspace_select_company_error = /** @type {(inputs: Workspace_Select_Company_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company at the top of the page first.`)
};

export const workspace_permission_error = /** @type {(inputs: Workspace_Permission_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can modify workgroup settings.`)
};

export const workspace_save_error = /** @type {(inputs: Workspace_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save workgroup settings. Please try again later.`)
};

export const workspace_summary_selected = /** @type {(inputs: Workspace_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup channel(s) selected`)
};

export const workspace_summary_description = /** @type {(inputs: Workspace_Summary_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channels become available only after the platform is connected. Each platform can have multiple workgroups.`)
};

export const workspace_permission_editable = /** @type {(inputs: Workspace_Permission_EditableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current permission: editable`)
};

export const workspace_permission_readonly = /** @type {(inputs: Workspace_Permission_ReadonlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current permission: read only`)
};

export const workspace_member_readonly_hint = /** @type {(inputs: Workspace_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can modify workgroup settings; Members can view the current configuration.`)
};

export const feishu_settings_title = /** @type {(inputs: Feishu_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu`)
};

export const feishu_default_chat_type = /** @type {(inputs: Feishu_Default_Chat_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Group Chat`)
};

export const feishu_discovered_candidates = /** @type {(inputs: Feishu_Discovered_CandidatesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Feishu workgroup candidate(s) found`)
};

export const feishu_no_available_candidates = /** @type {(inputs: Feishu_No_Available_CandidatesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available Feishu workgroups yet`)
};

export const feishu_synced_hint = /** @type {(inputs: Feishu_Synced_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu groups have been synced to the channel library. Go back to Workgroup Settings to mark them as workgroups.`)
};

export const feishu_manage_hint = /** @type {(inputs: Feishu_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Complete the Feishu integration first. Once groups are synced in, options will appear here and in Workgroup Settings.`)
};

export const feishu_readonly_hint = /** @type {(inputs: Feishu_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This account is read only. You can view synced Feishu groups here.`)
};

export const feishu_empty_synced = /** @type {(inputs: Feishu_Empty_SyncedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No synced Feishu groups yet.`)
};

export const feishu_bot_add_button = /** @type {(inputs: Feishu_Bot_Add_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Bot`)
};

export const feishu_bot_summary_connected_title = /** @type {(inputs: Feishu_Bot_Summary_Connected_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connected Bots`)
};

export const feishu_bot_summary_connected_hint = /** @type {(inputs: Feishu_Bot_Summary_Connected_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} bot(s) configured`)
};

export const feishu_bot_summary_default_title = /** @type {(inputs: Feishu_Bot_Summary_Default_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default Bot`)
};

export const feishu_bot_summary_default_hint = /** @type {(inputs: Feishu_Bot_Summary_Default_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No default bot yet`)
};

export const feishu_bot_summary_channels_bound_title = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channels Bound`)
};

export const feishu_bot_summary_channels_bound_hint = /** @type {(inputs: Feishu_Bot_Summary_Channels_Bound_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} unassigned channel(s)`)
};

export const feishu_bot_summary_last_error_title = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Error Bots`)
};

export const feishu_bot_summary_last_error_hint = /** @type {(inputs: Feishu_Bot_Summary_Last_Error_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bots that currently need attention`)
};

export const feishu_bot_member_readonly_hint = /** @type {(inputs: Feishu_Bot_Member_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can manage bots; Members can view the current routing.`)
};

export const feishu_bot_empty_title = /** @type {(inputs: Feishu_Bot_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No Feishu bots yet`)
};

export const feishu_bot_empty_manage_hint = /** @type {(inputs: Feishu_Bot_Empty_Manage_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add a bot first, then verify, restart and assign channels from this panel.`)
};

export const feishu_bot_empty_readonly_hint = /** @type {(inputs: Feishu_Bot_Empty_Readonly_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No Feishu bot has been configured for this company yet.`)
};

export const feishu_bot_dialog_create_title = /** @type {(inputs: Feishu_Bot_Dialog_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Feishu Bot`)
};

export const feishu_bot_dialog_edit_title = /** @type {(inputs: Feishu_Bot_Dialog_Edit_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit Feishu Bot`)
};

export const feishu_bot_form_name_label = /** @type {(inputs: Feishu_Bot_Form_Name_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bot name`)
};

export const feishu_bot_form_name_placeholder = /** @type {(inputs: Feishu_Bot_Form_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Support Bot`)
};

export const feishu_bot_form_app_id_label = /** @type {(inputs: Feishu_Bot_Form_App_Id_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App ID`)
};

export const feishu_bot_form_app_id_placeholder = /** @type {(inputs: Feishu_Bot_Form_App_Id_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`cli_xxx`)
};

export const feishu_bot_form_app_secret_label = /** @type {(inputs: Feishu_Bot_Form_App_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App Secret`)
};

export const feishu_bot_form_app_secret_placeholder = /** @type {(inputs: Feishu_Bot_Form_App_Secret_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paste the app secret`)
};

export const feishu_bot_form_default_label = /** @type {(inputs: Feishu_Bot_Form_Default_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set as default bot`)
};

export const feishu_bot_form_enabled_label = /** @type {(inputs: Feishu_Bot_Form_Enabled_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enabled`)
};

export const feishu_bot_form_rotate_secret_label = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rotate secret`)
};

export const feishu_bot_form_rotate_secret_hint = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only enter a new secret when you need to replace the current one.`)
};

export const feishu_bot_form_rotate_secret_show = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_ShowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rotate`)
};

export const feishu_bot_form_rotate_secret_hide = /** @type {(inputs: Feishu_Bot_Form_Rotate_Secret_HideInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel rotate`)
};

export const feishu_bot_form_rotated_secret_label = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New App Secret`)
};

export const feishu_bot_form_rotated_secret_placeholder = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paste the replacement secret`)
};

export const feishu_bot_form_name_required = /** @type {(inputs: Feishu_Bot_Form_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a bot name.`)
};

export const feishu_bot_form_app_id_required = /** @type {(inputs: Feishu_Bot_Form_App_Id_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter an App ID.`)
};

export const feishu_bot_form_app_secret_required = /** @type {(inputs: Feishu_Bot_Form_App_Secret_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter an App Secret.`)
};

export const feishu_bot_form_rotated_secret_required = /** @type {(inputs: Feishu_Bot_Form_Rotated_Secret_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter the replacement secret.`)
};

export const feishu_bot_form_submitting = /** @type {(inputs: Feishu_Bot_Form_SubmittingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

export const feishu_bot_create = /** @type {(inputs: Feishu_Bot_CreateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create Bot`)
};

export const feishu_bot_default_badge = /** @type {(inputs: Feishu_Bot_Default_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default`)
};

export const feishu_bot_status_active = /** @type {(inputs: Feishu_Bot_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active`)
};

export const feishu_bot_status_disabled = /** @type {(inputs: Feishu_Bot_Status_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled`)
};

export const feishu_bot_status_error = /** @type {(inputs: Feishu_Bot_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Error`)
};

export const feishu_bot_status_pending = /** @type {(inputs: Feishu_Bot_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending`)
};

export const feishu_bot_action_verify = /** @type {(inputs: Feishu_Bot_Action_VerifyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verify`)
};

export const feishu_bot_action_verifying = /** @type {(inputs: Feishu_Bot_Action_VerifyingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verifying...`)
};

export const feishu_bot_action_restart = /** @type {(inputs: Feishu_Bot_Action_RestartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restart`)
};

export const feishu_bot_action_restarting = /** @type {(inputs: Feishu_Bot_Action_RestartingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restarting...`)
};

export const feishu_bot_action_enable = /** @type {(inputs: Feishu_Bot_Action_EnableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enable`)
};

export const feishu_bot_action_disable = /** @type {(inputs: Feishu_Bot_Action_DisableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disable`)
};

export const feishu_bot_action_updating = /** @type {(inputs: Feishu_Bot_Action_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updating...`)
};

export const feishu_bot_meta_verified_at = /** @type {(inputs: Feishu_Bot_Meta_Verified_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last verified`)
};

export const feishu_bot_meta_connected_at = /** @type {(inputs: Feishu_Bot_Meta_Connected_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last connected`)
};

export const feishu_bot_meta_heartbeat_at = /** @type {(inputs: Feishu_Bot_Meta_Heartbeat_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last heartbeat`)
};

export const feishu_bot_meta_event_at = /** @type {(inputs: Feishu_Bot_Meta_Event_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last event`)
};

export const feishu_bot_meta_never = /** @type {(inputs: Feishu_Bot_Meta_NeverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Never`)
};

export const feishu_bot_last_error_label = /** @type {(inputs: Feishu_Bot_Last_Error_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last error`)
};

export const feishu_bot_assigned_channels_title = /** @type {(inputs: Feishu_Bot_Assigned_Channels_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assigned channels`)
};

export const feishu_bot_assigned_channels_count = /** @type {(inputs: Feishu_Bot_Assigned_Channels_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} channel(s)`)
};

export const feishu_bot_assigned_channels_empty = /** @type {(inputs: Feishu_Bot_Assigned_Channels_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No channels are currently routed to this bot.`)
};

export const feishu_bot_create_success = /** @type {(inputs: Feishu_Bot_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot created.`)
};

export const feishu_bot_update_success = /** @type {(inputs: Feishu_Bot_Update_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot updated.`)
};

export const feishu_bot_save_error = /** @type {(inputs: Feishu_Bot_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save the Feishu bot.`)
};

export const feishu_bot_verify_success = /** @type {(inputs: Feishu_Bot_Verify_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot verification started.`)
};

export const feishu_bot_verify_error = /** @type {(inputs: Feishu_Bot_Verify_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to verify the Feishu bot.`)
};

export const feishu_bot_enable_success = /** @type {(inputs: Feishu_Bot_Enable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot enabled.`)
};

export const feishu_bot_enable_error = /** @type {(inputs: Feishu_Bot_Enable_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to enable the Feishu bot.`)
};

export const feishu_bot_restart_success = /** @type {(inputs: Feishu_Bot_Restart_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot restart started.`)
};

export const feishu_bot_restart_error = /** @type {(inputs: Feishu_Bot_Restart_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to restart the Feishu bot.`)
};

export const feishu_bot_disable_success = /** @type {(inputs: Feishu_Bot_Disable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Feishu bot disabled.`)
};

export const feishu_bot_disable_error = /** @type {(inputs: Feishu_Bot_Disable_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to disable the Feishu bot.`)
};

export const feishu_bot_restart_confirm_title = /** @type {(inputs: Feishu_Bot_Restart_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Restart this bot?`)
};

export const feishu_bot_restart_confirm_description = /** @type {(inputs: Feishu_Bot_Restart_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The connection will be restarted to recover runtime state.`)
};

export const feishu_bot_disable_confirm_title = /** @type {(inputs: Feishu_Bot_Disable_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disable this bot?`)
};

export const feishu_bot_disable_confirm_description = /** @type {(inputs: Feishu_Bot_Disable_Confirm_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled bots will stop handling channels until you enable them again.`)
};

export const billing_usage_title = /** @type {(inputs: Billing_Usage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage History`)
};

export const billing_current_period = /** @type {(inputs: Billing_Current_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current billing period`)
};

export const billing_period_key = /** @type {(inputs: Billing_Period_KeyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Period key: ${i?.key}`)
};

export const billing_period_key_later = /** @type {(inputs: Billing_Period_Key_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The period key will appear on the detailed ledger page later.`)
};

export const billing_used_actions_title = /** @type {(inputs: Billing_Used_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions used this month`)
};

export const billing_blocked_actions = /** @type {(inputs: Billing_Blocked_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} action(s) have been blocked by the quota policy.`)
};

export const billing_no_blocked_actions = /** @type {(inputs: Billing_No_Blocked_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No actions are currently blocked by stop-service.`)
};

export const billing_overage_title = /** @type {(inputs: Billing_Overage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated overage`)
};

export const billing_projected_overage = /** @type {(inputs: Billing_Projected_OverageInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Projected overage fee ${i?.amount}`)
};

export const billing_no_overage_yet = /** @type {(inputs: Billing_No_Overage_YetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No overage fee has been generated in the current billing period.`)
};

export const billing_state_title = /** @type {(inputs: Billing_State_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current status`)
};

export const billing_estimated_invoice_title = /** @type {(inputs: Billing_Estimated_Invoice_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected invoice`)
};

export const billing_auto_charge = /** @type {(inputs: Billing_Auto_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auto charge`)
};

export const billing_stop_service = /** @type {(inputs: Billing_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop service`)
};

export const billing_stripe_invoices_title = /** @type {(inputs: Billing_Stripe_Invoices_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stripe invoices`)
};

export const billing_stripe_invoices_hint = /** @type {(inputs: Billing_Stripe_Invoices_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View hosted invoices directly, or download PDFs and receipts.`)
};

export const billing_stripe_empty = /** @type {(inputs: Billing_Stripe_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No exportable Stripe invoices yet.`)
};

export const billing_snapshot_title = /** @type {(inputs: Billing_Snapshot_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current period snapshot`)
};

export const billing_snapshot_hint = /** @type {(inputs: Billing_Snapshot_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`For internal verification only. This does not replace the official Stripe invoice.`)
};

export const billing_snapshot_export_title = /** @type {(inputs: Billing_Snapshot_Export_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Export current period CSV snapshot`)
};

export const billing_snapshot_export = /** @type {(inputs: Billing_Snapshot_ExportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Export CSV snapshot`)
};

export const billing_table_project = /** @type {(inputs: Billing_Table_ProjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Item`)
};

export const billing_table_quantity = /** @type {(inputs: Billing_Table_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quantity`)
};

export const billing_table_unit_price = /** @type {(inputs: Billing_Table_Unit_PriceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unit price`)
};

export const billing_table_amount = /** @type {(inputs: Billing_Table_AmountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Amount`)
};

export const billing_estimated_total = /** @type {(inputs: Billing_Estimated_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected total`)
};

export const billing_period_export_hint = /** @type {(inputs: Billing_Period_Export_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current period export can be archived directly.`)
};

export const billing_export_success = /** @type {(inputs: Billing_Export_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current period billing details have been exported.`)
};

export const billing_export_error = /** @type {(inputs: Billing_Export_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to export billing details. Please try again later.`)
};

export const billing_invoice_status_paid = /** @type {(inputs: Billing_Invoice_Status_PaidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paid`)
};

export const billing_invoice_status_open = /** @type {(inputs: Billing_Invoice_Status_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open`)
};

export const billing_invoice_status_void = /** @type {(inputs: Billing_Invoice_Status_VoidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voided`)
};

export const billing_invoice_status_uncollectible = /** @type {(inputs: Billing_Invoice_Status_UncollectibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uncollectible`)
};

export const billing_invoice_status_draft = /** @type {(inputs: Billing_Invoice_Status_DraftInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Draft`)
};

export const billing_invoice_status_unknown = /** @type {(inputs: Billing_Invoice_Status_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown status`)
};

export const billing_created_on = /** @type {(inputs: Billing_Created_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Created on ${i?.date}`)
};

export const billing_paid_on = /** @type {(inputs: Billing_Paid_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Paid on ${i?.date}`)
};

export const billing_view_invoice = /** @type {(inputs: Billing_View_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View invoice`)
};

export const billing_download_invoice = /** @type {(inputs: Billing_Download_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download invoice`)
};

export const billing_download_receipt = /** @type {(inputs: Billing_Download_ReceiptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Download receipt`)
};

export const billing_plan_title = /** @type {(inputs: Billing_Plan_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan`)
};

export const billing_display_free_active = /** @type {(inputs: Billing_Display_Free_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free`)
};

export const billing_display_free_limit_reached = /** @type {(inputs: Billing_Display_Free_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free limit reached`)
};

export const billing_display_basic_trial = /** @type {(inputs: Billing_Display_Basic_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic trial`)
};

export const billing_display_basic_active = /** @type {(inputs: Billing_Display_Basic_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic active`)
};

export const billing_display_basic_canceling = /** @type {(inputs: Billing_Display_Basic_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic set to cancel`)
};

export const billing_display_pro_trial = /** @type {(inputs: Billing_Display_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro trial`)
};

export const billing_display_pro_active = /** @type {(inputs: Billing_Display_Pro_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro active`)
};

export const billing_display_pro_canceling = /** @type {(inputs: Billing_Display_Pro_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro set to cancel`)
};

export const billing_display_promo_only_basic = /** @type {(inputs: Billing_Display_Promo_Only_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Promo Basic`)
};

export const billing_display_past_due = /** @type {(inputs: Billing_Display_Past_DueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Payment issue`)
};

export const billing_display_expired = /** @type {(inputs: Billing_Display_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expired`)
};

export const billing_trial_ends_on = /** @type {(inputs: Billing_Trial_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Trial ends on ${i?.date}`)
};

export const billing_trialing = /** @type {(inputs: Billing_TrialingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trial in progress`)
};

export const billing_ends_on = /** @type {(inputs: Billing_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ends on ${i?.date}`)
};

export const billing_stop_after_period = /** @type {(inputs: Billing_Stop_After_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stops after the current billing period`)
};

export const billing_limit_reached = /** @type {(inputs: Billing_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free quota limit reached`)
};

export const billing_current_period_normal = /** @type {(inputs: Billing_Current_Period_NormalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current billing period is normal`)
};

export const billing_next_billing = /** @type {(inputs: Billing_Next_BillingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Next billing ${i?.date}`)
};

export const billing_current_workspace = /** @type {(inputs: Billing_Current_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current workspace`)
};

export const billing_start_basic_trial = /** @type {(inputs: Billing_Start_Basic_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start Basic trial`)
};

export const billing_start_pro_trial = /** @type {(inputs: Billing_Start_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start Pro trial`)
};

export const billing_manage_payment_method = /** @type {(inputs: Billing_Manage_Payment_MethodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manage payment method`)
};

export const billing_account_label = /** @type {(inputs: Billing_Account_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing account`)
};

export const billing_metric_projected = /** @type {(inputs: Billing_Metric_ProjectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected`)
};

export const billing_metric_admins = /** @type {(inputs: Billing_Metric_AdminsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admins`)
};

export const billing_metric_platforms = /** @type {(inputs: Billing_Metric_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms`)
};

export const billing_metric_overage = /** @type {(inputs: Billing_Metric_OverageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage`)
};

export const billing_monthly_price = /** @type {(inputs: Billing_Monthly_PriceInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / month`)
};

export const billing_actions_label = /** @type {(inputs: Billing_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

export const billing_actions_included_month = /** @type {(inputs: Billing_Actions_Included_MonthInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`/ ${i?.count} included this month`)
};

export const billing_overage_summary = /** @type {(inputs: Billing_Overage_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} overage action(s), projected ${i?.amount}`)
};

export const billing_no_overage_fee = /** @type {(inputs: Billing_No_Overage_FeeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No overage fee currently`)
};

export const billing_usage_rate = /** @type {(inputs: Billing_Usage_RateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Usage ${i?.percent}%`)
};

export const billing_extra_admin = /** @type {(inputs: Billing_Extra_AdminInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Extra admins ${i?.count}`)
};

export const billing_no_extra_admin = /** @type {(inputs: Billing_No_Extra_AdminInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No extra admins`)
};

export const billing_extra_platform = /** @type {(inputs: Billing_Extra_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Extra platforms ${i?.count}`)
};

export const billing_no_extra_platform = /** @type {(inputs: Billing_No_Extra_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No extra platforms`)
};

export const billing_overage_policy_title = /** @type {(inputs: Billing_Overage_Policy_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage policy`)
};

export const billing_overage_policy_subtitle = /** @type {(inputs: Billing_Overage_Policy_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How to handle usage after the included quota is reached`)
};

export const billing_free_fixed_stop_service = /** @type {(inputs: Billing_Free_Fixed_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free plan is fixed to stop service when the quota is reached.`)
};

export const billing_policy_stop_service_title = /** @type {(inputs: Billing_Policy_Stop_Service_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop service`)
};

export const billing_policy_stop_service_desc = /** @type {(inputs: Billing_Policy_Stop_Service_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop new billable actions after the included quota is reached.`)
};

export const billing_policy_auto_charge_title = /** @type {(inputs: Billing_Policy_Auto_Charge_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auto charge`)
};

export const billing_policy_auto_charge_desc = /** @type {(inputs: Billing_Policy_Auto_Charge_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatically bill overages within the current billing period.`)
};

export const billing_monthly_overage_cap = /** @type {(inputs: Billing_Monthly_Overage_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monthly overage cap (USD)`)
};

export const billing_example_cap = /** @type {(inputs: Billing_Example_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. 500`)
};

export const billing_save_policy = /** @type {(inputs: Billing_Save_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save policy`)
};

export const billing_current_plan = /** @type {(inputs: Billing_Current_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current plan`)
};

export const billing_overage_per_action = /** @type {(inputs: Billing_Overage_Per_ActionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / action`)
};

export const billing_unsupported = /** @type {(inputs: Billing_UnsupportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unsupported`)
};

export const billing_addon_summary = /** @type {(inputs: Billing_Addon_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Platform add-on ${i?.platform} / month · Admin add-on ${i?.admin} / month`)
};

export const billing_start_trial = /** @type {(inputs: Billing_Start_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start trial`)
};

export const member_management_title = /** @type {(inputs: Member_Management_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member Management`)
};

export const member_management_add_member = /** @type {(inputs: Member_Management_Add_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add member`)
};

export const member_management_table_id = /** @type {(inputs: Member_Management_Table_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ID`)
};

export const member_management_table_platforms = /** @type {(inputs: Member_Management_Table_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms`)
};

export const member_management_table_role = /** @type {(inputs: Member_Management_Table_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Role`)
};

export const member_management_table_recent_activity = /** @type {(inputs: Member_Management_Table_Recent_ActivityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Recent activity`)
};

export const member_management_table_actions = /** @type {(inputs: Member_Management_Table_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

export const member_management_remove_current_user = /** @type {(inputs: Member_Management_Remove_Current_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current signed-in account cannot be removed`)
};

export const member_management_remove_owner = /** @type {(inputs: Member_Management_Remove_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner cannot be removed`)
};

export const member_management_admin_cancel_member_invite_only = /** @type {(inputs: Member_Management_Admin_Cancel_Member_Invite_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin can only cancel Member invitations`)
};

export const member_management_admin_remove_member_only = /** @type {(inputs: Member_Management_Admin_Remove_Member_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin can only remove Members`)
};

export const member_management_owner_only_action = /** @type {(inputs: Member_Management_Owner_Only_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can operate`)
};

export const member_management_menu_hint_current_account = /** @type {(inputs: Member_Management_Menu_Hint_Current_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current account`)
};

export const member_management_menu_hint_owner = /** @type {(inputs: Member_Management_Menu_Hint_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner`)
};

export const member_management_menu_hint_no_permission = /** @type {(inputs: Member_Management_Menu_Hint_No_PermissionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No permission`)
};

export const member_management_update_current_user_role = /** @type {(inputs: Member_Management_Update_Current_User_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current signed-in account role cannot be changed`)
};

export const member_management_update_owner_role = /** @type {(inputs: Member_Management_Update_Owner_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner role cannot be changed`)
};

export const member_management_admin_update_member_invite_only = /** @type {(inputs: Member_Management_Admin_Update_Member_Invite_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin can only adjust Member invitations`)
};

export const member_management_admin_update_member_only = /** @type {(inputs: Member_Management_Admin_Update_Member_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin can only adjust Members`)
};

export const member_management_status_invited = /** @type {(inputs: Member_Management_Status_InvitedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invited`)
};

export const member_management_status_joined = /** @type {(inputs: Member_Management_Status_JoinedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Joined`)
};

export const member_management_recent_pending_join = /** @type {(inputs: Member_Management_Recent_Pending_JoinInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending join`)
};

export const member_management_recent_unrecorded = /** @type {(inputs: Member_Management_Recent_UnrecordedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No record`)
};

export const member_management_fallback_name = /** @type {(inputs: Member_Management_Fallback_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member`)
};

export const member_management_invalid_email = /** @type {(inputs: Member_Management_Invalid_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a valid email address.`)
};

export const member_management_invite_error = /** @type {(inputs: Member_Management_Invite_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to send invite. Please try again later.`)
};

export const member_management_role_update_error = /** @type {(inputs: Member_Management_Role_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to update role. Please try again later.`)
};

export const member_management_resend_error = /** @type {(inputs: Member_Management_Resend_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to resend invite. Please try again later.`)
};

export const member_management_link_telegram_error = /** @type {(inputs: Member_Management_Link_Telegram_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to link Telegram account.`)
};

export const member_management_missing_current_member_bind = /** @type {(inputs: Member_Management_Missing_Current_Member_BindInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current member identity could not be resolved. Account linking is unavailable for now.`)
};

export const member_management_link_platform_error = /** @type {(inputs: Member_Management_Link_Platform_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to link platform account.`)
};

export const member_management_platform_bound = /** @type {(inputs: Member_Management_Platform_BoundInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} account linked.`)
};

export const member_management_platform_bind_failed = /** @type {(inputs: Member_Management_Platform_Bind_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} account linking failed. Please try again later.`)
};

export const member_management_platform_unlinked = /** @type {(inputs: Member_Management_Platform_UnlinkedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} account not linked.`)
};

export const member_management_oauth_link_hint = /** @type {(inputs: Member_Management_Oauth_Link_HintInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Click to go to the ${i?.platform} authorization page. The account link will complete automatically after authorization succeeds.`)
};

export const member_management_missing_current_member_unbind = /** @type {(inputs: Member_Management_Missing_Current_Member_UnbindInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current member identity could not be resolved. Account unlinking is unavailable for now.`)
};

export const member_management_unlink_platform_error = /** @type {(inputs: Member_Management_Unlink_Platform_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to unlink ${i?.platform} account.`)
};

export const member_management_cancel_invite = /** @type {(inputs: Member_Management_Cancel_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel invite`)
};

export const member_management_remove_member = /** @type {(inputs: Member_Management_Remove_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove member`)
};

export const member_management_actions_title = /** @type {(inputs: Member_Management_Actions_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member actions`)
};

export const member_management_actions_menu_aria = /** @type {(inputs: Member_Management_Actions_Menu_AriaInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Action menu for ${i?.email}`)
};

export const member_management_accounts_label = /** @type {(inputs: Member_Management_Accounts_LabelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Accounts: ${i?.accounts}`)
};

export const member_management_unlinked = /** @type {(inputs: Member_Management_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not linked`)
};

export const member_management_adjust_invite_role = /** @type {(inputs: Member_Management_Adjust_Invite_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Adjust invite role`)
};

export const member_management_change_role = /** @type {(inputs: Member_Management_Change_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Change role`)
};

export const member_management_resending_invite = /** @type {(inputs: Member_Management_Resending_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resending...`)
};

export const member_management_resend_invite = /** @type {(inputs: Member_Management_Resend_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resend invite`)
};

export const member_management_my_bindings = /** @type {(inputs: Member_Management_My_BindingsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`My linked platform accounts`)
};

export const member_management_no_current_member = /** @type {(inputs: Member_Management_No_Current_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your current account has not been mapped to a company member yet, so account linking is unavailable.`)
};

export const member_management_linked_platforms = /** @type {(inputs: Member_Management_Linked_PlatformsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Linked platforms:`)
};

export const member_management_telegram_linked = /** @type {(inputs: Member_Management_Telegram_LinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram account linked.`)
};

export const member_management_telegram_unlinked = /** @type {(inputs: Member_Management_Telegram_UnlinkedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram account not linked.`)
};

export const member_management_telegram_unavailable = /** @type {(inputs: Member_Management_Telegram_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram account linking is not enabled in the current environment.`)
};

export const member_management_unlinking = /** @type {(inputs: Member_Management_UnlinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unlinking...`)
};

export const member_management_unlink_platform = /** @type {(inputs: Member_Management_Unlink_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unlink ${i?.platform}`)
};

export const member_management_login_and_link = /** @type {(inputs: Member_Management_Login_And_LinkInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sign in with ${i?.platform} and link`)
};

export const member_management_linking = /** @type {(inputs: Member_Management_LinkingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Linking...`)
};

export const member_management_binding_wait = /** @type {(inputs: Member_Management_Binding_WaitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verifying and linking the account. Please wait...`)
};

export const member_management_invite_dialog_title = /** @type {(inputs: Member_Management_Invite_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite member`)
};

export const member_management_invite_dialog_desc = /** @type {(inputs: Member_Management_Invite_Dialog_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose an invite method and set the role.`)
};

export const member_management_invite_mode_label = /** @type {(inputs: Member_Management_Invite_Mode_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite method`)
};

export const member_management_invite_mode_email = /** @type {(inputs: Member_Management_Invite_Mode_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email invite`)
};

export const member_management_invite_mode_link = /** @type {(inputs: Member_Management_Invite_Mode_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link`)
};

export const member_management_invite_mode_link_hint = /** @type {(inputs: Member_Management_Invite_Mode_Link_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This link stays valid for 24 hours. Anyone who signs up or signs in with it will join the current workspace.`)
};

export const member_management_email_label = /** @type {(inputs: Member_Management_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email`)
};

export const member_management_role_label = /** @type {(inputs: Member_Management_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Role`)
};

export const member_management_role_placeholder = /** @type {(inputs: Member_Management_Role_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select role`)
};

export const member_management_generate_invite_link = /** @type {(inputs: Member_Management_Generate_Invite_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate invite link`)
};

export const member_management_invite_link_generating = /** @type {(inputs: Member_Management_Invite_Link_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating...`)
};

export const member_management_copy_invite_link = /** @type {(inputs: Member_Management_Copy_Invite_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy invite link`)
};

export const member_management_invite_link_label = /** @type {(inputs: Member_Management_Invite_Link_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link`)
};

export const member_management_invite_link_copied = /** @type {(inputs: Member_Management_Invite_Link_CopiedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link copied. It expires in 24 hours.`)
};

export const member_management_invite_link_error = /** @type {(inputs: Member_Management_Invite_Link_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to generate invite link. Please try again later.`)
};

export const member_management_invite_link_copy_failed = /** @type {(inputs: Member_Management_Invite_Link_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy the invite link. Please copy it manually.`)
};

export const member_management_send_invite = /** @type {(inputs: Member_Management_Send_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send invite`)
};

export const member_management_sending_invite = /** @type {(inputs: Member_Management_Sending_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending...`)
};

export const member_management_role_dialog_desc = /** @type {(inputs: Member_Management_Role_Dialog_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.email} is currently ${i?.role}.`)
};

export const member_management_role_dialog_empty_desc = /** @type {(inputs: Member_Management_Role_Dialog_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a new member role.`)
};

export const member_management_admin_quota_full_update = /** @type {(inputs: Member_Management_Admin_Quota_Full_UpdateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin quota is full (${i?.count}/${i?.limit}). Please change the plan or switch to Member.`)
};

export const member_management_admin_quota_full_invite = /** @type {(inputs: Member_Management_Admin_Quota_Full_InviteInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Admin quota is full (${i?.count}/${i?.limit}). Please change the plan or invite as Member instead.`)
};

export const member_management_admin_quota_hint = /** @type {(inputs: Member_Management_Admin_Quota_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin quota is full. Free a slot first before adjusting.`)
};

export const member_management_avatar_alt = /** @type {(inputs: Member_Management_Avatar_AltInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} avatar`)
};

export const member_management_save_role = /** @type {(inputs: Member_Management_Save_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save role`)
};

export const member_invite_invalid_title = /** @type {(inputs: Member_Invite_Invalid_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link unavailable`)
};

export const member_invite_invalid_desc = /** @type {(inputs: Member_Invite_Invalid_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This invite link is invalid, expired, or the underlying invitation no longer exists.`)
};

export const member_invite_switch_account_error = /** @type {(inputs: Member_Invite_Switch_Account_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to switch accounts. Please try again later.`)
};

export const member_invite_accept_error = /** @type {(inputs: Member_Invite_Accept_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to accept the invitation. Please try again later.`)
};

export const member_invite_badge = /** @type {(inputs: Member_Invite_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace Invite`)
};

export const member_invite_summary = /** @type {(inputs: Member_Invite_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`This link will add whoever signs in as ${i?.role} to the current Lucius workspace.`)
};

export const member_invite_role_label = /** @type {(inputs: Member_Invite_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invited role`)
};

export const member_invite_expiry_label = /** @type {(inputs: Member_Invite_Expiry_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expires at`)
};

export const member_invite_status_label = /** @type {(inputs: Member_Invite_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status`)
};

export const member_invite_joined_title = /** @type {(inputs: Member_Invite_Joined_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite accepted`)
};

export const member_invite_joined_desc = /** @type {(inputs: Member_Invite_Joined_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current account is already in this workspace. You can go straight to the dashboard.`)
};

export const member_invite_joined_badge = /** @type {(inputs: Member_Invite_Joined_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This account already belongs to the workspace`)
};

export const member_invite_expired_title = /** @type {(inputs: Member_Invite_Expired_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite expired`)
};

export const member_invite_expired_desc = /** @type {(inputs: Member_Invite_Expired_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This link has passed its validity window. Ask an admin to generate a new invite link.`)
};

export const member_invite_cancelled_title = /** @type {(inputs: Member_Invite_Cancelled_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite cancelled`)
};

export const member_invite_cancelled_desc = /** @type {(inputs: Member_Invite_Cancelled_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An admin has cancelled this invitation. Ask them to send a new one.`)
};

export const member_invite_used_title = /** @type {(inputs: Member_Invite_Used_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite already handled`)
};

export const member_invite_used_desc = /** @type {(inputs: Member_Invite_Used_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This invitation has already been accepted and cannot be reused by the current account.`)
};

export const member_invite_email_mismatch_title = /** @type {(inputs: Member_Invite_Email_Mismatch_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wrong account`)
};

export const member_invite_email_mismatch_desc = /** @type {(inputs: Member_Invite_Email_Mismatch_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Please sign in with ${i?.email} before accepting this invite.`)
};

export const member_invite_ready_title = /** @type {(inputs: Member_Invite_Ready_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Join this workspace`)
};

export const member_invite_ready_desc = /** @type {(inputs: Member_Invite_Ready_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current account is already signed in. We will auto-join it to the workspace, and you can retry manually if needed.`)
};

export const member_invite_login_title = /** @type {(inputs: Member_Invite_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign in to continue`)
};

export const member_invite_login_desc = /** @type {(inputs: Member_Invite_Login_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign up or sign in first. After authentication, the workspace join will continue automatically.`)
};

export const member_invite_open_workspace = /** @type {(inputs: Member_Invite_Open_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open workspace`)
};

export const member_invite_switching_account = /** @type {(inputs: Member_Invite_Switching_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switching...`)
};

export const member_invite_switch_account = /** @type {(inputs: Member_Invite_Switch_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign out and switch account`)
};

export const member_invite_accepting = /** @type {(inputs: Member_Invite_AcceptingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Joining...`)
};

export const member_invite_accept_action = /** @type {(inputs: Member_Invite_Accept_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry joining`)
};

export const member_invite_login_action = /** @type {(inputs: Member_Invite_Login_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign in and continue`)
};

export const member_invite_back_dashboard = /** @type {(inputs: Member_Invite_Back_DashboardInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to dashboard`)
};

export const telegram_widget_load_error = /** @type {(inputs: Telegram_Widget_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Telegram sign-in widget. Please check your network and try again.`)
};

export const telegram_settings_group = /** @type {(inputs: Telegram_Settings_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Group`)
};

export const telegram_settings_supergroup = /** @type {(inputs: Telegram_Settings_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supergroup`)
};

export const telegram_settings_channel = /** @type {(inputs: Telegram_Settings_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channel`)
};

export const telegram_settings_private = /** @type {(inputs: Telegram_Settings_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Private`)
};

export const telegram_settings_unknown = /** @type {(inputs: Telegram_Settings_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown`)
};

export const telegram_settings_status_pending = /** @type {(inputs: Telegram_Settings_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Waiting for bot to join`)
};

export const telegram_settings_status_fulfilled = /** @type {(inputs: Telegram_Settings_Status_FulfilledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bound`)
};

export const telegram_settings_status_expired = /** @type {(inputs: Telegram_Settings_Status_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expired`)
};

export const telegram_settings_status_cancelled = /** @type {(inputs: Telegram_Settings_Status_CancelledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancelled`)
};

export const telegram_settings_status_failed = /** @type {(inputs: Telegram_Settings_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Binding failed`)
};

export const telegram_settings_load_config_error = /** @type {(inputs: Telegram_Settings_Load_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Telegram integration config.`)
};

export const telegram_settings_load_bound_channels_error = /** @type {(inputs: Telegram_Settings_Load_Bound_Channels_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load bound Telegram communities.`)
};

export const telegram_settings_load_candidates_error = /** @type {(inputs: Telegram_Settings_Load_Candidates_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Telegram community list.`)
};

export const telegram_settings_session_expired = /** @type {(inputs: Telegram_Settings_Session_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram session has expired. Please sign in again.`)
};

export const telegram_settings_select_company_top = /** @type {(inputs: Telegram_Settings_Select_Company_TopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please choose the company to bind at the top first.`)
};

export const telegram_settings_login_success = /** @type {(inputs: Telegram_Settings_Login_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Signed in successfully. Continue by adding the bot to the target community.`)
};

export const telegram_settings_create_session_error = /** @type {(inputs: Telegram_Settings_Create_Session_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create Telegram integration session.`)
};

export const telegram_settings_create_binding_intent_error = /** @type {(inputs: Telegram_Settings_Create_Binding_Intent_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create Telegram binding intent.`)
};

export const telegram_settings_auto_bind_success_named = /** @type {(inputs: Telegram_Settings_Auto_Bind_Success_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The Telegram community has been automatically linked: ${i?.name}`)
};

export const telegram_settings_auto_bind_success = /** @type {(inputs: Telegram_Settings_Auto_Bind_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The Telegram community was automatically linked to the current company.`)
};

export const telegram_settings_auto_bind_expired = /** @type {(inputs: Telegram_Settings_Auto_Bind_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The automatic binding intent has expired. Please sign in again and retry.`)
};

export const telegram_settings_auto_bind_incomplete = /** @type {(inputs: Telegram_Settings_Auto_Bind_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatic binding is not complete yet. Check whether the bot has joined the target community, then try again.`)
};

export const telegram_settings_poll_status_error = /** @type {(inputs: Telegram_Settings_Poll_Status_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to query automatic binding status.`)
};

export const telegram_settings_select_company_first = /** @type {(inputs: Telegram_Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first.`)
};

export const telegram_settings_open_telegram_confirm = /** @type {(inputs: Telegram_Settings_Open_Telegram_ConfirmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram has been opened. Please confirm adding the bot in the target community.`)
};

export const telegram_settings_login_first = /** @type {(inputs: Telegram_Settings_Login_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please complete Telegram sign-in first.`)
};

export const telegram_settings_open_telegram_add_bot = /** @type {(inputs: Telegram_Settings_Open_Telegram_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram has been opened. Please add the bot to the target community.`)
};

export const telegram_settings_add_community = /** @type {(inputs: Telegram_Settings_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Community`)
};

export const telegram_settings_empty_with_company = /** @type {(inputs: Telegram_Settings_Empty_With_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No communities yet. Click Add Community in the top-right.`)
};

export const telegram_settings_empty_without_company = /** @type {(inputs: Telegram_Settings_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first, then add a community.`)
};

export const telegram_settings_dialog_title = /** @type {(inputs: Telegram_Settings_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Telegram Community`)
};

export const telegram_settings_step_login = /** @type {(inputs: Telegram_Settings_Step_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1. Sign in to Telegram`)
};

export const telegram_settings_login = /** @type {(inputs: Telegram_Settings_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign in with Telegram`)
};

export const telegram_settings_logging_in = /** @type {(inputs: Telegram_Settings_Logging_InInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Signing in...`)
};

export const telegram_settings_integration_disabled = /** @type {(inputs: Telegram_Settings_Integration_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram integration is not enabled in the current environment.`)
};

export const telegram_settings_verifying_login = /** @type {(inputs: Telegram_Settings_Verifying_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verifying sign-in...`)
};

export const telegram_settings_logged_in_as_name = /** @type {(inputs: Telegram_Settings_Logged_In_As_NameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Signed in as: ${i?.name}`)
};

export const telegram_settings_logged_in_as_username = /** @type {(inputs: Telegram_Settings_Logged_In_As_UsernameInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Signed in as: ${i?.name} (@${i?.username})`)
};

export const telegram_settings_step_add_bot = /** @type {(inputs: Telegram_Settings_Step_Add_BotInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. Add the bot to a community`)
};

export const telegram_settings_add_bot_button = /** @type {(inputs: Telegram_Settings_Add_Bot_ButtonInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Add @${i?.username}`)
};

export const telegram_settings_step_sync_communities = /** @type {(inputs: Telegram_Settings_Step_Sync_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. Sync community list`)
};

export const telegram_settings_refresh_communities = /** @type {(inputs: Telegram_Settings_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refresh community list`)
};

export const event_settings_title = /** @type {(inputs: Event_Settings_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event Settings`)
};

export const event_settings_select_company_first = /** @type {(inputs: Event_Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first.`)
};

export const event_settings_add_type = /** @type {(inputs: Event_Settings_Add_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add type`)
};

export const event_settings_trigger_select_owner = /** @type {(inputs: Event_Settings_Trigger_Select_OwnerInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select responsible member(s) first`)
};

export const event_settings_trigger_owner_unbound = /** @type {(inputs: Event_Settings_Trigger_Owner_UnboundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Responsible members have no linked accounts`)
};

export const event_settings_trigger_no_channels = /** @type {(inputs: Event_Settings_Trigger_No_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available channels`)
};

export const event_settings_trigger_select_channel = /** @type {(inputs: Event_Settings_Trigger_Select_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select platform channels`)
};

export const event_settings_back_to_list = /** @type {(inputs: Event_Settings_Back_To_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back to type list`)
};

export const event_settings_detail_title_new = /** @type {(inputs: Event_Settings_Detail_Title_NewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New type rule details`)
};

export const event_settings_detail_title_existing = /** @type {(inputs: Event_Settings_Detail_Title_ExistingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} rule details`)
};

export const event_settings_detail_title_default = /** @type {(inputs: Event_Settings_Detail_Title_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rule details`)
};

export const event_settings_type_not_found = /** @type {(inputs: Event_Settings_Type_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This event type was not found.`)
};

export const event_settings_label_type_key = /** @type {(inputs: Event_Settings_Label_Type_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type key`)
};

export const event_settings_label_type_name = /** @type {(inputs: Event_Settings_Label_Type_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type name`)
};

export const event_settings_label_type_description = /** @type {(inputs: Event_Settings_Label_Type_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type description`)
};

export const event_settings_label_responsible = /** @type {(inputs: Event_Settings_Label_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Responsible members (multi-select)`)
};

export const event_settings_select_responsible = /** @type {(inputs: Event_Settings_Select_ResponsibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select responsible members`)
};

export const event_settings_member_list_label = /** @type {(inputs: Event_Settings_Member_List_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Organization members (by email)`)
};

export const event_settings_no_members = /** @type {(inputs: Event_Settings_No_MembersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available members.`)
};

export const event_settings_bound_accounts = /** @type {(inputs: Event_Settings_Bound_AccountsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Linked: ${i?.accounts}`)
};

export const event_settings_unbound_accounts = /** @type {(inputs: Event_Settings_Unbound_AccountsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No linked accounts`)
};

export const event_settings_label_platform_channels = /** @type {(inputs: Event_Settings_Label_Platform_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform notification channels (multi-select)`)
};

export const event_settings_platform_channel_list = /** @type {(inputs: Event_Settings_Platform_Channel_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform channel list`)
};

export const event_settings_no_channels = /** @type {(inputs: Event_Settings_No_ChannelsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No available channels.`)
};

export const event_settings_label_send_notification = /** @type {(inputs: Event_Settings_Label_Send_NotificationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send notifications`)
};

export const event_settings_notify_disabled_hint = /** @type {(inputs: Event_Settings_Notify_Disabled_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`When turned off, this event type will not notify responsible members.`)
};

export const event_settings_notification_targets = /** @type {(inputs: Event_Settings_Notification_TargetsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notification targets`)
};

export const event_settings_notification_targets_empty = /** @type {(inputs: Event_Settings_Notification_Targets_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No notification targets.`)
};

export const event_settings_list_title = /** @type {(inputs: Event_Settings_List_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event types`)
};

export const event_settings_list_empty = /** @type {(inputs: Event_Settings_List_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This company does not have any event types yet.`)
};

export const event_settings_system_badge = /** @type {(inputs: Event_Settings_System_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`System`)
};

export const event_settings_unnamed_type = /** @type {(inputs: Event_Settings_Unnamed_TypeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unnamed type`)
};

export const event_type_label_exception_issue = /** @type {(inputs: Event_Type_Label_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exception Issue`)
};

export const event_type_label_usage_issue = /** @type {(inputs: Event_Type_Label_Usage_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage Issue`)
};

export const event_type_label_order_issue = /** @type {(inputs: Event_Type_Label_Order_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Order Issue`)
};

export const event_type_label_business_cooperation = /** @type {(inputs: Event_Type_Label_Business_CooperationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Business Cooperation`)
};

export const event_type_label_product_feedback = /** @type {(inputs: Event_Type_Label_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Product Feedback`)
};

export const event_type_label_unrecognized_information = /** @type {(inputs: Event_Type_Label_Unrecognized_InformationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unrecognized Information`)
};

export const event_type_label_advertisement = /** @type {(inputs: Event_Type_Label_AdvertisementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Advertisement`)
};

export const event_type_label_message_deletion = /** @type {(inputs: Event_Type_Label_Message_DeletionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message Deletion`)
};

export const event_settings_read_members_error = /** @type {(inputs: Event_Settings_Read_Members_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read organization members.`)
};

export const event_settings_read_bindings_error = /** @type {(inputs: Event_Settings_Read_Bindings_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read member account bindings.`)
};

export const event_settings_read_type_config_error = /** @type {(inputs: Event_Settings_Read_Type_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read event_type_config.`)
};

export const event_settings_read_notification_target_error = /** @type {(inputs: Event_Settings_Read_Notification_Target_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read event_notification_target.`)
};

export const event_settings_invalid_type_key = /** @type {(inputs: Event_Settings_Invalid_Type_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invalid type key. Please review it and try again.`)
};

export const event_settings_type_name_required = /** @type {(inputs: Event_Settings_Type_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type name cannot be empty.`)
};

export const event_settings_missing_type_config_migration = /** @type {(inputs: Event_Settings_Missing_Type_Config_MigrationInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The database has not finished the event_type_config migration, so this type config cannot be saved yet.`)
};

export const event_settings_save_type_config_error = /** @type {(inputs: Event_Settings_Save_Type_Config_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save event type config.`)
};

export const event_settings_missing_saved_config_id = /** @type {(inputs: Event_Settings_Missing_Saved_Config_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A valid config ID was not returned after saving. Please refresh and try again.`)
};

export const event_settings_members_not_loaded = /** @type {(inputs: Event_Settings_Members_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Responsible member directory is still loading. Please try saving again later.`)
};

export const event_settings_channels_not_loaded = /** @type {(inputs: Event_Settings_Channels_Not_LoadedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The channel list is still loading. Please refresh and try again.`)
};

export const event_settings_clear_targets_error = /** @type {(inputs: Event_Settings_Clear_Targets_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to clear old notification targets.`)
};

export const event_settings_write_target_error = /** @type {(inputs: Event_Settings_Write_Target_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to write notification targets.`)
};

export const event_settings_saved = /** @type {(inputs: Event_Settings_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event type config has been saved.`)
};

export const event_settings_save_error = /** @type {(inputs: Event_Settings_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save event type config. Please try again later.`)
};

export const event_settings_notify_off = /** @type {(inputs: Event_Settings_Notify_OffInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No notifications`)
};

export const event_settings_notify_on = /** @type {(inputs: Event_Settings_Notify_OnInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notify`)
};

export const integration_status_not_connected = /** @type {(inputs: Integration_Status_Not_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Not connected`)
};

export const integration_status_degraded_retry = /** @type {(inputs: Integration_Status_Degraded_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Degraded (retry available)`)
};

export const integration_status_connected = /** @type {(inputs: Integration_Status_ConnectedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connected`)
};

export const integration_status_disabled = /** @type {(inputs: Integration_Status_DisabledInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled`)
};

export const integration_sync_success = /** @type {(inputs: Integration_Sync_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual sync completed.`)
};

export const integration_sync_success_channels_roles = /** @type {(inputs: Integration_Sync_Success_Channels_RolesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Manual sync completed: ${i?.channels} channel(s), ${i?.roles} role(s).`)
};

export const integration_sync_success_channels = /** @type {(inputs: Integration_Sync_Success_ChannelsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Manual sync completed: ${i?.channels} channel(s).`)
};

export const integration_connected_backfill_success = /** @type {(inputs: Integration_Connected_Backfill_SuccessInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} connected and initial backfill completed.`)
};

export const integration_connected_backfill_degraded = /** @type {(inputs: Integration_Connected_Backfill_DegradedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} connected, but initial backfill failed. You can retry with manual sync.`)
};

export const integration_create_install_error = /** @type {(inputs: Integration_Create_Install_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to create ${i?.platform} install link.`)
};

export const integration_manual_sync_error = /** @type {(inputs: Integration_Manual_Sync_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual sync failed.`)
};

export const integration_owner_admin_only = /** @type {(inputs: Integration_Owner_Admin_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Only Owner/Admin can operate.`)
};

export const integration_add_community = /** @type {(inputs: Integration_Add_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add Community`)
};

export const integration_empty_with_company = /** @type {(inputs: Integration_Empty_With_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No communities yet. Click Add Community in the top-right.`)
};

export const integration_empty_without_company = /** @type {(inputs: Integration_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first, then add a community.`)
};

export const integration_dialog_title = /** @type {(inputs: Integration_Dialog_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Add ${i?.platform} Community`)
};

export const integration_step_connect = /** @type {(inputs: Integration_Step_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`1. Connect ${i?.platform}`)
};

export const integration_step_sync = /** @type {(inputs: Integration_Step_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`2. Sync communities`)
};

export const integration_step_refresh = /** @type {(inputs: Integration_Step_RefreshInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`3. Refresh community list`)
};

export const integration_creating_install_link = /** @type {(inputs: Integration_Creating_Install_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creating install link...`)
};

export const integration_reconnect = /** @type {(inputs: Integration_ReconnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Reconnect ${i?.platform}`)
};

export const integration_connect = /** @type {(inputs: Integration_ConnectInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Connect ${i?.platform}`)
};

export const integration_syncing = /** @type {(inputs: Integration_SyncingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Syncing...`)
};

export const integration_manual_sync = /** @type {(inputs: Integration_Manual_SyncInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual sync`)
};

export const integration_refresh_communities = /** @type {(inputs: Integration_Refresh_CommunitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Refresh community list`)
};

export const discord_channel_text = /** @type {(inputs: Discord_Channel_TextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Text`)
};

export const discord_channel_voice = /** @type {(inputs: Discord_Channel_VoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voice`)
};

export const discord_channel_category = /** @type {(inputs: Discord_Channel_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Category`)
};

export const discord_channel_announcement = /** @type {(inputs: Discord_Channel_AnnouncementInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Announcement`)
};

export const discord_channel_stage = /** @type {(inputs: Discord_Channel_StageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stage`)
};

export const discord_channel_forum = /** @type {(inputs: Discord_Channel_ForumInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Forum`)
};

export const discord_channel_default = /** @type {(inputs: Discord_Channel_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channel`)
};

export const slack_channel_private = /** @type {(inputs: Slack_Channel_PrivateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Private`)
};

export const slack_channel_public = /** @type {(inputs: Slack_Channel_PublicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public`)
};

export const slack_channel_direct_message = /** @type {(inputs: Slack_Channel_Direct_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Direct Message`)
};

export const slack_channel_multi_person_dm = /** @type {(inputs: Slack_Channel_Multi_Person_DmInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Multi Person DM`)
};

export const slack_channel_group = /** @type {(inputs: Slack_Channel_GroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Group`)
};

export const slack_channel_default = /** @type {(inputs: Slack_Channel_DefaultInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Channel`)
};

export const settings_remove_member_error = /** @type {(inputs: Settings_Remove_Member_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to remove the member. Please try again later.`)
};

export const knowledge_upload_completed = /** @type {(inputs: Knowledge_Upload_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} uploaded and processed successfully`)
};

export const knowledge_web_crawl_completed = /** @type {(inputs: Knowledge_Web_Crawl_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Web crawl completed: ${i?.url}`)
};

export const knowledge_close_result_panel = /** @type {(inputs: Knowledge_Close_Result_PanelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close result panel`)
};

export const knowledge_close_detail_popup = /** @type {(inputs: Knowledge_Close_Detail_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close detail popup`)
};

export const knowledge_close_document_popup = /** @type {(inputs: Knowledge_Close_Document_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close document popup`)
};

export const knowledge_chunk_list = /** @type {(inputs: Knowledge_Chunk_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Knowledge list`)
};

export const knowledge_close_image_preview = /** @type {(inputs: Knowledge_Close_Image_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close image preview`)
};

export const knowledge_delete_confirm_action = /** @type {(inputs: Knowledge_Delete_Confirm_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

export const knowledge_delete_confirm_desc_prefix = /** @type {(inputs: Knowledge_Delete_Confirm_Desc_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This action cannot be undone: `)
};

export const knowledge_delete_confirm_title = /** @type {(inputs: Knowledge_Delete_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete knowledge?`)
};

export const knowledge_delete_failed = /** @type {(inputs: Knowledge_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete failed`)
};

export const knowledge_deleting = /** @type {(inputs: Knowledge_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deleting...`)
};

export const knowledge_doc_insight_title = /** @type {(inputs: Knowledge_Doc_Insight_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document Insight`)
};

export const knowledge_doc_title = /** @type {(inputs: Knowledge_Doc_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Title`)
};

export const knowledge_generated_count = /** @type {(inputs: Knowledge_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated Knowledge`)
};

export const knowledge_image_attachments = /** @type {(inputs: Knowledge_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Image Attachments`)
};

export const knowledge_image_preview_hint = /** @type {(inputs: Knowledge_Image_Preview_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to preview image`)
};

export const knowledge_load_attachments_failed = /** @type {(inputs: Knowledge_Load_Attachments_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load attachments`)
};

export const knowledge_load_chunks_failed = /** @type {(inputs: Knowledge_Load_Chunks_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load knowledge rows`)
};

export const knowledge_manual_knowledge_prefix = /** @type {(inputs: Knowledge_Manual_Knowledge_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual knowledge`)
};

export const knowledge_no_chunk_data = /** @type {(inputs: Knowledge_No_Chunk_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No knowledge rows in this document`)
};

export const knowledge_no_image_attachments = /** @type {(inputs: Knowledge_No_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No previewable image attachments`)
};

export const knowledge_no_source_document_url = /** @type {(inputs: Knowledge_No_Source_Document_UrlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document URL not found`)
};

export const knowledge_preview = /** @type {(inputs: Knowledge_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview`)
};

export const knowledge_role_assistant = /** @type {(inputs: Knowledge_Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assistant`)
};

export const knowledge_role_user = /** @type {(inputs: Knowledge_Role_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User`)
};

export const knowledge_search_placeholder = /** @type {(inputs: Knowledge_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search knowledge`)
};

export const knowledge_session_not_found = /** @type {(inputs: Knowledge_Session_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No session messages found`)
};

export const knowledge_source_filter = /** @type {(inputs: Knowledge_Source_FilterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source`)
};

export const knowledge_source_manual = /** @type {(inputs: Knowledge_Source_ManualInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual`)
};

export const knowledge_source_official_doc = /** @type {(inputs: Knowledge_Source_Official_DocInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Official Docs`)
};

export const knowledge_source_web_crawl = /** @type {(inputs: Knowledge_Source_Web_CrawlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web Crawl`)
};

export const knowledge_source_session_record = /** @type {(inputs: Knowledge_Source_Session_RecordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Session Record`)
};

export const knowledge_source_title = /** @type {(inputs: Knowledge_Source_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Knowledge Source`)
};

export const knowledge_upload_crawl_hint = /** @type {(inputs: Knowledge_Upload_Crawl_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The crawler starts from this URL and pushes extracted content into the knowledge pipeline.`)
};

export const knowledge_upload_crawl_max_depth_label = /** @type {(inputs: Knowledge_Upload_Crawl_Max_Depth_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Max Depth`)
};

export const knowledge_upload_crawl_max_pages_label = /** @type {(inputs: Knowledge_Upload_Crawl_Max_Pages_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Max Pages`)
};

export const knowledge_upload_crawl_tab = /** @type {(inputs: Knowledge_Upload_Crawl_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crawl URL`)
};

export const knowledge_upload_crawl_url_label = /** @type {(inputs: Knowledge_Upload_Crawl_Url_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source URL`)
};

export const knowledge_upload_crawl_url_placeholder = /** @type {(inputs: Knowledge_Upload_Crawl_Url_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. https://docs.example.com`)
};

export const knowledge_upload_crawl_url_required = /** @type {(inputs: Knowledge_Upload_Crawl_Url_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a valid URL (http/https)`)
};

export const knowledge_tab_docs = /** @type {(inputs: Knowledge_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

export const knowledge_tab_items = /** @type {(inputs: Knowledge_Tab_ItemsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Knowledge`)
};

export const knowledge_total_count_prefix = /** @type {(inputs: Knowledge_Total_Count_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total`)
};

export const knowledge_total_count_suffix = /** @type {(inputs: Knowledge_Total_Count_SuffixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (``)
};

export const knowledge_total_prefix = /** @type {(inputs: Knowledge_Total_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total`)
};

export const knowledge_type_size = /** @type {(inputs: Knowledge_Type_SizeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type/Size`)
};

export const knowledge_upload_dialog_title = /** @type {(inputs: Knowledge_Upload_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload Knowledge`)
};

export const knowledge_upload_doc_click = /** @type {(inputs: Knowledge_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to upload`)
};

export const knowledge_upload_doc_drag_hint = /** @type {(inputs: Knowledge_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Or drag file here`)
};

export const knowledge_upload_doc_format_hint = /** @type {(inputs: Knowledge_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supports PDF / DOC / DOCX / MD`)
};

export const knowledge_upload_doc_tab = /** @type {(inputs: Knowledge_Upload_Doc_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload Document`)
};

export const knowledge_upload_knowledge = /** @type {(inputs: Knowledge_Upload_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload`)
};

export const knowledge_upload_manual_tab = /** @type {(inputs: Knowledge_Upload_Manual_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual`)
};

export const knowledge_upload_selected_files_title = /** @type {(inputs: Knowledge_Upload_Selected_Files_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selected Files`)
};

export const knowledge_upload_selected_prefix = /** @type {(inputs: Knowledge_Upload_Selected_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Selected: `)
};

export const knowledge_upload_submit = /** @type {(inputs: Knowledge_Upload_SubmitInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Confirm Upload`)
};

export const knowledge_uploader = /** @type {(inputs: Knowledge_UploaderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploader`)
};

export const knowledge_uploaded_at = /** @type {(inputs: Knowledge_Uploaded_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uploaded At`)
};

export const knowledge_uploading = /** @type {(inputs: Knowledge_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Processing...`)
};

export const knowledge_view_document = /** @type {(inputs: Knowledge_View_DocumentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View document`)
};

export const knowledge_view_source = /** @type {(inputs: Knowledge_View_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View source`)
};

export const session_unknown_channel = /** @type {(inputs: Session_Unknown_ChannelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown channel`)
};

export const app_logo_alt = /** @type {(inputs: App_Logo_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius logo`)
};

export const onboarding_company_website_placeholder = /** @type {(inputs: Onboarding_Company_Website_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`https://example.com`)
};

export const member_management_email_placeholder = /** @type {(inputs: Member_Management_Email_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`member@example.com`)
};

export const service_login_required = /** @type {(inputs: Service_Login_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You are not signed in. Please sign in again and retry.`)
};

export const service_company_update_permission_denied = /** @type {(inputs: Service_Company_Update_Permission_DeniedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You do not have permission to update company info. Contact a workspace admin.`)
};

export const service_company_not_found = /** @type {(inputs: Service_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current company info was not found. Refresh and try again.`)
};

export const service_company_name_required = /** @type {(inputs: Service_Company_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a company name.`)
};

export const service_workspace_create_failed = /** @type {(inputs: Service_Workspace_Create_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create the workspace. Please try again later.`)
};

export const service_workspace_create_missing_company_id = /** @type {(inputs: Service_Workspace_Create_Missing_Company_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace creation succeeded, but the company ID was missing.`)
};

export const service_avatar_public_url_missing = /** @type {(inputs: Service_Avatar_Public_Url_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avatar upload succeeded, but no public URL was returned.`)
};

export const service_profile_name_conflict = /** @type {(inputs: Service_Profile_Name_ConflictInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This nickname is already in use in the current workspace. Please choose another one.`)
};

export const service_profile_member_inactive = /** @type {(inputs: Service_Profile_Member_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`You are not an active member of the current company, or the invitation has not taken effect yet. Please sign in again and retry.`)
};

export const service_discord_request_failed = /** @type {(inputs: Service_Discord_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discord integration request failed.`)
};

export const service_slack_request_failed = /** @type {(inputs: Service_Slack_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack integration request failed.`)
};

export const service_telegram_request_failed = /** @type {(inputs: Service_Telegram_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Telegram integration request failed.`)
};

export const service_feishu_channels_read_failed = /** @type {(inputs: Service_Feishu_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to read Feishu channels.`)
};

export const service_member_management_request_failed = /** @type {(inputs: Service_Member_Management_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Member management request failed. Please try again later.`)
};

export const service_member_activity_report_failed = /** @type {(inputs: Service_Member_Activity_Report_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to report member activity. Please try again later.`)
};

export const service_event_action_request_failed = /** @type {(inputs: Service_Event_Action_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event action failed. Please try again later.`)
};

export const service_billing_request_failed = /** @type {(inputs: Service_Billing_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing request failed. Please try again later.`)
};

export const service_client_chat_request_failed = /** @type {(inputs: Service_Client_Chat_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client chat request failed. Please try again later.`)
};

export const service_workgroup_table_missing = /** @type {(inputs: Service_Workgroup_Table_MissingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The workgroup settings table has not been created yet. Please apply the latest database migration first.`)
};

export const service_workgroup_fetch_failed = /** @type {(inputs: Service_Workgroup_Fetch_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load workgroup settings.`)
};

export const service_workgroup_save_failed = /** @type {(inputs: Service_Workgroup_Save_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save workgroup settings.`)
};

export const service_workgroup_save_incomplete = /** @type {(inputs: Service_Workgroup_Save_IncompleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workgroup settings were saved, but the returned data is incomplete.`)
};

export const service_workgroup_delete_failed = /** @type {(inputs: Service_Workgroup_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to delete workgroup settings.`)
};

export const service_event_query_schema_not_exposed = /** @type {(inputs: Service_Event_Query_Schema_Not_ExposedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The \`lucius_agent\` schema is not exposed in Supabase API yet. Add \`lucius_agent\` in Supabase Dashboard -> Project Settings -> API -> Exposed schemas, then try again.`)
};

export const service_event_query_schema_permission_denied = /** @type {(inputs: Service_Event_Query_Schema_Permission_DeniedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`The current account cannot access the \`${i?.schemaName}\` schema. Grant schema usage and table read access to the browser role, or query through a server proxy and try again.`)
};

export const service_event_query_failed = /** @type {(inputs: Service_Event_Query_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to query events. Please try again later.`)
};

export const service_event_detail_request_failed = /** @type {(inputs: Service_Event_Detail_Request_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load event details. Please try again later.`)
};

export const service_event_query_empty_content = /** @type {(inputs: Service_Event_Query_Empty_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`[No text content]`)
};

export const common_lucius_ai_name = /** @type {(inputs: Common_Lucius_Ai_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius AI`)
};

export const workgroup_meta_supergroup = /** @type {(inputs: Workgroup_Meta_SupergroupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supergroup`)
};

export const workgroup_channel_missing_from_platform = /** @type {(inputs: Workgroup_Channel_Missing_From_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This channel was not returned by the current platform list`)
};

export const workgroup_summary_selected = /** @type {(inputs: Workgroup_Summary_SelectedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup(s) configured`)
};

export const workgroup_summary_available = /** @type {(inputs: Workgroup_Summary_AvailableInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Choose from ${i?.count} channel(s)`)
};

export const workgroup_summary_saved_needs_connection = /** @type {(inputs: Workgroup_Summary_Saved_Needs_ConnectionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} workgroup(s) saved. Reconnect this platform to continue.`)
};

export const workgroup_summary_unavailable = /** @type {(inputs: Workgroup_Summary_UnavailableInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable`)
};

export const workgroup_summary_needs_connection = /** @type {(inputs: Workgroup_Summary_Needs_ConnectionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect the platform first`)
};

export const workgroup_helper_connected_named = /** @type {(inputs: Workgroup_Helper_Connected_NamedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Connected to ${i?.name}`)
};

export const workgroup_discord_ready = /** @type {(inputs: Workgroup_Discord_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Discord is connected. You can continue selecting workgroups.`)
};

export const workgroup_discord_connect_first = /** @type {(inputs: Workgroup_Discord_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect a Discord community in Discord settings before choosing workgroups.`)
};

export const workgroup_discord_channels_read_failed = /** @type {(inputs: Workgroup_Discord_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Discord channels.`)
};

export const workgroup_discord_status_read_failed = /** @type {(inputs: Workgroup_Discord_Status_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Discord connection status.`)
};

export const workgroup_slack_ready = /** @type {(inputs: Workgroup_Slack_ReadyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Slack is connected. You can continue selecting workgroups.`)
};

export const workgroup_slack_connect_first = /** @type {(inputs: Workgroup_Slack_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Connect a Slack workspace in Slack settings before choosing workgroups.`)
};

export const workgroup_slack_channels_read_failed = /** @type {(inputs: Workgroup_Slack_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Slack channels.`)
};

export const workgroup_slack_status_read_failed = /** @type {(inputs: Workgroup_Slack_Status_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Slack connection status.`)
};

export const workgroup_telegram_ready = /** @type {(inputs: Workgroup_Telegram_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Telegram communities bound. You can continue selecting workgroups.`)
};

export const workgroup_telegram_connect_first = /** @type {(inputs: Workgroup_Telegram_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add a Telegram community in Telegram settings before choosing workgroups.`)
};

export const workgroup_telegram_channels_read_failed = /** @type {(inputs: Workgroup_Telegram_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Telegram communities.`)
};

export const workgroup_feishu_ready = /** @type {(inputs: Workgroup_Feishu_ReadyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Feishu chats synced. You can continue selecting workgroups.`)
};

export const workgroup_feishu_connect_first = /** @type {(inputs: Workgroup_Feishu_Connect_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finish Feishu workgroup access before choosing workgroups.`)
};

export const workgroup_feishu_channels_read_failed = /** @type {(inputs: Workgroup_Feishu_Channels_Read_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load Feishu channels.`)
};

export const knowledge_session_load_failed = /** @type {(inputs: Knowledge_Session_Load_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to load session: ${i?.status}`)
};

export const billing_plan_name_free = /** @type {(inputs: Billing_Plan_Name_FreeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free`)
};

export const billing_plan_name_basic = /** @type {(inputs: Billing_Plan_Name_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic`)
};

export const billing_plan_name_pro = /** @type {(inputs: Billing_Plan_Name_ProInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro`)
};

export const billing_export_base_plan_label = /** @type {(inputs: Billing_Export_Base_Plan_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base plan`)
};

export const billing_export_base_plan_description = /** @type {(inputs: Billing_Export_Base_Plan_DescriptionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.planName} monthly fee`)
};

export const billing_export_base_plan_quantity = /** @type {(inputs: Billing_Export_Base_Plan_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 plan`)
};

export const billing_export_included_actions_label = /** @type {(inputs: Billing_Export_Included_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Included actions`)
};

export const billing_export_included_actions_desc = /** @type {(inputs: Billing_Export_Included_Actions_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quota included in the current billing period`)
};

export const billing_export_used_actions_label = /** @type {(inputs: Billing_Export_Used_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Used actions`)
};

export const billing_export_used_actions_desc_over = /** @type {(inputs: Billing_Export_Used_Actions_Desc_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exceeded the included quota`)
};

export const billing_export_used_actions_desc_included = /** @type {(inputs: Billing_Export_Used_Actions_Desc_IncludedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Still within the included quota`)
};

export const billing_export_extra_admins_label = /** @type {(inputs: Billing_Export_Extra_Admins_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Extra admin seats`)
};

export const billing_export_extra_admins_desc = /** @type {(inputs: Billing_Export_Extra_Admins_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admins beyond the included quota`)
};

export const billing_export_extra_platforms_label = /** @type {(inputs: Billing_Export_Extra_Platforms_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Extra platform connections`)
};

export const billing_export_extra_platforms_desc = /** @type {(inputs: Billing_Export_Extra_Platforms_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platforms beyond the included quota`)
};

export const billing_export_overage_actions_label = /** @type {(inputs: Billing_Export_Overage_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage actions`)
};

export const billing_export_overage_actions_desc = /** @type {(inputs: Billing_Export_Overage_Actions_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Billed under the ${i?.mode} policy`)
};

export const billing_export_blocked_actions_label = /** @type {(inputs: Billing_Export_Blocked_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blocked actions`)
};

export const billing_export_blocked_actions_desc_stop = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_StopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blocked by the stop-service policy and not billed`)
};

export const billing_export_blocked_actions_desc_cap = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blocked by the quota policy in the current period`)
};

export const billing_export_quantity_actions = /** @type {(inputs: Billing_Export_Quantity_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} actions`)
};

export const billing_export_quantity_admins = /** @type {(inputs: Billing_Export_Quantity_AdminsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} seat(s)`)
};

export const billing_export_quantity_platforms = /** @type {(inputs: Billing_Export_Quantity_PlatformsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} platform(s)`)
};

export const billing_export_csv_account_id = /** @type {(inputs: Billing_Export_Csv_Account_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing account ID`)
};

export const billing_export_csv_period_key = /** @type {(inputs: Billing_Export_Csv_Period_KeyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Period key`)
};

export const billing_export_csv_period_start = /** @type {(inputs: Billing_Export_Csv_Period_StartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Period start`)
};

export const billing_export_csv_period_end = /** @type {(inputs: Billing_Export_Csv_Period_EndInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Period end`)
};

export const billing_export_csv_plan = /** @type {(inputs: Billing_Export_Csv_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan`)
};

export const billing_export_csv_overage_policy = /** @type {(inputs: Billing_Export_Csv_Overage_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage policy`)
};

export const billing_export_csv_projected_total = /** @type {(inputs: Billing_Export_Csv_Projected_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected bill (USD)`)
};

export const billing_export_csv_category = /** @type {(inputs: Billing_Export_Csv_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Category`)
};

export const billing_export_csv_description = /** @type {(inputs: Billing_Export_Csv_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Description`)
};

export const billing_export_csv_charge = /** @type {(inputs: Billing_Export_Csv_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Charge item`)
};

export const billing_export_csv_info = /** @type {(inputs: Billing_Export_Csv_InfoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Info item`)
};

export const billing_export_csv_estimated_total = /** @type {(inputs: Billing_Export_Csv_Estimated_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estimated settlement total`)
};

export const cp_page_title = /** @type {(inputs: Cp_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Community Profile`)
};

export const cp_filter_community = /** @type {(inputs: Cp_Filter_CommunityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Community`)
};

export const cp_filter_time = /** @type {(inputs: Cp_Filter_TimeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Time`)
};

export const cp_all_communities = /** @type {(inputs: Cp_All_CommunitiesInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`All communities (${i?.count})`)
};

export const cp_time_7d = /** @type {(inputs: Cp_Time_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last 7 days`)
};

export const cp_time_14d = /** @type {(inputs: Cp_Time_14dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last 14 days`)
};

export const cp_time_30d = /** @type {(inputs: Cp_Time_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last 30 days`)
};

export const cp_section_metrics = /** @type {(inputs: Cp_Section_MetricsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Key Metrics`)
};

export const cp_total_users = /** @type {(inputs: Cp_Total_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total Users`)
};

export const cp_total_users_helper = /** @type {(inputs: Cp_Total_Users_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total community size`)
};

export const cp_new_users = /** @type {(inputs: Cp_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New Users`)
};

export const cp_new_users_helper = /** @type {(inputs: Cp_New_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Accumulated in ${i?.range}`)
};

export const cp_active_users = /** @type {(inputs: Cp_Active_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active Users`)
};

export const cp_active_users_helper = /** @type {(inputs: Cp_Active_Users_HelperInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Active in ${i?.range}`)
};

export const cp_section_trends = /** @type {(inputs: Cp_Section_TrendsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trend Insights`)
};

export const cp_chart_total_users = /** @type {(inputs: Cp_Chart_Total_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total Users Trend`)
};

export const cp_chart_new_users = /** @type {(inputs: Cp_Chart_New_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New Users Trend`)
};

export const cp_chart_active_users = /** @type {(inputs: Cp_Chart_Active_UsersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active Users Trend`)
};

export const cp_no_chart_data = /** @type {(inputs: Cp_No_Chart_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No data available for the selected time range`)
};

export const ul_page_title = /** @type {(inputs: Ul_Page_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User List`)
};

export const ul_no_data = /** @type {(inputs: Ul_No_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`N/A`)
};

export const ul_platform_all = /** @type {(inputs: Ul_Platform_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Platforms`)
};

export const ul_active_all = /** @type {(inputs: Ul_Active_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Activity Periods`)
};

export const ul_active_7d = /** @type {(inputs: Ul_Active_7dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active in 7 days`)
};

export const ul_active_30d = /** @type {(inputs: Ul_Active_30dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active in 30 days`)
};

export const ul_active_90d = /** @type {(inputs: Ul_Active_90dInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active in 90 days`)
};

export const ul_sort_last_active = /** @type {(inputs: Ul_Sort_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Active`)
};

export const ul_sort_total_messages = /** @type {(inputs: Ul_Sort_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Total Messages`)
};

export const ul_sort_last_summary = /** @type {(inputs: Ul_Sort_Last_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Summary`)
};

export const ul_sort_last_updated = /** @type {(inputs: Ul_Sort_Last_UpdatedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Updated`)
};

export const ul_sort_created_at = /** @type {(inputs: Ul_Sort_Created_AtInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Created At`)
};

export const ul_sort_username = /** @type {(inputs: Ul_Sort_UsernameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Username`)
};

export const ul_order_desc = /** @type {(inputs: Ul_Order_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Descending`)
};

export const ul_order_asc = /** @type {(inputs: Ul_Order_AscInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ascending`)
};

export const ul_search_placeholder = /** @type {(inputs: Ul_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search user_id / username / profile`)
};

export const ul_clear_filters = /** @type {(inputs: Ul_Clear_FiltersInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clear Filters`)
};

export const ul_total_users = /** @type {(inputs: Ul_Total_UsersInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} users total`)
};

export const ul_showing_range = /** @type {(inputs: Ul_Showing_RangeInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Showing ${i?.start}-${i?.end}`)
};

export const ul_updating = /** @type {(inputs: Ul_UpdatingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updating`)
};

export const ul_pick_company_first = /** @type {(inputs: Ul_Pick_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company to view the user list.`)
};

export const ul_load_error = /** @type {(inputs: Ul_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load user list`)
};

export const ul_col_user = /** @type {(inputs: Ul_Col_UserInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User`)
};

export const ul_col_platform = /** @type {(inputs: Ul_Col_PlatformInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Platform`)
};

export const ul_col_total_messages = /** @type {(inputs: Ul_Col_Total_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Messages`)
};

export const ul_col_first_interaction = /** @type {(inputs: Ul_Col_First_InteractionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`First Interaction`)
};

export const ul_col_last_active = /** @type {(inputs: Ul_Col_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Active`)
};

export const ul_col_profile = /** @type {(inputs: Ul_Col_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Profile`)
};

export const ul_col_tags = /** @type {(inputs: Ul_Col_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tags`)
};

export const ul_all_tags = /** @type {(inputs: Ul_All_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Tags`)
};

export const ul_no_tags = /** @type {(inputs: Ul_No_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No tags`)
};

export const ul_min_messages = /** @type {(inputs: Ul_Min_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Min messages`)
};

export const ul_sort_field = /** @type {(inputs: Ul_Sort_FieldInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sort by`)
};

export const ul_sort_order = /** @type {(inputs: Ul_Sort_OrderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Order`)
};

export const ul_no_profile = /** @type {(inputs: Ul_No_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No profile yet`)
};

export const ul_empty_results = /** @type {(inputs: Ul_Empty_ResultsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No users found with current filters.`)
};

export const ul_detail_title = /** @type {(inputs: Ul_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User Profile`)
};

export const ul_close_detail = /** @type {(inputs: Ul_Close_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close detail`)
};

export const ul_detail_first_interaction = /** @type {(inputs: Ul_Detail_First_InteractionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`First Interaction`)
};

export const ul_detail_first_interaction_helper = /** @type {(inputs: Ul_Detail_First_Interaction_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`First interaction date recorded by the system`)
};

export const ul_detail_last_active = /** @type {(inputs: Ul_Detail_Last_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last Active`)
};

export const ul_detail_last_active_helper = /** @type {(inputs: Ul_Detail_Last_Active_HelperInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Last message date`)
};

export const ul_detail_profile = /** @type {(inputs: Ul_Detail_ProfileInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User Profile`)
};

export const ul_detail_profile_expand = /** @type {(inputs: Ul_Detail_Profile_ExpandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expand`)
};

export const ul_detail_profile_collapse = /** @type {(inputs: Ul_Detail_Profile_CollapseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Collapse`)
};

export const ul_detail_tags = /** @type {(inputs: Ul_Detail_TagsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag Details`)
};

export const ul_detail_no_reason = /** @type {(inputs: Ul_Detail_No_ReasonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No reason provided`)
};

export const ul_trend_messages_title = /** @type {(inputs: Ul_Trend_Messages_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30-Day Message Trend`)
};

export const ul_trend_messages_desc = /** @type {(inputs: Ul_Trend_Messages_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated from m30_message_counts`)
};

export const ul_trend_active_title = /** @type {(inputs: Ul_Trend_Active_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`30-Day Activity Score`)
};

export const ul_trend_active_desc = /** @type {(inputs: Ul_Trend_Active_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated from active_score`)
};

export const ul_chat_records = /** @type {(inputs: Ul_Chat_RecordsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat Records`)
};

export const ul_loading_messages = /** @type {(inputs: Ul_Loading_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading messages`)
};

export const ul_load_messages_error = /** @type {(inputs: Ul_Load_Messages_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load messages`)
};

export const ul_no_messages = /** @type {(inputs: Ul_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No chat records`)
};

export const ul_empty_message = /** @type {(inputs: Ul_Empty_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empty message content`)
};

export const ul_channel = /** @type {(inputs: Ul_ChannelInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Channel ${i?.channelId}`)
};

export const ul_total_messages_count = /** @type {(inputs: Ul_Total_Messages_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} messages total`)
};

export const ul_loading_detail = /** @type {(inputs: Ul_Loading_DetailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading user details`)
};

export const ul_loading_detail_desc = /** @type {(inputs: Ul_Loading_Detail_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please wait, loading user profile and messages.`)
};

export const ul_detail_load_error = /** @type {(inputs: Ul_Detail_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load user details`)
};

export const ul_retry_later = /** @type {(inputs: Ul_Retry_LaterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please try again later`)
};

export const ul_tag_manage_button = /** @type {(inputs: Ul_Tag_Manage_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manage Tags`)
};

export const ul_tag_manage_title = /** @type {(inputs: Ul_Tag_Manage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag Management`)
};

export const ul_tag_manage_desc = /** @type {(inputs: Ul_Tag_Manage_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Review existing tags and create or disable tag definitions for the current company.`)
};

export const ul_tag_existing = /** @type {(inputs: Ul_Tag_ExistingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Existing Tags`)
};

export const ul_tag_count = /** @type {(inputs: Ul_Tag_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} tags`)
};

export const ul_tag_loading = /** @type {(inputs: Ul_Tag_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading tags`)
};

export const ul_tag_load_error = /** @type {(inputs: Ul_Tag_Load_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load tags`)
};

export const ul_tag_empty = /** @type {(inputs: Ul_Tag_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No tags yet`)
};

export const ul_tag_status_active = /** @type {(inputs: Ul_Tag_Status_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Active`)
};

export const ul_tag_status_inactive = /** @type {(inputs: Ul_Tag_Status_InactiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inactive`)
};

export const ul_tag_toggle_label = /** @type {(inputs: Ul_Tag_Toggle_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enabled`)
};

export const ul_tag_no_description = /** @type {(inputs: Ul_Tag_No_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No description`)
};

export const ul_tag_create_title = /** @type {(inputs: Ul_Tag_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create Tag`)
};

export const ul_tag_create_desc = /** @type {(inputs: Ul_Tag_Create_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New tags are synced to the filter list immediately and enabled by default.`)
};

export const ul_tag_form_name = /** @type {(inputs: Ul_Tag_Form_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag Name`)
};

export const ul_tag_form_name_placeholder = /** @type {(inputs: Ul_Tag_Form_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. High-intent lead`)
};

export const ul_tag_form_name_required = /** @type {(inputs: Ul_Tag_Form_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a tag name`)
};

export const ul_tag_form_description = /** @type {(inputs: Ul_Tag_Form_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Description`)
};

export const ul_tag_form_description_placeholder = /** @type {(inputs: Ul_Tag_Form_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Describe the rule or operational use for this tag`)
};

export const ul_tag_create_button = /** @type {(inputs: Ul_Tag_Create_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create Tag`)
};

export const ul_tag_create_loading = /** @type {(inputs: Ul_Tag_Create_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creating...`)
};

export const ul_tag_create_success = /** @type {(inputs: Ul_Tag_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag created`)
};

export const ul_tag_create_error = /** @type {(inputs: Ul_Tag_Create_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create tag`)
};

export const ul_tag_update_error = /** @type {(inputs: Ul_Tag_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to update tag`)
};

export const ul_tag_enable_success = /** @type {(inputs: Ul_Tag_Enable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag enabled`)
};

export const ul_tag_disable_success = /** @type {(inputs: Ul_Tag_Disable_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag disabled`)
};

export const ul_tag_init_button = /** @type {(inputs: Ul_Tag_Init_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Initialize Default Tags`)
};

export const ul_tag_init_loading = /** @type {(inputs: Ul_Tag_Init_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Initializing...`)
};

export const ul_tag_init_success = /** @type {(inputs: Ul_Tag_Init_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default tags synced`)
};

export const ul_tag_init_error = /** @type {(inputs: Ul_Tag_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to initialize default tags`)
};