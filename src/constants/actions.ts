/**
 * All valid action types
 * 
 * @since 0.12
 */
export enum ActionType {
    SET_LOCALE = 'MapGuide/SET_LOCALE',
    
    INIT_APP = 'MapGuide/INIT_APP',
    INIT_ERROR = 'MapGuide/INIT_ERROR',
    INIT_ACKNOWLEDGE_WARNINGS = 'MapGuide/INIT_ACKNOWLEDGE_WARNINGS',

    LEGEND_SET_GROUP_VISIBILITY = 'Legend/SET_GROUP_VISIBILITY',
    LEGEND_SET_LAYER_VISIBILITY = 'Legend/SET_LAYER_VISIBILITY',
    LEGEND_SET_LAYER_SELECTABLE = 'Legend/SET_LAYER_SELECTABLE',
    LEGEND_SET_GROUP_EXPANDABLE = 'Legend/SET_GROUP_EXPANDABLE',

    MAP_SET_ACTIVE_MAP = 'Map/SET_ACTIVE_MAP',
    MAP_REFRESH = 'Map/REFRESH',
    MAP_SET_VIEW = 'Map/SET_VIEW',
    MAP_SET_SCALE = 'Map/SET_SCALE',
    MAP_SET_ACTIVE_TOOL = 'Map/SET_ACTIVE_TOOL',
    MAP_SET_MAPTIP = 'Map/SET_MAPTIP',
    MAP_SET_MANUAL_MAPTIP = 'Map/MAP_SET_MANUAL_MAPTIP',
    MAP_SET_SELECTION = 'Map/SET_SELECTION',
    MAP_SET_BUSY_COUNT = 'Map/SET_BUSY_COUNT',
    MAP_SET_BASE_LAYER = 'Map/SET_BASE_LAYER',
    MAP_ZOOM_IN = 'Map/ZOOM_IN',
    MAP_ZOOM_OUT = 'Map/ZOOM_OUT',
    MAP_PREVIOUS_VIEW = 'Map/PREVIOUS_VIEW',
    MAP_NEXT_VIEW = 'Map/NEXT_VIEW',
    MAP_SET_LAYER_TRANSPARENCY = 'Map/SET_LAYER_TRANSPARENCY',
    MAP_SET_VIEW_SIZE_UNITS = 'Map/SET_VIEW_SIZE_UNITS',
    MAP_SET_VIEW_ROTATION = 'Map/SET_VIEW_ROTATION',
    MAP_SET_VIEW_ROTATION_ENABLED = 'Map/SET_VIEW_ROTATION_ENABLED',
    MAP_RESIZED = 'Map/RESIZED',
    MAP_SHOW_SELECTED_FEATURE = 'Map/SHOW_SELECTED_FEATURE',

    TASK_INVOKE_URL = 'TaskPane/INVOKE_URL',
    TASK_PANE_HOME = 'TaskPane/HOME',
    TASK_PANE_FORWARD = 'TaskPane/FORWARD',
    TASK_PANE_BACK = 'TaskPane/BACK',
    TASK_PANE_PUSH_URL = 'TaskPane/PUSH_URL',

    FUSION_SET_ELEMENT_STATE = 'Fusion/SET_ELEMENT_STATE',
    FUSION_SET_TASK_PANE_VISIBILITY = 'Fusion/SET_TASK_PANE_VISIBILITY',
    FUSION_SET_LEGEND_VISIBILITY = 'Fusion/SET_LEGEND_VISIBILITY',
    FUSION_SET_SELECTION_PANEL_VISIBILITY = 'Fusion/SET_SELECTION_PANEL_VISIBILITY',
    //FUSION_SET_OVERVIEW_MAP_VISIBILITY = 'Fusion/SET_OVERVIEW_MAP_VISIBILITY',
    FLYOUT_OPEN = 'Flyout/OPEN',
    FLYOUT_CLOSE = 'Flyout/CLOSE',
    COMPONENT_OPEN = 'Flyout/COMPONENT_OPEN',
    COMPONENT_CLOSE = 'Flyout/COMPONENT_CLOSE',
    UPDATE_MOUSE_COORDINATES = 'Status/UPDATE_MOUSE_COORDINATES',
    MODAL_SHOW_COMPONENT = 'Modal/SHOW_COMPONENT',
    MODAL_SHOW_URL = 'Modal/SHOW_URL',
    MODAL_CLOSE = 'Modal/CLOSE'
}