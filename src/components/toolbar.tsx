import * as React from "react";
import { isMenuRef, isComponentFlyout } from "../utils/type-guards";
import { IDOMElementMetrics, FlyoutVisibilitySet, GenericEvent } from "../api/common";
import { ToolbarContext } from "./context";
import { STR_EMPTY } from "../utils/string";
import { ImageIcon } from "./icon";
import {
    SPRITE_ICON_MENUARROWUP,
    SPRITE_ICON_MENUARROW
} from "../constants/assets";
import * as Constants from "../constants";

export const DEFAULT_TOOLBAR_SIZE = 29;
export const TOOLBAR_BACKGROUND_COLOR = "#f0f0f0";

function getSelected(item: IItem): boolean {
    const sel = item.selected;
    if (sel != null) {
        if (typeof sel === 'function') {
            return sel();
        } else {
            return sel;
        }
    }
    return false;
}

export function getEnabled(item: IItem): boolean {
    const en = item.enabled;
    if (en != null) {
        if (typeof en === 'function') {
            return en();
        } else {
            return en;
        }
    }
    return true;
}

function getTooltip(item: IItem): string {
    const tt = item.tooltip;
    if (tt != null) {
        if (typeof tt === 'function') {
            return tt();
        } else {
            return tt;
        }
    }
    return STR_EMPTY;
}

export function getIconStyle(enabled: boolean, height: number): React.CSSProperties {
    const imgStyle: React.CSSProperties = {
        verticalAlign: "middle",
        lineHeight: height
    };
    if (!enabled) {
        imgStyle.opacity = 0.4;
    }
    return imgStyle;
}

function getItemStyle(enabled: boolean, selected: boolean, size: number, isMouseOver: boolean, vertical?: boolean): React.CSSProperties {
    const pad = ((size - 16) / 2);
    const vertPad = 6;
    const style: React.CSSProperties = {
        display: vertical === true ? "block" : "inline-block",
        //height: height,
        paddingLeft: pad,
        paddingRight: pad,
        paddingTop: vertPad,
        paddingBottom: vertPad
    };
    if ((isMouseOver === true && enabled === true) || selected) {
        style.borderWidth = 1;
        style.paddingLeft = pad - 1; //To compensate for border
        style.paddingRight = pad - 1; //To compensate for border
        style.paddingTop = vertPad - 1; //To compensate for border
        style.paddingBottom = vertPad - 1; //To compensate for border
    }
    return style;
}

function getToolbarSeparatorItemStyle(vertical?: boolean): React.CSSProperties {
    const style: React.CSSProperties = {
        display: vertical === true ? "block" : "inline-block"
    };
    if (vertical === true) {
        style.paddingTop = 2;
        style.paddingBottom = -2;
        style.marginLeft = 0;
        style.marginRight = 0;
    } else {
        style.paddingTop = 0;
        style.paddingBottom = 0;
        style.marginLeft = 2;
        style.marginRight = -2;
    }
    return style;
}

function getMenuItemStyle(enabled: boolean, selected: boolean, height: number, isMouseOver: boolean): React.CSSProperties {
    const pad = ((height - 16) / 2);
    const vertPad = 6;
    const style: React.CSSProperties = {
        //height: height,
        paddingLeft: pad,
        paddingRight: pad,
        paddingTop: vertPad,
        paddingBottom: vertPad
    };
    if (enabled && (isMouseOver === true || selected)) {
        style.cursor = "pointer";
        style.border = "1px solid rgb(153, 181, 202)";
        style.paddingLeft = pad - 1; //To compensate for border
        style.paddingRight = pad - 1; //To compensate for border
        style.paddingTop = vertPad - 1; //To compensate for border
        style.paddingBottom = vertPad - 1; //To compensate for border
    }
    return style;
}

export interface IFlyoutMenuChildItemProps {
    item: IItem | IInlineMenu;
    onInvoked?: () => void;
}

export const FlyoutMenuChildItem = (props: IFlyoutMenuChildItemProps) => {
    const { item } = props;
    const [isMouseOver, setIsMouseOver] = React.useState(false);
    const onClick = () => {
        if (getEnabled(item)) {
            item.invoke?.();
            props.onInvoked?.();
        }
    };
    const onMouseLeave = () => {
        setIsMouseOver(false);
    };
    const onMouseEnter = () => {
        setIsMouseOver(true);
    };
    const height = DEFAULT_TOOLBAR_SIZE;
    const selected = getSelected(item);
    const enabled = getEnabled(item);
    const tt = getTooltip(item);
    const imgStyle = getIconStyle(enabled, height);
    const style = getMenuItemStyle(enabled, selected, height, isMouseOver);
    return <li className="noselect flyout-menu-child-item" title={tt} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick}>
        <div style={style}>
            <ImageIcon style={imgStyle} url={item.icon} /> {item.label}
        </div>
    </li>;
}

