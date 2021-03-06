import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    ICommand,
    IDOMElementMetrics,
    IApplicationState,
    FlyoutVisibilitySet} from "../api/common";
import { mapToolbarReference } from "../api/registry/command";
import { Toolbar, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import * as MapActions from "../actions/map";
import { processMenuItems } from "../utils/menu";
import * as FlyoutActions from "../actions/flyout";
import { useReducedToolbarAppState } from './hooks';

export interface IToolbarContainerProps {
    id: string;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
    containerClass?: string;
    containerStyle?: React.CSSProperties;
}

const ToolbarContainer = (props: IToolbarContainerProps) => {
    const { containerClass, containerStyle, vertical, hideVerticalLabels } = props;
    const dispatch = useDispatch();
    const flyouts = useSelector<IApplicationState, any>(state => state.toolbar.flyouts);
    const toolbar = useSelector<IApplicationState, any>(state => state.toolbar.toolbars[props.id]);
    const tbState = useReducedToolbarAppState();

    const invokeCommand = (cmd: ICommand, parameters: any) => dispatch(MapActions.invokeCommand(cmd, parameters));
    const openFlyout = (id: string, metrics: IDOMElementMetrics) => dispatch(FlyoutActions.openFlyout(id, metrics));
    const closeFlyout = (id: string) => dispatch(FlyoutActions.closeFlyout(id));
    const openComponent = (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => dispatch(FlyoutActions.openComponent(id, metrics, name, props));
    const closeComponent = (id: string) => dispatch(FlyoutActions.closeComponent(id));

    const onCloseFlyout = (id: string) => closeFlyout?.(id);
    const onOpenFlyout = (id: string, metrics: IDOMElementMetrics) => openFlyout?.(id, metrics);
    const onOpenComponent = (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => openComponent?.(id, metrics, name, props);
    const onCloseComponent = (id: string) => closeComponent?.(id);

    const flyoutStates: FlyoutVisibilitySet = {};
    if (flyouts) {
        const ids = Object.keys(flyouts);
        for (const fid of ids) {
            flyoutStates[fid] = !!flyouts[fid].open;
        }
    }
    let tbContainerStyle: React.CSSProperties = { ...(containerStyle || {}) };
    if (toolbar && toolbar.items && invokeCommand) {
        if (vertical === true) {
            tbContainerStyle.width = DEFAULT_TOOLBAR_SIZE;
        } else {
            tbContainerStyle.height = DEFAULT_TOOLBAR_SIZE;
            tbContainerStyle.overflow = "auto";
        }
        const items = (toolbar.items as any[]).map(tb => mapToolbarReference(tb, tbState, invokeCommand));
        const childItems = processMenuItems(items);
        return <Toolbar vertical={vertical}
            hideVerticalLabels={hideVerticalLabels}
            childItems={childItems}
            containerClass={containerClass}
            containerStyle={tbContainerStyle}
            flyoutStates={flyoutStates}
            onOpenComponent={onOpenComponent}
            onCloseComponent={onCloseComponent}
            onOpenFlyout={onOpenFlyout}
            onCloseFlyout={onCloseFlyout} />;
    } else {
        return <div />;
    }
}

export default ToolbarContainer;