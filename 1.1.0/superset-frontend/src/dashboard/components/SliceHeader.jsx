/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { t } from '@superset-ui/core';
import { Tooltip } from 'src/common/components/Tooltip';
import EditableTitle from '../../components/EditableTitle';
import SliceHeaderControls from './SliceHeaderControls';
import FiltersBadge from '../containers/FiltersBadge';

const propTypes = {
  innerRef: PropTypes.func,
  slice: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool,
  isCached: PropTypes.arrayOf(PropTypes.bool),
  cachedDttm: PropTypes.arrayOf(PropTypes.string),
  updatedDttm: PropTypes.number,
  updateSliceName: PropTypes.func,
  toggleExpandSlice: PropTypes.func,
  forceRefresh: PropTypes.func,
  exploreChart: PropTypes.func,
  exportCSV: PropTypes.func,
  exportExcel: PropTypes.func,
  editMode: PropTypes.bool,
  annotationQuery: PropTypes.object,
  annotationError: PropTypes.object,
  sliceName: PropTypes.string,
  supersetCanExplore: PropTypes.bool,
  supersetCanCSV: PropTypes.bool,
  supersetCanExcel: PropTypes.bool,
  sliceCanEdit: PropTypes.bool,
  componentId: PropTypes.string.isRequired,
  dashboardId: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  addSuccessToast: PropTypes.func.isRequired,
  addDangerToast: PropTypes.func.isRequired,
  handleToggleFullSize: PropTypes.func.isRequired,
  chartStatus: PropTypes.string.isRequired,
};

const defaultProps = {
  innerRef: null,
  forceRefresh: () => ({}),
  updateSliceName: () => ({}),
  toggleExpandSlice: () => ({}),
  exploreChart: () => ({}),
  exportCSV: () => ({}),
  exportExcel: () => ({}),
  editMode: false,
  annotationQuery: {},
  annotationError: {},
  cachedDttm: null,
  updatedDttm: null,
  isCached: [],
  isExpanded: [],
  sliceName: '',
  supersetCanExplore: false,
  supersetCanCSV: false,
  supersetCanExcel: false,
  sliceCanEdit: false,
};

const annoationsLoading = t('Annotation layers are still loading.');
const annoationsError = t('One ore more annotation layers failed loading.');

class SliceHeader extends React.PureComponent {
  render() {
    const {
      slice,
      isExpanded,
      isCached,
      cachedDttm,
      updatedDttm,
      toggleExpandSlice,
      forceRefresh,
      exploreChart,
      exportCSV,
      exportExcel,
      innerRef,
      sliceName,
      supersetCanExplore,
      supersetCanCSV,
      supersetCanExcel,
      sliceCanEdit,
      editMode,
      updateSliceName,
      annotationQuery,
      annotationError,
      componentId,
      dashboardId,
      addSuccessToast,
      addDangerToast,
      handleToggleFullSize,
      isFullSize,
      chartStatus,
    } = this.props;

    return (
      <div className="chart-header" ref={innerRef}>
        <div className="header-title">
          <EditableTitle
            title={
              sliceName ||
              (editMode
                ? '---' // this makes an empty title clickable
                : '')
            }
            canEdit={editMode}
            emptyText=""
            onSaveTitle={updateSliceName}
            showTooltip={false}
          />
          {!!Object.values(annotationQuery).length && (
            <Tooltip
              id="annotations-loading-tooltip"
              placement="top"
              title={annoationsLoading}
            >
              <i className="fa fa-refresh warning" />
            </Tooltip>
          )}
          {!!Object.values(annotationError).length && (
            <Tooltip
              id="annoation-errors-tooltip"
              placement="top"
              title={annoationsError}
            >
              <i className="fa fa-exclamation-circle danger" />
            </Tooltip>
          )}
        </div>
        <div className="header-controls">
          {!editMode && (
            <>
              <FiltersBadge chartId={slice.slice_id} />
              <SliceHeaderControls
                slice={slice}
                isCached={isCached}
                isExpanded={isExpanded}
                cachedDttm={cachedDttm}
                updatedDttm={updatedDttm}
                toggleExpandSlice={toggleExpandSlice}
                forceRefresh={forceRefresh}
                exploreChart={exploreChart}
                exportCSV={exportCSV}
                exportExcel={exportExcel}
                supersetCanExplore={supersetCanExplore}
                supersetCanCSV={supersetCanCSV}
                supersetCanExcel={supersetCanExcel}
                sliceCanEdit={sliceCanEdit}
                componentId={componentId}
                dashboardId={dashboardId}
                addSuccessToast={addSuccessToast}
                addDangerToast={addDangerToast}
                handleToggleFullSize={handleToggleFullSize}
                isFullSize={isFullSize}
                chartStatus={chartStatus}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

SliceHeader.propTypes = propTypes;
SliceHeader.defaultProps = defaultProps;

export default SliceHeader;