interface IToolbarContentContainerProps {
    size: number;
    vertical?: boolean;
}


interface IComponentFlyoutItemProps {
    size: number;
    item: IComponentFlyoutItem;
    vertical?: boolean;
    isFlownOut?: boolean;
}

const ComponentFlyoutItem = (props: IComponentFlyoutItemProps) => {
    const { size, item, vertical, isFlownOut } = props;
    const toolbarCtx = React.useContext(ToolbarContext);
    const [isMouseOver, setIsMouseOver] = React.useState(false);
    const onClick = (e: GenericEvent) => {
        e.preventDefault();
        const { flyoutId, componentName, componentProps } = item;
        const newState = !!!isFlownOut;
        if (newState) {
            const rect = e.currentTarget.getBoundingClientRect();
            const metrics: IDOMElementMetrics = {
                posX: rect.left, // e.clientX,
                posY: rect.top, // e.clientY,
                width: rect.width, // e.currentTarget.offsetWidth,
                height: rect.height, // e.currentTarget.offsetHeight
                vertical: vertical
            };
            toolbarCtx.openComponent(flyoutId, metrics, componentName, componentProps);
        } else {
            toolbarCtx.closeComponent(flyoutId);
        }
        return false;
    };
    const onMouseLeave = () => {
        setIsMouseOver(false);
    };
    const onMouseEnter = () => {
        setIsMouseOver(true);
    };
    const selected = getSelected(item);
    const enabled = getEnabled(item);
    const imgStyle = getIconStyle(enabled, size);
    const style = getItemStyle(enabled, selected, size, isMouseOver, vertical);
    let label: any = item.label;
    if (vertical === true) {
        label = <div className="rotated-text"><span className="rotated-text__inner rotated-text-ccw">{item.label}</span></div>;
    }
    const ttip = getTooltip(item);
    return <div className={`noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${isMouseOver ? "mouse-over" : ""}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} style={style} title={ttip}>
        <div data-flyout-id={`flyout-${item.flyoutId}`}>
            <ImageIcon style={imgStyle} url={item.icon} spriteClass={item.iconClass} /> {label} <ImageIcon style={imgStyle} spriteClass={isFlownOut ? SPRITE_ICON_MENUARROWUP : SPRITE_ICON_MENUARROW} />
        </div>
    </div>;
};

interface IFlyoutMenuReferenceItemProps {
    size: number;
    menu: IFlyoutMenu;
    vertical?: boolean;
    isFlownOut?: boolean;
}

const FlyoutMenuReferenceItem = (props: IFlyoutMenuReferenceItemProps) => {
    const { size, menu, vertical, isFlownOut } = props;
    const toolbarCtx = React.useContext(ToolbarContext);
    const [isMouseOver, setIsMouseOver] = React.useState(false);
    const onClick = (e: GenericEvent) => {
        e.preventDefault();
        const newState = !!!isFlownOut;
        if (newState) {
            const rect = e.currentTarget.getBoundingClientRect();
            const metrics: IDOMElementMetrics = {
                posX: rect.left, // e.clientX,
                posY: rect.top, // e.clientY,
                width: rect.width, // e.currentTarget.offsetWidth,
                height: rect.height, // e.currentTarget.offsetHeight
                vertical: vertical
            };
            toolbarCtx.openFlyout(menu.flyoutId, metrics);
        } else {
            toolbarCtx.closeFlyout(menu.flyoutId);
        }
        return false;
    }
    const onMouseLeave = () => {
        setIsMouseOver(false);
    };
    const onMouseEnter = () => {
        setIsMouseOver(true);
    };
    const selected = getSelected(menu);
    const enabled = getEnabled(menu);
    const imgStyle = getIconStyle(enabled, size);
    const style = getItemStyle(enabled, selected, size, isMouseOver, vertical);
    let label: any = menu.label;
    if (vertical === true) {
        label = <div className="rotated-text"><span className="rotated-text__inner rotated-text-ccw">{menu.label}</span></div>;
    }
    let align = menu.flyoutAlign;
    if (!align) {
        align = (vertical === true) ? "right bottom" : "bottom right";
    }
    const ttip = getTooltip(menu);
    return <div className={`noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${isMouseOver ? "mouse-over" : ""}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} style={style} title={ttip}>
        <div data-flyout-id={`flyout-${menu.flyoutId}`}>
            <ImageIcon style={imgStyle} url={menu.icon} spriteClass={menu.iconClass} /> {label} <ImageIcon style={imgStyle} spriteClass={isFlownOut ? SPRITE_ICON_MENUARROWUP : SPRITE_ICON_MENUARROW} />
        </div>
    </div>;
};

interface IToolbarSeparatorProps {
    size: number;
    vertical?: boolean;
}

