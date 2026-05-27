/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User } from 'lucide-react';

interface SkeletonProps {
  count?: number;
}

/**
 * Skeleton Loader for Member Cards (Roster/Champions grid)
 */
export function MemberSkeleton({ count = 8 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="member-skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className="bg-feca-night border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between animate-pulse relative shadow-lg"
        >
          {/* Visual Profile Photo simulation */}
          <div className="aspect-square bg-slate-950 border-b border-slate-900 flex items-center justify-center relative">
            <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <User className="text-slate-700 w-6 h-6" />
            </div>
            <div className="absolute top-2 left-2 w-16 h-4 bg-slate-900 border border-slate-850 rounded" />
          </div>

          {/* Member Meta and Name details */}
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <div className="h-2 bg-slate-900/80 rounded w-1/3" />
              <div className="h-4 bg-slate-950 rounded w-3/4 animate-pulse" />
            </div>
            
            <div className="h-6 bg-slate-950 rounded-lg w-full border border-slate-900" />
            
            <div className="space-y-1.5 pt-2 border-t border-slate-900/80">
              <div className="h-2 bg-slate-900/80 rounded w-1/4" />
              <div className="h-2.5 bg-slate-950 rounded w-5/6" />
            </div>
          </div>

          {/* Secondary License details card footer */}
          <div className="p-3 bg-slate-950/40 border-t border-slate-850/60 flex items-center justify-between">
            <div className="h-3 bg-slate-900 rounded w-1/3" />
            <div className="h-3 bg-slate-900 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Loader for Blog Post Cards
 */
export function BlogSkeleton({ count = 6 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="blog-skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className="bg-feca-night border border-slate-850 p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-xl animate-pulse min-h-[220px]"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/60" />
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <div className="w-24 h-4 bg-slate-950 rounded-md border border-slate-900" />
              <div className="w-16 h-3 bg-slate-900 rounded" />
            </div>
            <div className="h-5 bg-slate-950 rounded w-11/12 animate-pulse" />
            <div className="space-y-1.5 pt-1">
              <div className="h-2.5 bg-slate-900 rounded w-full" />
              <div className="h-2.5 bg-slate-900 rounded w-11/12" />
              <div className="h-2.5 bg-slate-900 rounded w-4/5" />
            </div>
          </div>
          <div className="mt-5 pt-4 border-t border-slate-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-slate-950" />
              <div className="w-16 h-2.5 bg-slate-900 rounded" />
            </div>
            <div className="w-24 h-7 bg-slate-950 rounded-lg border border-slate-900" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Loader for Tournament Highlights
 */
export function PalmaresCardSkeleton({ count = 3 }: SkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="palmares-card-skeleton">
      {Array.from({ length: count }).map((_, idx) => (
        <div 
          key={idx} 
          className="p-5 rounded-2xl bg-feca-night border border-slate-850 flex flex-col justify-between animate-pulse min-h-[180px]"
        >
          <div className="space-y-3 w-full">
            <div className="h-3 bg-slate-900 rounded-md w-1/3" />
            <div className="h-5 bg-slate-950 rounded-md w-3/4 animate-pulse" />
            <div className="p-3.5 bg-slate-950/40 rounded-xl border border-slate-900 space-y-2 mt-2">
              <div className="h-3 bg-slate-900 rounded w-5/6" />
              <div className="h-3 bg-slate-900 rounded w-4/5" />
              <div className="h-3 bg-slate-900 rounded w-2/3" />
            </div>
          </div>
          <div className="h-2.5 bg-slate-900 rounded w-1/4 mt-4" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton Loader for the Podiums Interactive Table Rows
 */
export function PalmaresTableSkeleton({ count = 6 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <tr key={idx} className="animate-pulse bg-slate-1000/20" id={`palmares-row-skeleton-${idx}`}>
          {/* Year column shim */}
          <td className="py-4 px-5">
            <div className="h-4 bg-slate-900 rounded-md w-10 animate-pulse" />
          </td>

          {/* Title column shim */}
          <td className="py-4 px-5">
            <div className="space-y-1.5">
              <div className="h-3.5 bg-slate-900 rounded w-44 animate-pulse" />
              <div className="h-2.5 bg-slate-950 rounded w-28" />
            </div>
          </td>

          {/* Athlete / Team column shim */}
          <td className="py-4 px-5">
            <div className="h-3.5 bg-slate-900 rounded w-28" />
          </td>

          {/* Tournament Location column shim */}
          <td className="py-4 px-5">
            <div className="h-3 bg-slate-900 rounded w-24" />
          </td>

          {/* Medal Award badge column shim */}
          <td className="py-4 px-5 text-right">
            <div className="inline-flex items-center gap-1.5 justify-end">
              <div className="h-3 bg-slate-900 rounded w-12" />
              <div className="w-5 h-5 bg-slate-950 rounded-full border border-slate-900" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
