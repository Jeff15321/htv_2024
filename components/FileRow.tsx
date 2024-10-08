"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { serverUrl } from "@/lib/config/site";
import { type FileType } from "@/lib/data/file";
import { cn, formatFileSize, formatReadableDate } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";

import FileActionsDropdown from "./FileActionsDropdown";

interface FileRowProps {
  file: FileType;
  level: number;
  isFolder?: boolean;
  children?: React.ReactNode;
}

const FileRow = ({ file, level, isFolder = false, children }: FileRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {/* TableRow content */}
      <TableRow
        onClick={isFolder ? handleToggle : undefined}
        role={isFolder ? "button" : undefined}
        className={cn(
          "grid w-full grid-cols-5 items-center gap-4 border-b border-gray-200 transition-colors duration-150",
          {
            "hover:bg-gray-50": !isFolder,
            "border-b-px cursor-pointer rounded-md border-2 border-green-500 bg-green-100 hover:bg-green-200":
              isFolder,
          },
        )}
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        <TableCell className="px-3 py-5 font-medium text-gray-800">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 20}px` }}
          >
            {isFolder ? (
              <button className="flex items-center focus:outline-none">
                <span
                  className={cn("mr-2 transition-transform", {
                    "rotate-180": isExpanded,
                  })}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
                <p className="text-black">{file.name}</p>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href={`/api/file/download?name=${file.name}`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                  download={`/api/file/download?name=${file.name}`}
                >
                  {file.name.split("/").pop()}
                </a>
                <a
                  href={`${serverUrl}/${file.name}`}
                  target="_blank"
                  className="text-[10px] text-gray-500 hover:text-black"
                >
                  PREVIEW
                </a>
              </div>
            )}
          </div>
        </TableCell>

        {/* File type */}
        <TableCell className="py-4 text-center">
          <span
            className={cn(
              "rounded-full bg-gray-100 px-4 py-1 text-sm font-semibold capitalize text-gray-700",
              {
                "bg-green-200 text-black": file.type === "folder",
              },
            )}
          >
            {file.type}
          </span>
        </TableCell>

        {/* File size */}
        <TableCell className="px-3 py-5 text-center text-gray-600">
          {isFolder ? "-" : formatFileSize(file.size)}
        </TableCell>

        {/* Last modified */}
        <TableCell className="px-3 py-5 text-center text-gray-600">
          {formatReadableDate(file.lastModified.toISOString())}
        </TableCell>

        {/* Action buttons / dropdown */}
        <TableCell className="px-3 py-5">
          {!isFolder && <FileActionsDropdown file={file} />}
        </TableCell>
      </TableRow>

      {/* Conditionally render children for folders */}
      {isFolder && isExpanded && (
        <tr>
          <td colSpan={5}>
            <div className="pl-6">{children}</div>
          </td>
        </tr>
      )}
    </>
  );
};

export default FileRow;
