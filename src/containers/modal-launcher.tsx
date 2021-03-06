import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as ModalActions from "../actions/modal";
import { RndModalDialog } from "../components/modal-dialog";
import { getComponentFactory } from "../api/registry/component";
import { Error } from "../components/error";
import { tr } from "../api/i18n";
import {
    IApplicationState,
    IModalReducerState,
    IModalComponentDisplayOptions,
    IModalDisplayOptions} from "../api/common";
import {
    isModalComponentDisplayOptions,
    isModalDisplayOptions
} from "../utils/type-guards";
import { assertNever } from "../utils/never";
import { ParsedComponentUri, parseComponentUri, isComponentUri } from "../utils/url";
import { useViewerLocale } from './hooks';

function getComponentId(diag: IModalComponentDisplayOptions | IModalDisplayOptions): ParsedComponentUri | undefined {
    if (isModalComponentDisplayOptions(diag)) {
        return { name: diag.component, props: {} };
    } else if (isModalDisplayOptions(diag)) {
        return parseComponentUri(diag.url);
    } else {
        assertNever(diag);
    }
}

const ModalLauncher = (props: { children?: React.ReactNode }) => {
    const dispatch = useDispatch();
    const hideModal = (options: any) => dispatch(ModalActions.hideModal(options));
    const onCloseModal = (name: string) => hideModal({ name: name });
    const modal = useSelector<IApplicationState, IModalReducerState>(state => state.modal);
    const locale = useViewerLocale();
    const MODAL_INIT_X = 500;
    const MODAL_INIT_Y = 80;
    if (!modal) {
        return <noscript />;
    }
    return <div>
        {Object.keys(modal).map(key => {
            const diag = modal[key];
            if (isModalComponentDisplayOptions(diag) || (isModalDisplayOptions(diag) && isComponentUri(diag.url))) {
                const componentId = getComponentId(diag);
                if (componentId) {
                    const componentRenderer = getComponentFactory(componentId.name);
                    return <RndModalDialog title={diag.modal.title}
                        x={MODAL_INIT_X}
                        y={MODAL_INIT_Y}
                        locale={locale}
                        enableInteractionMask={true}
                        width={diag.modal.size[0]}
                        height={diag.modal.size[1]}
                        disableYOverflow={!diag.modal.overflowYScroll}
                        isOpen={true}
                        key={key}
                        onClose={() => onCloseModal(key)}>
                        {([]) => {
                            if (componentRenderer) {
                                if (isModalComponentDisplayOptions(diag))
                                    return componentRenderer(diag.componentProps);
                                else
                                    return componentRenderer(componentId.props);
                            } else {
                                return <Error error={tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: componentId })} />;
                            }
                        }}
                    </RndModalDialog>;
                } else {
                    return <Error error={tr("ERR_NO_COMPONENT_ID", locale)} />;
                }
            } else if (isModalDisplayOptions(diag)) {
                return <RndModalDialog title={diag.modal.title}
                    isOpen={true}
                    key={key}
                    x={MODAL_INIT_X}
                    y={MODAL_INIT_Y}
                    locale={locale}
                    enableInteractionMask={false}
                    width={diag.modal.size[0]}
                    height={diag.modal.size[1]}
                    onClose={() => onCloseModal(key)}>
                    {([w, h]) => <iframe frameBorder={0} src={diag.url} width={w} height={h} />}
                </RndModalDialog>;
            } else {
                assertNever(diag);
            }
        })}
        {props.children}
    </div>;
};

export default ModalLauncher;