const ToolbarSeparator = (props: IToolbarSeparatorProps) => {
    const style = getToolbarSeparatorItemStyle(props.vertical);
    if (props.vertical === true) {
        return <div className="noselect toolbar-separator-vertical" style={style} />;
    } else {
        return <div className="noselect toolbar-separator-horizontal" style={style}>{Constants.NBSP}</div>;
    }
}

interface IToolbarButtonProps {
    height: number;
    item: IItem;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
}

const ToolbarButton = (props: IToolbarButtonProps) => {
    const { height, item, vertical, hideVerticalLabels } = props;
    const toolbarCtx = React.useContext(ToolbarContext);
    const [isMouseOver, setIsMouseOver] = React.useState(false);
    const onMouseLeave = () => {
        setIsMouseOver(false);
    }
    const onMouseEnter = () => {
        setIsMouseOver(true);
    }
    const onClick = (e: any) => {
        e.preventDefault();
        const { item } = props;
        const enabled = getEnabled(item);
        if (enabled && item.invoke) {
            item.invoke();
        }
        return false;
    }
    const selected = getSelected(item);
    const enabled = getEnabled(item);
    const imgStyle = getIconStyle(enabled, height);
    const style = getItemStyle(enabled, selected, height, isMouseOver, vertical);
    let ttip = null;
    if (typeof (item.tooltip) == 'function') {
        ttip = item.tooltip();
    } else {
        ttip = item.tooltip;
    }
    return <div className={`noselect toolbar-btn ${selected ? "selected-item" : ""} ${(isMouseOver && enabled) ? "mouse-over" : ""}`} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} title={ttip} onClick={onClick}>
        <ImageIcon style={imgStyle} url={item.icon} spriteClass={item.iconClass} /> {(vertical == true && hideVerticalLabels == true) ? null : item.label}
    </div>;
}

export interface IItem {
    label?: string | (() => string);
    tooltip?: string | (() => string);
    icon?: string;
    iconClass?: string;
    invoke?: () => void;
    enabled?: boolean | (() => boolean);
    selected?: boolean | (() => boolean);
    isSeparator?: boolean;
}

export interface IInlineMenu extends IItem {
    childItems: IItem[];
    flyoutAlign?: string;
}

export interface IFlyoutMenu extends IItem {
    flyoutId: string;
    flyoutAlign?: string;
}

export interface IComponentFlyoutItem extends IItem {
    flyoutId: string;
    componentName: string;
    componentProps?: any;
}

export interface IContainerItem extends IItem {
    renderContainerContent: () => JSX.Element;
}

/**
 * Toolbar component props
 *
 * @export
 * @interface IToolbarProps
 */
export interface IToolbarProps {
    childItems: IItem[];
    containerClass?: string;
    containerStyle?: React.CSSProperties;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
    onOpenFlyout?: (id: string, metrics: IDOMElementMetrics) => void;
    onCloseFlyout?: (id: string) => void;
    onOpenComponent?: (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => void;
    onCloseComponent?: (id: string) => void;
    flyoutStates?: FlyoutVisibilitySet;
}

/**
 * A generic toolbar component
 * @param props 
 */
export const Toolbar = (props: IToolbarProps) => {
    const {
        containerStyle,
        containerClass,
        childItems,
        vertical,
        hideVerticalLabels,
        flyoutStates,
        onOpenFlyout,
        onCloseFlyout,
        onOpenComponent,
        onCloseComponent
    } = props;
    const openFlyout = (id: string, metrics: IDOMElementMetrics) => onOpenFlyout?.(id, metrics);
    const closeFlyout = (id: string) => onCloseFlyout?.(id);
    const openComponent = (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => onOpenComponent?.(id, metrics, name, props);
    const closeComponent = (id: string) => onCloseComponent?.(id);
    let height = DEFAULT_TOOLBAR_SIZE;
    if (containerStyle) {
        const ch = containerStyle.height;
        if (typeof (ch) == 'number') {
            height = ch;
        }
    }
    const providerImpl = {
        openFlyout: openFlyout,
        closeFlyout: closeFlyout,
        openComponent: openComponent,
        closeComponent: closeComponent
    };
    return <ToolbarContext.Provider value={providerImpl}>
        <div style={containerStyle} className={`has-flyout noselect ${containerClass}`}>
            {childItems.map((item, index) => {
                if (isComponentFlyout(item)) {
                    const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
                    return <ComponentFlyoutItem key={index} size={height} item={item} vertical={vertical} isFlownOut={isFlownOut} />;
                } else if (isMenuRef(item)) {
                    const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
                    return <FlyoutMenuReferenceItem key={index} size={height} menu={item} vertical={vertical} isFlownOut={isFlownOut} />;
                } else if (item.isSeparator === true) {
                    return <ToolbarSeparator key={index} size={height} vertical={vertical} />;
                } else {
                    return <ToolbarButton key={index} height={height} item={item} vertical={vertical} hideVerticalLabels={hideVerticalLabels} />;
                }
            })}
        </div>
    </ToolbarContext.Provider>;
}