'use client'
import {TableCell, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";
import React, {useMemo} from "react";

interface TableSkeletonProps {
  row: number;
  column: number;
  height?: number
}
const TableSkeleton = ({row, column, height = 48}:TableSkeletonProps) => {
  const rows = useMemo(() => new Array(row).fill(0), [row])
  const columns = useMemo(() => new Array(column).fill(0), [column])
  return (
    <React.Fragment>
      {
        rows.map((_,idx) => (
          <TableRow className={''} key={idx}>
            {
              columns.map((_,idx) => (
                <TableCell key={idx}>
                  <div className={'flex items-center space-x-4'}>
                    <Skeleton className="w-full my-1 rounded-lg" style={{ height: 48 }}/>
                  </div>
                </TableCell>
              ))
            }
          </TableRow>
        ))
      }
    </React.Fragment>
  )
}

export default React.memo(TableSkeleton)