import React, { Component, useState, useEffect, useRef } from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import ResizeObserver from 'rc-resize-observer'
import classNames from 'classnames'; 
import { Card, Table } from 'antd'

import './OpenPositionsTable.css'

function VirtualTable(props) {
    const { columns, scroll, className } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const widthColumnCount = columns.filter(({ width }) => !width).length;
    const mergedColumns = columns.map(column => {
      if (column.width) {
        return column;
      }
  
      return { ...column, width: Math.floor(tableWidth / widthColumnCount) };
    });
    const gridRef = useRef();
    const [connectObject] = useState(() => {
      const obj = {};
      Object.defineProperty(obj, 'scrollLeft', {
        get: () => null,
        set: scrollLeft => {
          if (gridRef.current) {
            gridRef.current.scrollTo({
              scrollLeft,
            });
          }
        },
      });
      return obj;
    });
  
    const resetVirtualGrid = () => {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
    };
  
    useEffect(() => resetVirtualGrid, []);
    useEffect(() => resetVirtualGrid, [tableWidth]);
  
    const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
      ref.current = connectObject;
      return (
        <Grid
          ref={gridRef}
          className="virtual-grid"
          columnCount={mergedColumns.length}
          columnWidth={index => {
            const { width } = mergedColumns[index];
            return index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
          }}
          height={scroll.y}
          rowCount={rawData.length}
          rowHeight={() => 54}
          width={tableWidth}
          onScroll={({ scrollLeft }) => {
            onScroll({
              scrollLeft,
            });
          }}
        >
          {({ columnIndex, rowIndex, style }) => (
            <div
              className={classNames('virtual-table-cell', {
                'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
              })}
              style={style}
            >
              {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
            </div>
          )}
        </Grid>
      );
    };
  
    return (
      <ResizeObserver
        onResize={({ width }) => {
          setTableWidth(width);
        }}
      >
        <Table
          {...props}
          className={classNames(className, 'virtual-table')}
          columns={mergedColumns}
          pagination={false}
          components={{
            body: renderVirtualList,
          }}
        />
      </ResizeObserver>
    );
  } // Usage
  
  const columns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      width: 150
    },
    {
      title: 'Contracts',
      dataIndex: 'contracts',
    },
    {
      title: 'Entry Price',
      dataIndex: 'entryPrice',
    },
  ];
  const dataStuff = [
    {symbol: 'BTCUSDT', contracts: 400, entryPrice: 7674.05},
    {symbol: 'ETHUSDT', contracts: 300, entryPrice: 140.65},
    {symbol: 'XRPUSDT', contracts: 7200, entryPrice: 0.012},
    {symbol: 'BTCUSDT', contracts: 400, entryPrice: 7674.05},
    {symbol: 'ETHUSDT', contracts: 300, entryPrice: 140.65},
    {symbol: 'XRPUSDT', contracts: 7200, entryPrice: 0.012},
    {symbol: 'BTCUSDT', contracts: 400, entryPrice: 7674.05},
    {symbol: 'ETHUSDT', contracts: 300, entryPrice: 140.65},
    {symbol: 'XRPUSDT', contracts: 7200, entryPrice: 0.012},
  ];
  
  
  //-----USE THIS LATER------
  //In order to populate with new data.

  // for (let i = 0; i < 100000; i += 1) {
  //   console.log(dataStuff.length)
  //   dataStuff.push({
  //     key: i,
  //   });
  // }

class OpenPositionsTable extends Component {

    
    render(){
        return (
            <Card title="Open Positions">
                <VirtualTable
                    columns={columns}
                    dataSource={dataStuff}
                    scroll={{
                        y: 150,
                        x: '100vw'
                    }}
                />
            </Card>
        )
    }
}

export default OpenPositionsTable