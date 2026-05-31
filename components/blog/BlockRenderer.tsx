'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Info, AlertTriangle, Lightbulb, Quote,
  ExternalLink, ChevronRight, Sparkles
} from 'lucide-react';
import { LinkPreview } from '@/components/ui/link-preview';

interface Block {
  type: string;
  attrs?: Record<string, any>;
  text?: string;
  marks?: any[];
  content?: Block[];
}

interface BlockRendererProps {
  content: string | any;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

// Track heading counts to generate unique IDs
let headingCounter: Record<string, number> = {};

export default function BlockRenderer({ content }: BlockRendererProps) {
  // Reset heading counter for each render
  headingCounter = {};

  // 1. Handle Legacy HTML Fallback
  if (typeof content === 'string') {
    try {
      const parsed = JSON.parse(content);
      return <div className="space-y-6">{parsed.content?.map((block: any, i: number) => renderBlock(block, i))}</div>;
    } catch (e) {
      return (
        <div
          className="legacy-html prose prose-xl prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
  }

  // 2. Handle direct object input (already parsed)
  const jsonContent = content?.content || [];
  return (
    <div className="space-y-8">
      {jsonContent.map((block: any, i: number) => renderBlock(block, i))}
    </div>
  );
}

function renderBlock(block: Block, index: number): React.ReactNode {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock key={index} block={block} index={index} />;
    case 'paragraph':
      return <ParagraphBlock key={index} block={block} />;
    case 'bulletList':
      return <ListBlock key={index} block={block} ordered={false} />;
    case 'orderedList':
      return <ListBlock key={index} block={block} ordered={true} />;
    case 'listItem':
      // If a listItem appears outside a list context, render its children
      return <React.Fragment key={index}>{block.content?.map((child, ci) => renderBlock(child, ci))}</React.Fragment>;
    case 'blockquote':
      return <BlockquoteBlock key={index} block={block} />;
    case 'horizontalRule':
      return (
        <motion.div key={index} {...fadeUp}>
          <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      );
    case 'image':
      return <ImageBlock key={index} block={block} />;
    case 'callout':
      return <CalloutBlock key={index} block={block} />;
    case 'codeBlock':
      return <CodeBlockBlock key={index} block={block} />;
    case 'table':
      return <TableBlock key={index} block={block} />;
    case 'tableRow':
    case 'tableHeader':
    case 'tableCell':
      // These should be handled inside TableBlock, but if they appear standalone, render children
      return <React.Fragment key={index}>{block.content?.map((child, ci) => renderBlock(child, ci))}</React.Fragment>;
    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unknown block type:', block.type);
      }
      return null;
  }
}

// ─── HEADING ───
function HeadingBlock({ block, index }: { block: Block; index: number }) {
  const level = block.attrs?.level || 2;
  const text = extractText(block.content);
  let id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Make IDs unique by appending a counter if duplicate
  if (headingCounter[id] !== undefined) {
    headingCounter[id]++;
    id = `${id}-${headingCounter[id]}`;
  } else {
    headingCounter[id] = 0;
  }

  const styles: Record<number, string> = {
    1: 'text-4xl md:text-5xl font-extrabold tracking-tight tight leading-tight mb-8 text-slate-900',
    2: 'text-2xl md:text-3xl font-bold tracking-tight mt-16 mb-6 text-slate-900',
    3: 'text-xl md:text-2xl font-bold tracking-tight mt-12 mb-4 text-slate-800',
    4: 'text-lg md:text-xl font-bold mt-10 mb-4 text-slate-800',
    5: 'text-base font-bold mt-8 mb-3 text-slate-700 uppercase tracking-widest',
    6: 'text-sm font-bold mt-6 mb-2 text-slate-500 uppercase tracking-[0.2em]',
  };

  const cls = styles[level] || styles[2];

  return (
    <motion.div {...fadeUp}>
      {React.createElement(
        `h${level}`,
        { 
          id, 
          className: `relative ${cls}`,
          style: { textAlign: block.attrs?.textAlign || 'left' }
        },
        renderContent(block.content)
      )}
    </motion.div>
  );
}

// ─── PARAGRAPH ───
function ParagraphBlock({ block }: { block: Block }) {
  if (!block.content || block.content.length === 0) {
    return <div className="h-4" />;
  }
  return (
    <motion.p
      {...fadeUp}
      className="text-slate-600 leading-[1.75] text-[17px] md:text-[18px] mb-8 selection:bg-indigo-100 selection:text-indigo-900"
      style={{ textAlign: block.attrs?.textAlign || 'left' }}
    >
      {renderContent(block.content)}
    </motion.p>
  );
}

// ─── LISTS ───
// NOTE: each <li> uses display:flex (for the marker + text alignment), which
// suppresses the browser's native list markers. We therefore render the bullet
// OR the number manually in their own column. Without this, ordered lists
// rendered as plain text with no 1./2./3. visible to the reader.
function ListBlock({ block, ordered }: { block: Block; ordered: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <motion.div {...fadeUp} className="mb-10 ml-1">
      <Tag className="space-y-4">
        {block.content?.map((item, i) => (
          <li key={i} className="flex items-start gap-4 text-slate-600 text-[17px] leading-relaxed">
            {ordered ? (
              <div className="mt-0.5 shrink-0 min-w-[1.75rem] h-7 px-2 rounded-md bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center tabular-nums">
                {i + 1}
              </div>
            ) : (
              <div className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </div>
            )}
            <div className="flex-1">
              {item.content?.map((child: any, ci: number) => {
                // Render paragraphs inside list items inline (no motion wrapper, no mb-8)
                if (child.type === 'paragraph') {
                  return <span key={ci}>{renderContent(child.content)}</span>;
                }
                return <React.Fragment key={ci}>{renderBlock(child, ci)}</React.Fragment>;
              })}
            </div>
          </li>
        ))}
      </Tag>
    </motion.div>
  );
}

// ─── BLOCKQUOTE ───
function BlockquoteBlock({ block }: { block: Block }) {
  return (
    <motion.div {...fadeUp} className="my-12 pl-8 border-l-4 border-indigo-500 bg-slate-50/50 py-8 pr-8 rounded-r-2xl">
      <div className="relative z-10">
        <Quote className="text-indigo-200 mb-6 w-10 h-10 opacity-50" />
        <div className="text-xl md:text-2xl font-semibold text-slate-800 leading-snug italic text-balance">
          {block.content?.map((p, i) => <React.Fragment key={i}>{renderContent(p.content)}</React.Fragment>)}
        </div>
      </div>
    </motion.div>
  );
}

// ─── IMAGE ───
function ImageBlock({ block }: { block: Block }) {
  const { src, alt, title, caption } = block.attrs || {};
  if (!src) return null;

  return (
    <motion.div {...fadeUp} className="my-14 group">
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-100">
        <img
          src={src}
          alt={alt || title || 'StaffSchedule Insights'}
          loading="lazy"
          className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-700"
        />
      </div>
      {(caption || title) && (
        <p className="mt-4 text-center text-slate-400 text-sm font-medium italic">
          {caption || title}
        </p>
      )}
    </motion.div>
  );
}

// ─── CODE BLOCK ───
function CodeBlockBlock({ block }: { block: Block }) {
  const code = extractText(block.content);
  return (
    <motion.div {...fadeUp} className="my-8">
      <div className="flex items-center justify-between bg-slate-900 px-5 py-2 rounded-t-xl border-b border-white/5">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Terminal</span>
        <div className="flex gap-1.5">
           <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
           <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
           <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
        </div>
      </div>
      <pre className="bg-slate-950 text-slate-300 p-6 rounded-b-xl overflow-x-auto text-[14px] leading-relaxed border border-t-0 border-white/5">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}

// ─── TABLE ───
// Helper: render cell content without motion wrappers or paragraph margins
function renderCellContent(content?: Block[]): React.ReactNode {
  if (!content) return null;
  return content.map((child, i) => {
    if (child.type === 'paragraph') {
      // Render paragraph content inline inside cells (no <p>, no motion, no mb-8)
      if (!child.content || child.content.length === 0) return null;
      return <span key={i}>{renderContent(child.content)}</span>;
    }
    // For other block types inside cells (lists, etc.), use normal renderBlock
    return <React.Fragment key={i}>{renderBlock(child, i)}</React.Fragment>;
  });
}

function TableBlock({ block }: { block: Block }) {
  const rows = block.content || [];
  if (rows.length === 0) return null;

  // Separate header rows from body rows
  const headerRows = rows.filter(row => row.content?.some(cell => cell.type === 'tableHeader'));
  const bodyRows = rows.filter(row => !row.content?.some(cell => cell.type === 'tableHeader'));

  return (
    <motion.div {...fadeUp} className="my-10 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full border-collapse">
        {headerRows.length > 0 && (
          <thead>
            {headerRows.map((row, ri) => (
              <tr key={ri}>
                {row.content?.map((cell, ci) => (
                  <th
                    key={ci}
                    className="bg-gradient-to-br from-slate-100 to-slate-50 text-slate-700 font-bold text-sm px-5 py-4 text-left border-b-2 border-slate-200 border-r border-r-slate-100 last:border-r-0"
                    colSpan={cell.attrs?.colspan || 1}
                    rowSpan={cell.attrs?.rowspan || 1}
                  >
                    {renderCellContent(cell.content)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, ri) => (
            <tr key={ri} className={`transition-colors hover:bg-indigo-50/50 ${ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              {row.content?.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-5 py-4 text-slate-600 text-[15px] border-b border-slate-100 border-r border-r-slate-50 last:border-r-0 leading-relaxed"
                  colSpan={cell.attrs?.colspan || 1}
                  rowSpan={cell.attrs?.rowspan || 1}
                >
                  {renderCellContent(cell.content)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

// ─── CALLOUT (PRO TIPS) ───
function CalloutBlock({ block }: { block: Block }) {
  const type = block.attrs?.type || 'info';

  const configs: Record<string, { icon: any; color: string; borderColor: string; bgColor: string; label: string; iconBg: string }> = {
    tip: { icon: Lightbulb, color: 'text-amber-600', iconBg: 'bg-amber-100', borderColor: 'border-amber-200', bgColor: 'bg-amber-50/50', label: 'PRO TIP' },
    warning: { icon: AlertTriangle, color: 'text-rose-600', iconBg: 'bg-rose-100', borderColor: 'border-rose-200', bgColor: 'bg-rose-50/50', label: 'WARNING' },
    info: { icon: Info, color: 'text-indigo-600', iconBg: 'bg-indigo-100', borderColor: 'border-indigo-200', bgColor: 'bg-indigo-50/50', label: 'INSIGHT' },
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <motion.div {...fadeUp} className={`my-10 p-7 rounded-[2rem] border ${config.borderColor} ${config.bgColor}`}>
      <div className="flex gap-6">
        <div className={`w-12 h-12 rounded-2xl ${config.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
          <Icon className={`w-6 h-6 ${config.color}`} />
        </div>
        <div className="flex-1">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${config.color} block mb-2`}>
            {config.label}
          </span>
          <div className="text-slate-700 font-medium leading-relaxed text-[17px]">
            {block.content?.map((child, i) => (
              <React.Fragment key={i}>{renderBlock(child, i)}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── INLINE CONTENT RENDERER ───
function renderContent(content?: Block[]): React.ReactNode {
  if (!content) return null;
  return content.map((node, i) => {
    // Handle nested blocks (e.g. paragraph inside blockquote)
    if (node.type === 'paragraph') {
      return <React.Fragment key={i}>{renderContent(node.content)}</React.Fragment>;
    }

    if (node.type === 'text') {
      let element: React.ReactNode = node.text;

      if (node.marks) {
        node.marks.forEach((mark: any) => {
          switch (mark.type) {
            case 'bold':
              element = <strong key={`${i}-bold`} className="font-bold text-slate-900">{element}</strong>;
              break;
            case 'italic':
              element = <em key={`${i}-italic`} className="italic">{element}</em>;
              break;
            case 'underline':
              element = <span key={`${i}-ul`} className="underline underline-offset-4 decoration-2">{element}</span>;
              break;
            case 'strike':
              element = <s key={`${i}-s`} className="text-slate-400 line-through">{element}</s>;
              break;
            case 'code':
              element = <code key={`${i}-code`} className="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded text-[0.9em] font-mono">{element}</code>;
              break;
            case 'highlight':
              element = <mark key={`${i}-hl`} className="bg-yellow-200/70 px-1 rounded">{element}</mark>;
              break;
            case 'textStyle':
              if (mark.attrs?.color) {
                element = <span key={`${i}-color`} style={{ color: mark.attrs.color }}>{element}</span>;
              }
              break;
            case 'link': {
              const relAttr = mark.attrs?.rel || (mark.attrs?.href?.startsWith('http') ? 'noopener noreferrer' : undefined);
              element = (
                <LinkPreview
                  key={`${i}-link`}
                  url={mark.attrs?.href}
                  className="text-indigo-600 font-semibold underline underline-offset-4 decoration-indigo-300 decoration-2 hover:text-indigo-900 transition-colors inline-block"
                >
                  {element}
                </LinkPreview>
              );
              break;
            }
          }
        });
      }
      return <React.Fragment key={i}>{element}</React.Fragment>;
    }

    // Handle hardBreak
    if (node.type === 'hardBreak') {
      return <br key={i} />;
    }

    // Handle image inside content
    if (node.type === 'image') {
      return <ImageBlock key={i} block={node} />;
    }

    return null;
  });
}

// ─── UTILS ───
function extractText(content?: Block[]): string {
  if (!content) return '';
  return content.map(node => {
    if (node.text) return node.text;
    if (node.content) return extractText(node.content);
    return '';
  }).join('');
}
