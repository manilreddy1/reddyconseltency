import React from "react";
import Link from "next/link";

export function Shell(props) {
 return React.createElement("div", { className: "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 " + (props.className ? props.className : "") }, props.children);
}

export function ButtonLink(props) {
 const styles = {
 primary: "bg-secondary text-slate-950 hover:bg-amber-400",
 secondary: "border border-white/20 bg-white/10 text-white hover:bg-white/20",
 light: "bg-white text-primary hover:bg-slate-100"
 };
 const variant = props.variant ? props.variant : "primary";
 const className = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 " + styles[variant] + " " + (props.className ? props.className : "");
 return React.createElement(Link, { href: props.href, className }, props.children);
}


export function GlassCard(props) {
 return React.createElement("div", { className: "rounded-3xl border border-white/12 bg-white/10 p-6 shadow-glass backdrop-blur " + (props.className ? props.className : "") }, props.children);
}

export function SectionTitle(props) {
 return React.createElement(
 "div",
 { className: "max-w-3xl" },
 React.createElement("p", { className: "text-sm font-semibold uppercase tracking-[0.3em] text-secondary" }, props.eyebrow),
 React.createElement("h2", { className: "mt-4 font-heading text-3xl font-semibold text-white sm:text-4xl" }, props.title),
 props.description ? React.createElement("p", { className: "mt-4 text-lg text-slate-300" }, props.description) : null
 );
}

export function DataTable(props) {
 return React.createElement(
 "div",
 { className: "overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm" },
 React.createElement(
 "table",
 { className: "min-w-full divide-y divide-slate-200 text-sm" },
 React.createElement(
 "thead",
 { className: "bg-slate-50" },
 React.createElement(
 "tr",
 null,
 props.columns.map(function (column) {
 return React.createElement("th", { key: column, className: "px-4 py-3 text-left font-semibold text-slate-600" }, column);
 })
 )
 ),
 React.createElement(
 "tbody",
 { className: "divide-y divide-slate-100" },
 props.rows.map(function (row, rowIndex) {
 return React.createElement(
 "tr",
 { key: rowIndex },
 row.map(function (cell, cellIndex) {
 return React.createElement("td", { key: cellIndex, className: "px-4 py-3 text-slate-700" }, cell);
 })
 );
 })
 )
 )
 );
}
