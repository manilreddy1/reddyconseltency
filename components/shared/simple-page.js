import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";

export function SimplePage(props) {
 return _jsxs("main", {
 className: "min-h-screen bg-slate-950 text-white",
 children: [
 _jsxs("section", {
 className: "border-b border-white/10 bg-hero-glow",
 children: [
 _jsx("div", { className: "mx-auto max-w-6xl px-4 py-6 text-sm text-slate-300", children: _jsxs(Link, { href: "/", className: "font-semibold text-white", children: ["AdmitGlobal", " / ", props.eyebrow] }) }),
 _jsxs("div", { className: "mx-auto max-w-6xl px-4 pb-16 pt-8", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.3em] text-secondary", children: props.eyebrow }), _jsx("h1", { className: "mt-4 max-w-3xl font-heading text-5xl font-semibold", children: props.title }), _jsx("p", { className: "mt-6 max-w-3xl text-lg text-slate-300", children: props.description })] })
 ]
 }),
 _jsxs("section", { className: "bg-white py-16 text-slate-900", children: [_jsx("div", { className: "mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3", children: props.cards.map(function (card) { return _jsxs("div", { className: "rounded-3xl border border-slate-200 p-6 shadow-sm", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.3em] text-primary", children: card.label }), _jsx("h2", { className: "mt-3 font-heading text-2xl font-semibold", children: card.title }), _jsx("p", { className: "mt-3 text-sm text-slate-600", children: card.text })] }, card.title); }) }), props.footer ? _jsx("div", { className: "mx-auto mt-12 max-w-6xl px-4 text-sm text-slate-500", children: props.footer }) : null] })
 ]
 });
}
