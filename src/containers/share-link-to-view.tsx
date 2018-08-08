import * as React from "react";
import { connect } from "react-redux";
import { 
    IApplicationState,
    ReduxDispatch
} from '../api/common';
import { addUrlProps } from 'react-url-query';
import { urlPropsQueryConfig, IAppUrlStateProps } from './url-state';
import { tr } from '../api/i18n';
import { getViewer } from '../api/runtime';
import CopyToClipboard = require('react-copy-to-clipboard');
import queryString = require("query-string");
import { TextArea } from '@blueprintjs/core/lib/esm/components/forms/textArea';
import { Checkbox } from '@blueprintjs/core/lib/esm/components/forms/controls';

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerProps
 */
export interface IShareLinkToViewContainerProps {

}

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerState
 */
export interface IShareLinkToViewContainerState {
    locale: string;
}

/**
 * 
 * @since 0.11
 * @export
 * @interface IShareLinkToViewContainerDispatch
 */
export interface IShareLinkToViewContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IShareLinkToViewContainerState> {
    return {
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IShareLinkToViewContainerDispatch> {
    return { };
}

function NOOP() {}

/**
 * @since 0.11
 */
export type ShareLinkToViewContainerProps = IShareLinkToViewContainerProps & Partial<IAppUrlStateProps> & Partial<IShareLinkToViewContainerState> & Partial<IShareLinkToViewContainerDispatch>;

/**
 * A component for sharing a link to the current view
 * @since 0.11
 * @export
 * @class ShareLinkToViewContainer
 * @extends {React.Component<ShareLinkToViewContainerProps, any>}
 */
export class ShareLinkToViewContainer extends React.Component<ShareLinkToViewContainerProps, any> {
    constructor(props: ShareLinkToViewContainerProps) {
        super(props);
        this.state = {
            showSession: false
        };
    }
    private onShowSessionChanged = (e: any) => {
        this.setState({ showSession: !this.state.showSession });
    }
    private onCopied = (e: any) => {
        const v = getViewer();
        if (v) {
            v.toastSuccess("clipboard", tr("SHARE_LINK_COPIED", this.props.locale));
        }
    }
    render(): JSX.Element {
        const parsed = queryString.parseUrl(`${window.location}`);
        if (!this.state.showSession) {
            delete parsed.query.session;
        }
        const shareUrl = `${parsed.url}?${queryString.stringify(parsed.query)}`;
        return <div>
            <TextArea fill={true} rows={16} readOnly value={shareUrl} onChange={NOOP} />
            <br />
            <Checkbox checked={this.state.showSession} label="Include Session ID" onChange={this.onShowSessionChanged} />
            <CopyToClipboard text={shareUrl} onCopy={this.onCopied}>
                <button className="pt-button">{tr("SHARE_LINK_COPY_CLIPBOARD", this.props.locale)}</button>
            </CopyToClipboard>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addUrlProps<ShareLinkToViewContainer>({ urlPropsQueryConfig })(ShareLinkToViewContainer));