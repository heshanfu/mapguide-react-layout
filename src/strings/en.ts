const STRINGS_EN: any = {
    "UNKNOWN_WIDGET": "This button references an unknown or unsupported widget: {widget}",
    "UNKNOWN_COMMAND_REFERENCE": "This button references an unknown command or unsupported: {command}",
    "INIT_ERROR_TITLE": "An error occurred during startup",
    "INIT_ERROR_UNSUPPORTED_COORD_SYS": "<p>The Map Definition <strong>{mapDefinition}</strong>, uses a coordinate system that does not resolve to a valid EPSG code and cannot be loaded in this viewer</p><p>Solution:</p><ul><li>Change the coordinate system of this Map Definition to one that resolves to an EPSG code</li><li>Please note: There will be a small performance overhead for server-side re-projection as a result of doing this</li></ul>",
    "INIT_ERROR_UNREGISTERED_EPSG_CODE": "<p>The Map Definition <strong>{mapDefinition}</strong>, uses a coordinate system that resolves to a valid EPSG code (<strong>EPSG:{epsg}</strong>), but no projection for this EPSG code has been registered</p><p>Solution:</p><ol><li>Search for the matching proj4js definition at <a href='http://epsg.io/'>http://epsg.io/</a></li><li>Register this projection to the viewer before mounting it</li></ol>",
    "INIT_ERROR_EXPIRED_SESSION": "<p>The session id given has expired: <strong>{sessionId}</strong></p><p>Reload the viewer without the <strong>session</strong> parameter, or supply a valid session id for the <strong>session</strong> parameter</p>",
    "INIT_ERROR_RESOURCE_NOT_FOUND": "Attempted to load the following resource, but it was not found: <strong>{resourceId}</strong>",
    "INIT_ERROR_NO_CONNECTION": "<p>There is no connection between the MapGuide Web Tier and the MapGuide Server.</p><p>Possible causes:</p><ul><li>MapGuide Server is not running or is no longer responding</li><li>Internet connection problems</li></ul><p>Possible solutions:</p><ul><li>Restart the MapGuide Server Service</li><li>Contact your server administrator</li></ul>",
    "TPL_SIDEBAR_OPEN_TASKPANE": "Open Task Pane",
    "TPL_SIDEBAR_OPEN_LEGEND": "Open Legend",
    "TPL_SIDEBAR_OPEN_SELECTION_PANEL": "Open Selection Panel",
    "TPL_TITLE_TASKPANE": "Task Pane",
    "TPL_TITLE_LEGEND": "Legend",
    "TPL_TITLE_SELECTION_PANEL": "Selection",
    "TT_GO_HOME": "Go home",
    "TT_GO_BACK": "Go back",
    "TT_GO_FORWARD": "Go forward",
    "SESSION_EXPIRED": "Session Expired",
    "SESSION_EXPIRED_DETAILED": "Your current MapGuide session has expired",
    "SESSION_EXPIRED_AVAILABLE_ACTIONS": "Available Actions:",
    "SESSION_EXPIRED_RELOAD_VIEWER": "Reload the viewer",
    "ERR_UNREGISTERED_LAYOUT": "ERROR: No layout named ({layout}) registered",
    "ERR_UNREGISTERED_COMPONENT": "ERROR: No such registered component ({componentId}). Ensure the component has been registered in the component registry with an id of: {componentId}",
    "LOADING_MSG": "Loading ...",
    "MENU_TASKS": "Tasks",
    "NO_SELECTED_FEATURES": "No selected features",
    "FMT_SCALE_DISPLAY": "Scale - 1:{scale}",
    "FMT_SELECTION_COUNT": "Selected {total} features in {layerCount} layers",
    "DIGITIZE_POINT_PROMPT": "Click to finish and draw a point at this location<br/><br/>Press ESC to cancel",
    "DIGITIZE_LINE_PROMPT": "Click to set this position as the start.<br/>Click again to finish the line at this position<br/><br/>Press ESC to cancel",
    "DIGITIZE_LINESTRING_PROMPT": "Click to set this position as the start.<br/>Click again to add a vertex at this position.<br/>Hold SHIFT and drag while digitizing to draw in freehand mode<br/></br>Double click to finish<br/>Press ESC to cancel",
    "DIGITIZE_CIRCLE_PROMPT": "Click to set this position as the center.<br/>Move out to the desired radius and click again to finish<br/><br/>Press ESC to cancel",
    "DIGITIZE_RECT_PROMPT": "Click to set this position as one corner.<br/>Click again to finish and set this position as the other corner<br/><br/>Press ESC to cancel",
    "DIGITIZE_POLYGON_PROMPT": "Click to set this positon as the start.<br/>Click again to add a vertex at this position.<br/>Hold SHIFT and drag while digitizing to draw in freehand mode<br/><br/>Double click to finish and close the polygon<br/>Press ESC to cancel",
    "MEASURE": "Measure",
    "MEASUREMENT_TYPE": "Measurement Type",
    "MEASUREMENT_TYPE_LENGTH": "Length (LineString)",
    "MEASUREMENT_TYPE_AREA": "Area (Polygon)",
    "MEASUREMENT_USE_GEODESIC": "Use geodesic measure",
    "MEASUREMENT_CLEAR": "Clear Measurements",
    "MEASUREMENT_CONTINUE_POLYGON": "Click to continue drawing the polygon. Double-click to finish.",
    "MEASUREMENT_CONTINUE_LINE": "Click to continue drawing the line. Double-click to finish.",
    "MEASUREMENT_START_DRAWING": "Click to start drawing",
    "NAVIGATOR_PAN_EAST": "Pan East",
    "NAVIGATOR_PAN_WEST": "Pan West",
    "NAVIGATOR_PAN_SOUTH": "Pan South",
    "NAVIGATOR_PAN_NORTH": "Pan North",
    "NAVIGATOR_ZOOM_OUT": "Zoom Out",
    "NAVIGATOR_ZOOM_IN": "Zoom In",
    "FMT_NAVIGATOR_ZOOM_TO_SCALE": "Zoom to 1:{scale}",
    "EXTERNAL_BASE_LAYERS": "External Base Layers",
    "SELECTION_PROPERTY": "Property",
    "SELECTION_VALUE": "Value",
    "SELECTION_PREV_FEATURE": "Previous Feature",
    "SELECTION_NEXT_FEATURE": "Next Feature",
    "SELECTION_ZOOMTO_FEATURE": "Zoom to selected feature",
    "VIEWER_OPTIONS": "Viewer Options",
    "ABOUT": "About",
    "HELP": "Help",
    "QUICKPLOT_HEADER": "Quick Plot",
    "QUICKPLOT_TITLE": "Title",
    "QUICKPLOT_SUBTITLE": "Sub-Title",
    "QUICKPLOT_PAPER_SIZE": "Paper Size",
    "QUICKPLOT_ORIENTATION": "Orientation",
    "QUICKPLOT_ORIENTATION_P": "Portrait",
    "QUICKPLOT_ORIENTATION_L": "Landscape",
    "QUICKPLOT_SHOWELEMENTS": "Show Elements",
    "QUICKPLOT_SHOWLEGEND": "Show Legend",
    "QUICKPLOT_SHOWNORTHARROW": "Show North Arrow",
    "QUICKPLOT_SHOWCOORDINTES": "Show Coordinates",
    "QUICKPLOT_SHOWSCALEBAR": "Show Scalebar",
    "QUICKPLOT_SHOWDISCLAIMER": "Show Disclaimer",
    "QUICKPLOT_ADVANCED_OPTIONS": "Advanced Options",
    "QUICKPLOT_SCALING": "Scale",
    "QUICKPLOT_DPI": "DPI",
    "QUICKPLOT_GENERATE": "Generate Plot",
    "QUICKPLOT_COMMERCIAL_LAYER_WARNING": "Quick Plot will NOT include any visible commercial map layers"
};

export default STRINGS_EN;