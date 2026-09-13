import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { LayoutDashboard, Package, Building2, ArrowLeftRight, Boxes, Wallet, Receipt, ClipboardList, UploadCloud, Settings as SettingsIcon, AlertTriangle, Plus, Trash2, Pencil, X, Check, Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, RefreshCw, Download, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft, SlidersHorizontal, Menu, Link2, GripVertical, TrendingUp, ClipboardCheck, Info, MapPin, Handshake, Store, MinusCircle, Globe, Truck, FileText, Printer } from "lucide-react";
const SEED_PRODUCTS = [{ name: "\u5947\u5999\u306A\u767A\u660E\u5BB6\u306E\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420058", price: 2500, wholesale: 1750, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P001", furigana: "\u304D\u307F\u3087\u3046\u306A\u306F\u3064\u3081\u3044\u304B\u306E\u3044\u3048" }, { name: "\u7A7A\u98DB\u3076\u30C8\u30CA\u30AB\u30A4\u3068\u66AE\u3089\u3059\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420041", price: 2500, wholesale: 1750, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P002", furigana: "\u305D\u3089\u3068\u3076\u3068\u306A\u304B\u3044\u3068\u304F\u3089\u3059\u3044\u3048" }, { name: "\u30B5\u30F3\u30BF\u306E\u8D08\u308A\u7269", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u5728\u5EAB\u306A\u3057", note: "", reorderPoint: 3, id: "P003", furigana: "\u3055\u3093\u305F\u306E\u304A\u304F\u308A\u3082\u306E" }, { name: "\u8A66\u3055\u308C\u308B\u5FCD\u8005\u306E\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420089", price: 2500, wholesale: 1750, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P004", furigana: "\u305F\u3081\u3055\u308C\u308B\u306B\u3093\u3058\u3083\u306E\u3044\u3048" }, { name: "\u661F\u964D\u308B\u591C\u306E\u5E33\u306E\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420096", price: 2500, wholesale: 1750, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P005", furigana: "\u307B\u3057\u3075\u308B\u3088\u308B\u306E\u3068\u3070\u308A\u306E\u3044\u3048" }, { name: "\u6D88\u3048\u305F\u82B1\u5AC1\u3068\u30C9\u30E9\u30AD\u30E5\u30E9\u306E\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420102", price: 2900, wholesale: 2030, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P006", furigana: "\u304D\u3048\u305F\u306F\u306A\u3088\u3081\u3068\u3069\u3089\u304D\u3085\u3089\u306E\u3044\u3048" }, { name: "\u7AE5\u8A71\u306E\u56FD\u306E\u98DB\u3073\u51FA\u3059\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420638", price: 3700, wholesale: 2590, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P007", furigana: "\u3069\u3046\u308F\u306E\u304F\u306B\u306E\u3068\u3073\u3060\u3059\u3044\u3048" }, { name: "\u6B62\u307E\u3089\u306A\u3044\u30DD\u30EB\u30BF\u30FC\u30AC\u30A4\u30B9\u30C8\u306E\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420669", price: 2500, wholesale: 1750, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "2026.5~", reorderPoint: 3, id: "P008", furigana: "\u3068\u307E\u3089\u306A\u3044\u307D\u308B\u305F\u30FC\u304C\u3044\u3059\u3068\u306E\u3044\u3048" }, { name: "\u7F60\u3060\u3089\u3051\u306E\u30DE\u30D5\u30A3\u30A2\u306E\u5BB6", genre: "\u4E0D\u601D\u8B70\u306A\u5BB6", jan: "4580747420676", price: 3300, wholesale: 2310, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "2026.6~", reorderPoint: 3, id: "P009", furigana: "\u308F\u306A\u3060\u3089\u3051\u306E\u307E\u3075\u3043\u3042\u306E\u3044\u3048" }, { name: "\u30DC\u30A6\u30B1\u30F3\u30AF\u30A8\u30B9\u30C8", genre: "", jan: "4580747420027", price: 1700, wholesale: 1190, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P010", furigana: "\u307C\u3046\u3051\u3093\u304F\u3048\u3059\u3068" }, { name: "\u30E1\u30BF\u30E9\u30CA\u30A4\u30C7\u30AE\u30A2", genre: "", jan: "4580747420034", price: 1700, wholesale: 1190, cost: 0, lot: "10\uFF5E", status: "\u5728\u5EAB\u306A\u3057", note: "\u5897\u5237\u30BF\u30A4\u30DF\u30F3\u30B0\u672A\u5B9A", reorderPoint: 3, id: "P011", furigana: "\u3081\u305F\u3089\u306A\u3044\u3067\u304E\u3042" }, { name: "\u30B9\u30AB\u30A4\u30DD\u30FC\u30C8\u9023\u7D9A\u6BBA\u4EBA\u4E8B\u4EF6", genre: "\u30EC\u30C8\u30ED\u30B2\u30FC\u30E0", jan: "4580747420379", price: 2e3, wholesale: 1400, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P012", furigana: "\u3059\u304B\u3044\u307D\u30FC\u3068\u308C\u3093\u305E\u304F\u3055\u3064\u3058\u3093\u3058\u3051\u3093" }, { name: "\u304B\u308C\u306F", genre: "たばこ謎", jan: "4580747420270", price: 600, wholesale: 420, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P013", furigana: "\u304B\u308C\u306F" }, { name: "MOVE", genre: "たばこ謎", jan: "4580747420294", price: 600, wholesale: 420, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P014", furigana: "\u3080\u30FC\u3076" }, { name: "FORTISSIMO", genre: "たばこ謎", jan: "4580747420287", price: 600, wholesale: 420, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P015", furigana: "\u3075\u3049\u308B\u3066\u3063\u3057\u3082" }, { name: "MIDDLE SEVEN", genre: "たばこ謎", jan: "4580747420300", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P016", furigana: "\u307F\u3069\u308B\u305B\u3076\u3093" }, { name: "ARABIAN SPIRIT", genre: "たばこ謎", jan: "4580747420317", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P017", furigana: "\u3042\u3089\u3073\u3042\u3093\u3059\u3074\u308A\u3063\u3068" }, { name: "LOOP", genre: "たばこ謎", jan: "4580747420324", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P018", furigana: "\u308B\u30FC\u3077" }, { name: "MARK LOYAL", genre: "たばこ謎", jan: "4580747420331", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P019", furigana: "\u307E\u30FC\u304F\u308D\u3044\u3084\u308B" }, { name: "CAT MAIL", genre: "たばこ謎", jan: "4580747420348", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P020", furigana: "\u304D\u3083\u3063\u3068\u3081\u30FC\u308B" }, { name: "Marurobo", genre: "たばこ謎", jan: "4580747420355", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P021", furigana: "\u307E\u308B\u308D\u307C" }, { name: "UNLUCKY STRIPE", genre: "たばこ謎", jan: "4580747420362", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "", reorderPoint: 3, id: "P022", furigana: "\u3042\u3093\u3089\u3063\u304D\u30FC\u3059\u3068\u3089\u3044\u3077" }, { name: "\u305F\u3070\u3053\u8B0E\u3000\u30EF\u30F3\u30AB\u30FC\u30C8\u30F3\u30DC\u30C3\u30AF\u30B9", genre: "\u305F\u3070\u3053\u8B0E", jan: "4580747420539", price: 6900, wholesale: 4830, cost: 0, lot: "5\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P023", furigana: "\u305F\u3070\u3053\u306A\u305E\u308F\u3093\u304B\u30FC\u3068\u3093\u307C\u3063\u304F\u3059" }, { name: "BURGER SHOP SURPRISE", genre: "\u30B8\u30E3\u30F3\u30AF\u8B0E", jan: "4580747420393", price: 1500, wholesale: 1050, cost: 0, lot: "10\uFF5E", status: "\u5728\u5EAB\u306A\u3057", note: "\u5897\u5237\u672A\u5B9A\n\u7BB1\u306B\u5909\u66F4\u4E88\u5B9A", reorderPoint: 3, id: "P024", furigana: "\u3070\u30FC\u304C\u30FC\u3057\u3087\u3063\u3077\u3055\u3077\u3089\u3044\u305A" }, { name: "Ham Ham BURGER", genre: "\u30B8\u30E3\u30F3\u30AF\u8B0E", jan: "4580747420386", price: 1800, wholesale: 1260, cost: 0, lot: "10\uFF5E", status: "\u5728\u5EAB\u306A\u3057", note: "\u5897\u5237\u672A\u5B9A\n\u7BB1\u306B\u5909\u66F4\u4E88\u5B9A", reorderPoint: 3, id: "P025", furigana: "\u306F\u3080\u306F\u3080\u3070\u30FC\u304C\u30FC" }, { name: "\u591C\u7A7A\u306B\u6D88\u3048\u305F\uFF13\u3064\u306E\u7269\u8A9E", genre: "\u30A2\u30F3\u30BD\u30ED\u30B8\u30FC", jan: "4580747420409", price: 2900, wholesale: 2030, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P026", furigana: "\u3088\u305E\u3089\u306B\u304D\u3048\u305F\u307F\u3063\u3064\u306E\u3082\u306E\u304C\u305F\u308A" }, { name: "\u9ED2\u732B\uFF13\u5947\u8B5A", genre: "", jan: "4580747420522", price: 3500, wholesale: 2450, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P027", furigana: "\u304F\u308D\u306D\u3053\u3055\u3093\u304D\u305F\u3093" }, { name: "\u30CA\u30BE\u30B5\u30F3\u30C9\u3000\u4E0D\u601D\u8B70\u306A\u68EE\u306E\u6075\u307F\u5473", genre: "\u30CA\u30BE\u30B5\u30F3\u30C9", jan: "4580747420416", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P028", furigana: "\u306A\u305E\u3055\u3093\u3069\u3075\u3057\u304E\u306A\u3082\u308A\u306E\u3081\u3050\u307F\u3042\u3058" }, { name: "\u30CA\u30BE\u30B5\u30F3\u30C9\u3000\u304B\u3050\u3084\u59EB\u76F4\u4F1D\u3000\u6708\u306E\u73CD\u5473", genre: "\u30CA\u30BE\u30B5\u30F3\u30C9", jan: "4580747420423", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P029", furigana: "\u306A\u305E\u3055\u3093\u3069\u304B\u3050\u3084\u3072\u3081\u3058\u304D\u3067\u3093\u3064\u304D\u306E\u3061\u3093\u307F" }, { name: "\u30CA\u30BE\u30B5\u30F3\u30C9\u3000\u685C\u6563\u308B\u6D99\u5473", genre: "\u30CA\u30BE\u30B5\u30F3\u30C9", jan: "4580747420430", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P030", furigana: "\u306A\u305E\u3055\u3093\u3069\u3055\u304F\u3089\u3061\u308B\u306A\u307F\u3060\u3042\u3058" }, { name: "\u30CA\u30BE\u30B5\u30F3\u30C9\u3000\u63A2\u305B\uFF01\u7A76\u6975\u306E\u30D0\u30BA\u5473", genre: "\u30CA\u30BE\u30B5\u30F3\u30C9", jan: "4580747420447", price: 1200, wholesale: 840, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P031", furigana: "\u306A\u305E\u3055\u3093\u3069\u3055\u304C\u305B\u304D\u3085\u3046\u304D\u3087\u304F\u306E\u3070\u305A\u3042\u3058" }, { name: "\u30CA\u30BE\u30B5\u30F3\u30C9\u3000\u30D6\u30E9\u30C3\u30AF\u904E\u52B4\u5473", genre: "\u30CA\u30BE\u30B5\u30F3\u30C9", jan: "4580747420454", price: 1200, wholesale: 840, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P032", furigana: "\u306A\u305E\u3055\u3093\u3069\u3076\u3089\u3063\u304F\u304B\u308D\u3046\u3042\u3058" }, { name: "\u30CA\u30BE\u30B5\u30F3\u30C9\u3000\u305D\u308C\u3044\u3051\uFF01\u7A76\u6975\u306E\u9B54\u738B\u5473", genre: "\u30CA\u30BE\u30B5\u30F3\u30C9", jan: "", price: 1200, wholesale: 840, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E0D\u53EF", note: "2026.5~", reorderPoint: 3, id: "P033", furigana: "\u306A\u305E\u3055\u3093\u3069\u305D\u308C\u3044\u3051\u304D\u3085\u3046\u304D\u3087\u304F\u306E\u307E\u304A\u3046\u3042\u3058" }, { name: "\u731F\u5947\u306F\u30AB\u30AF\u30C6\u30EB\u306B\u6EF2\u3080", genre: "", jan: "4580747420461", price: 4800, wholesale: 3360, cost: 0, lot: "5\uFF5E", status: "\u53D6\u6271\u4E2D", note: "\u30DE\u30FC\u30C0\u30FC\u30DF\u30B9\u30C6\u30EA\u30FC", reorderPoint: 3, id: "P034", furigana: "\u308A\u3087\u3046\u304D\u306F\u304B\u304F\u3066\u308B\u306B\u306B\u3058\u3080" }, { name: "\u8ECC\u8DE1\u306F\u30D0\u30A4\u30AA\u30EC\u30C3\u30C8\u306B\u67D3\u307E\u308B", genre: "", jan: "4580747420478", price: 8800, wholesale: 6160, cost: 0, lot: "5\uFF5E", status: "\u5728\u5EAB\u306A\u3057", note: "\u30DE\u30FC\u30C0\u30FC\u30DF\u30B9\u30C6\u30EA\u30FC", reorderPoint: 3, id: "P035", furigana: "\u304D\u305B\u304D\u306F\u3070\u3044\u304A\u308C\u3063\u3068\u306B\u305D\u307E\u308B" }, { name: "\u6BBA\u610F\u306F\u30AB\u30AF\u30C6\u30EB\u306B\u6620\u308B", genre: "", jan: "4580747420485", price: 8800, wholesale: 6160, cost: 0, lot: "5\uFF5E", status: "\u53D6\u6271\u4E2D", note: "\u30DE\u30FC\u30C0\u30FC\u30DF\u30B9\u30C6\u30EA\u30FC", reorderPoint: 3, id: "P036", furigana: "\u3055\u3064\u3044\u306F\u304B\u304F\u3066\u308B\u306B\u3046\u3064\u308B" }, { name: "\u65C5\u3059\u308B\u30AD\u30C3\u30C1\u30F3\u30AB\u30FC\u3000\u30D5\u30ED\u30FC\u30BA\u30F3\u30B8\u30E5\u30A8\u30EB", genre: "", jan: "4580747420492", price: 3500, wholesale: 2450, cost: 0, lot: "10\uFF5E", status: "\u5728\u5EAB\u306A\u3057", note: "", reorderPoint: 3, id: "P037", furigana: "\u305F\u3073\u3059\u308B\u304D\u3063\u3061\u3093\u304B\u30FC\u3075\u308D\u30FC\u305A\u3093\u3058\u3085\u3048\u308B" }, { name: "\u8B0E\u4ED8\u304D\u7F36\u30D0\u30C3\u30C1", genre: "", jan: "", price: 500, wholesale: 350, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P038", furigana: "\u306A\u305E\u3064\u304D\u304B\u3093\u3070\u3063\u3061" }, { name: "HOTEL\u3046\u305F\u305F\u306D", genre: "", jan: "4580747420508", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P039", furigana: "\u307B\u3066\u308B\u3046\u305F\u305F\u306D" }, { name: "\u55AB\u8336\u30B3\u30DE\u30C9\u30EA", genre: "", jan: "4580747420515", price: 900, wholesale: 630, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P040", furigana: "\u304D\u3063\u3055\u3053\u307E\u3069\u308A" }, { name: "\u30D1\u30C6\u30A3\u30B9\u30EA\u30FC\u30E1\u30EB\u30D8\u30F3", genre: "", jan: "4580747420607", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P041", furigana: "\u3071\u3066\u3043\u3059\u308A\u30FC\u3081\u308B\u3078\u3093" }, { name: "\u65C5\u9928\u3046\u3089\u3081\u3057", genre: "", jan: "4580747420614", price: 900, wholesale: 630, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P042", furigana: "\u308A\u3087\u304B\u3093\u3046\u3089\u3081\u3057" }, { name: "\u30A4\u30BF\u30EA\u30A2\u30F3\u30EC\u30B9\u30C8\u30E9\u30F3\u3000\u30DE\u30F3\u30DE\u30DF\u30FC\u30A2", genre: "\u305F\u3070\u3053\u8B0E", jan: "4580747420591", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P043", furigana: "\u3044\u305F\u308A\u3042\u3093\u308C\u3059\u3068\u3089\u3093\u307E\u3093\u307E\u307F\u30FC\u3042" }, { name: "\u305F\u3070\u3053\u3000\u307F\u3059\u309E\u5C4B", genre: "\u305F\u3070\u3053\u8B0E", jan: "4580747420584", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P044", furigana: "\u305F\u3070\u3053\u307F\u3059\u305A\u3084" }, { name: "\u30DE\u30C3\u30C1\u30E7BAR", genre: "\u305F\u3070\u3053\u8B0E", jan: "4580747420652", price: 700, wholesale: 490, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P045", furigana: "\u307E\u3063\u3061\u3087\u3070\u30FC" }, { name: "\u96C0\u8358\u3000\u5927\u4E09\u5143", genre: "\u305F\u3070\u3053\u8B0E", jan: "4580747420645", price: 800, wholesale: 560, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 3, id: "P046", furigana: "\u3058\u3083\u3093\u305D\u3046\u3060\u3044\u3055\u3093\u3052\u3093" }, { name: "\u30A4\u30F3\u30AF\u30C0\u30B3\u3000\u30A2\u30AF\u30EA\u30EB\u30AD\u30FC\u30DB\u30EB\u30C0\u30FC", genre: "\u30B0\u30C3\u30BA", jan: "", price: 600, wholesale: 420, cost: 0, lot: "10\uFF5E", status: "\u53D6\u6271\u4E2D", note: "\u8B0E\u7121", reorderPoint: 3, id: "P047", furigana: "\u3044\u3093\u304F\u3060\u3053\u3042\u304F\u308A\u308B\u304D\u30FC\u307B\u308B\u3060\u30FC" }];
const SEED_CONSIGNEES = [{ id: "WH", name: "BOUKEN\u5009\u5EAB", company: "(\u81EA\u793E)", bizType: "\u5009\u5EAB", contractType: "\u81EA\u793E", feeRate: 0, status: "\u7A3C\u50CD\u4E2D", note: "\u81EA\u793E\u306E\u5009\u5EAB\u30FB\u4E8B\u52D9\u6240", paymentDueDays: 30, cadence: "monthly" }, { id: "TOKI", name: "\u6642\u89E3", company: "\u5149\u660E\u8208\u696D\u682A\u5F0F\u4F1A\u793E", bizType: "\u30ab\u30d5\u30a7\uff08\u8b0e\u89e3\u304d\u30fb\u30dc\u30fc\u30c9\u30b2\u30fc\u30e0\uff09", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u59D4\u8A1770%", paymentDueDays: 25, paymentTerms: "\u6708\u672B\u7DE0\u3081\u7FCC\u670825\u65E5\u6255\u3044", cadence: "monthly", locations: [{ id: "LOC-1sat1aah", label: "\u672C\u5E97", address: "\u3012542-0076 \u5927\u962A\u5E9C\u5927\u962A\u5E02\u4E2D\u592E\u533A\u96E3\u6CE24-7-5", contactPerson: "\u6642\u89E3eScapecafe \u306A\u3093\u3070\u5E97 \u6817\u539F", phone: "06-6641-2337", email: "", building: "" }] }, { id: "NAZO", name: "\u306A\u305E\u306D\u3053", company: "\u306A\u305E\u306D\u3053", bizType: "\u30ab\u30d5\u30a7\uff08\u8b0e\u89e3\u304d\u30fb\u30dc\u30fc\u30c9\u30b2\u30fc\u30e0\uff09", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u59D4\u8A1770%", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-0wop2nwd", label: "\u672C\u5E97", address: "\u3012462-0841 \u611B\u77E5\u770C\u540D\u53E4\u5C4B\u5E02\u5317\u533A\u9ED2\u5DDD\u672C\u901A4-47", contactPerson: "\u6238\u7530\u4FEE\u5E73", phone: "090-4264-5614", email: "", building: "" }] }, { id: "YELL", name: "\u30A4\u30A8\u30ED\u30FC\u30B5\u30D6\u30DE\u30EA\u30F3", company: "\u30A4\u30A8\u30ED\u30FC\u30B5\u30D6\u30DE\u30EA\u30F3", bizType: "\u30DC\u30FC\u30C9\u30B2\u30FC\u30E0\u5C4B", contractType: "\u8CB7\u53D6", feeRate: 0.35, status: "\u7A3C\u50CD\u4E2D", note: "\u8CB7\u53D665% / \u5C0F\u6570\u70B9\u4EE5\u4E0B\u5207\u308A\u6368\u3066", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-3s3gxiww", label: "\u672C\u5E97", address: "\u3012335-0038 \u57FC\u7389\u770C\u6238\u7530\u5E02\u7F8E\u5973\u6728\u53172-9-1", contactPerson: "\u670D\u90E8", phone: "048-449-7661", email: "itaku@yellowsubmarine.co.jp", building: "\u30A4\u30A8\u30ED\u30FC\u30B5\u30D6\u30DE\u30EA\u30F3\u7269\u6D41\u30BB\u30F3\u30BF\u30FC\u5185" }] }, { id: "TUMB", name: "\u30BF\u30F3\u30D6\u30EB\u30A6\u30A3\u30FC\u30C9", company: "\u682A\u5F0F\u4F1A\u793E\u30B0\u30EA\u30FC\u30F3\u30C0\u30A4\u30B9", bizType: "\u30b2\u30fc\u30e0\u30fb\u8b0e\u89e3\u304d\u65bd\u8a2d", contractType: "\u8CB7\u53D6", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u8CB7\u53D670% / \u6708\u6C34\u91D117\u6642\u4EE5\u964Dor\u571F\u65E5\u7740\u6307\u5B9A", paymentDueDays: 30, cadence: "spot", locations: [{ id: "LOC-djweiw10", label: "\u672C\u5E97", address: "\u3012155-0031 \u6771\u4EAC\u90FD\u4E16\u7530\u8C37\u533A\u5317\u6CA22-12-2", contactPerson: "\u30D2\u30E9\u30E1\u30AB\u4E0B\u5317\u6CA2\u5B9B", phone: "03-6805-515", email: "", building: "\u30B5\u30A6\u30B9\u30A6\u30A7\u30FC\u30D6\u4E0B\u5317\u6CA24A" }] }, { id: "RUHE", name: "\u30D6\u30C3\u30AF\u30B9\u30FB\u30EB\u30FC\u30A8", company: "\u6C38\u4E95\u5546\u4E8B\u682A\u5F0F\u4F1A\u793E", bizType: "\u672C\u5C4B", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u59D4\u8A1770% / \u8FD4\u5374\u6642\u306F\u5148\u65B9\u8CA0\u62C5", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-bjhcu9am", label: "\u672C\u5E97", address: "\u3012180-0004 \u6771\u4EAC\u90FD\u6B66\u8535\u91CE\u5E02\u5409\u7965\u5BFA\u672C\u753A1-14-3", contactPerson: "\u6C38\u4E95 \u5065", phone: "0422-22-5677", email: "tn@books-ruhe.co.jp", building: "" }] }, { id: "BAD", name: "\u30CA\u30BE\u30C8\u30AD\u30A8\u30F3\u30BF\u30E1\u30B9\u30DA\u30FC\u30B9\u30EF\u30F3\u30C0\u30FC\u30E9\u30DC", company: "\u682A\u5F0F\u4F1A\u793E\u30D0\u30C3\u30C9\u30CB\u30E5\u30FC\u30B9", bizType: "\u30b2\u30fc\u30e0\u30fb\u8b0e\u89e3\u304d\u65bd\u8a2d", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u59D4\u8A1770%", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-m11yp8ej", label: "\u672C\u5E97", address: "\u3012950-0903 \u65B0\u6F5F\u770C\u65B0\u6F5F\u5E02\u4E2D\u592E\u533A\u6625\u65E5\u753A5-1", contactPerson: "\u68EE", phone: "080-1229-5735", email: "s_mori@badnews.co.jp", building: "" }] }, { id: "BUNK", name: "\u6587\u55AB \u516D\u672C\u6728", company: "\u682A\u5F0F\u4F1A\u793E\u3072\u3089\u304F", bizType: "\u672C\u5C4B", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u59D4\u8A1770%", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-sc9y4mqr", label: "\u672C\u5E97", address: "\u3012106-0032 \u6771\u4EAC\u90FD\u6E2F\u533A\u516D\u672C\u67286-1-20", contactPerson: "\u6FF1\u4E2D\u8AD2\u592A\u90CE(\u526F\u5E97\u9577)", phone: "03-6438-9120", email: "hamanaka_r@nippan.co.jp", building: "\u516D\u672C\u6728\u96FB\u6C17\u30D3\u30EB1F" }] }, { id: "WAKA", name: "\u30EF\u30AB\u30B5", company: "", bizType: "\u672C\u5C4B", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u203B\u8981\u60C5\u5831\u66F4\u65B0", paymentDueDays: 30, cadence: "monthly" }, { id: "STAN", name: "THE NAZO STAND", company: "", bizType: "", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u6708\u6B21CSV\u3067\u8CA9\u58F2\u30C7\u30FC\u30BF\u3092\u53D7\u9818", paymentDueDays: 30, cadence: "monthly" }, { id: "YS", name: "\u5409\u91CE\u5BB6", company: "", bizType: "", contractType: "", feeRate: 0, status: "\u7A3C\u50CD\u4E2D", note: "\u203B\u8A73\u7D30\u60C5\u5831\u306F\u8981\u78BA\u8A8D", paymentDueDays: 30, cadence: "monthly" }, { id: "TENQ", name: "TeNQ", company: "", bizType: "\u30b2\u30fc\u30e0\u30fb\u8b0e\u89e3\u304d\u65bd\u8a2d", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u203B\u8981\u60C5\u5831\u66F4\u65B0", paymentDueDays: 30, cadence: "monthly" }, { id: "XEOX", name: "XEOXY", company: "XEOXY", bizType: "\u305d\u306e\u4ed6", contractType: "\u8CB7\u53D6", feeRate: 0.3, status: "\u4F11\u6B62", note: "\u8CB7\u53D670% / \u6771\u4EAC\u30FB\u5927\u962A\u30FB\u5948\u826F", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-62bp1x9z", label: "\u672C\u5E97", address: "\u3012160-0023 \u6771\u4EAC\u90FD\u65B0\u5BBF\u533A\u897F\u65B0\u5BBF6-26-9", contactPerson: "", phone: "080-7815-0199", email: "", building: "\u5B9D\u6804\u6210\u5B50\u5742\u30D3\u30EB3\u968E" }] }, { id: "KAMA", name: "\u30AB\u30DE\u30E4", company: "\u682A\u5F0F\u4F1A\u793E\u30AB\u30DE\u30E4", bizType: "\u672C\u5C4B", contractType: "\u8CB7\u53D6", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u8CB7\u53D670%", paymentDueDays: 30, cadence: "spot", locations: [{ id: "LOC-odav2mmn", label: "\u672C\u5E97", address: "\u3012103-0016 \u6771\u4EAC\u90FD\u4E2D\u592E\u533A\u65E5\u672C\u6A4B\u5C0F\u7DB2\u753A6-1", contactPerson: "", phone: "03-3667-3571", email: "", building: "" }] }, { id: "TSUT", name: "\u51FD\u9928 \u8526\u5C4B\u66F8\u5E97", company: "\u30AB\u30EB\u30C1\u30E5\u30A2\u30FB\u30B3\u30F3\u30D3\u30CB\u30A8\u30F3\u30B9\u30FB\u30AF\u30E9\u30D6\u682A\u5F0F\u4F1A\u793E", bizType: "\u672C\u5C4B", contractType: "\u8CB7\u53D6", feeRate: 0.35, status: "\u7A3C\u50CD\u4E2D", note: "\u8CB7\u53D665%", paymentDueDays: 30, cadence: "spot", locations: [{ id: "LOC-kliza5fm", label: "\u672C\u5E97", address: "\u3012041-0802 \u5317\u6D77\u9053\u51FD\u9928\u5E02\u77F3\u5DDD\u753A85-1", contactPerson: "\u4E0A\u5009 \u672A\u6765", phone: "0138-47-3771", email: "Miki.Kamikura@ccc.co.jp", building: "" }] }, { id: "JELL", name: "JELLY JELLY STORE \u6C60\u888B\u5E97", company: "\u682A\u5F0F\u4F1A\u793E\u30D4\u30C1\u30AB\u30FC\u30C8\u30C7\u30B6\u30A4\u30F3", bizType: "\u30ab\u30d5\u30a7\uff08\u8b0e\u89e3\u304d\u30fb\u30dc\u30fc\u30c9\u30b2\u30fc\u30e0\uff09", contractType: "\u8CB7\u53D6", feeRate: 0.3, status: "\u4F11\u6B62", note: "\u59D4\u8A1770%", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-2yh9f7g1", label: "\u672C\u5E97", address: "\u3012171-0022 \u6771\u4EAC\u90FD\u8C4A\u5CF6\u533A\u5357\u6C60\u888B1-25-4", contactPerson: "\u98EF\u7530 \u6602\u6717(\u5E97\u9577)", phone: "03-6384-4440", email: "iida@pizzdesign.com", building: "RS\u30D3\u30EB1\u968E" }] }, { id: "KUMA", name: "\u8526\u5C4B\u66F8\u5E97 \u718A\u672C\u4E09\u5E74\u5742\u5E97", company: "\u30CB\u30E5\u30FC\u30B3\u30FB\u30EF\u30F3\u682A\u5F0F\u4F1A\u793E", bizType: "\u672C\u5C4B", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u4F11\u6B62", note: "\u59D4\u8A1770% / \u671F\u9593\u9650\u5B9A", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-5rc5yhqg", label: "\u672C\u5E97", address: "\u3012860-0801 \u718A\u672C\u5E02\u4E2D\u592E\u533A\u5B89\u653F\u753A1-2", contactPerson: "\u4E09\u702C \u5F18\u6CF0", phone: "096-241-9250", email: "hiroyasu_mise@newco1.co.jp", building: "\u30AB\u30EA\u30FC\u30CE\u4E0B\u901A5F" }] }, { id: "ASOB", name: "\u3042\u305D\u3073\u3070", company: "\u682A\u5F0F\u4F1A\u793E\u8AAD\u58F2\u30C6\u30EC\u30D3\u30A8\u30F3\u30BF\u30FC\u30D7\u30E9\u30A4\u30BA", bizType: "\u30b2\u30fc\u30e0\u30fb\u8b0e\u89e3\u304d\u65bd\u8a2d", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u9589\u5E97", note: "JAN\u30B3\u30FC\u30C9\u5FC5\u8981\u3060\u3063\u305F", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-s8jl6e97", label: "\u672C\u5E97", address: "", contactPerson: "", phone: "090-4264-5614", email: "", building: "" }] }, { id: "SPAR", name: "\u3072\u3089\u3081\u304D\u30B9\u30BF\u30B8\u30AASPARK", company: "Sunfield", bizType: "\u30b2\u30fc\u30e0\u30fb\u8b0e\u89e3\u304d\u65bd\u8a2d", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u9589\u5E97", note: "", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-o7mok7kd", label: "\u672C\u5E97", address: "\u3012552-0022 \u5927\u962A\u5E9C\u5927\u962A\u5E02\u6E2F\u533A\u6D77\u5CB8\u901A1-1-10", contactPerson: "\u5DFD", phone: "06-6576-5647", email: "info@hiramekistudio-spark.jp", building: "\u30DE\u30FC\u30B1\u30C3\u30C8\u30D7\u30EC\u30FC\u30B92F" }] }, { id: "FAVR", name: "favori", company: "", bizType: "\u5c02\u9580\u5c0f\u58f2\u5e97", contractType: "\u59D4\u8A17", feeRate: 0.1, status: "\u4F11\u6B62", note: "\u30A4\u30D9\u30F3\u30C8\u51FA\u5E97\u6642 / 90%\u624B\u53D6\u308A", paymentDueDays: 30, cadence: "monthly" }, { id: "MELO", name: "\u30E1\u30ED\u30F3\u30D6\u30C3\u30AF\u30B9", company: "", bizType: "\u5c02\u9580\u5c0f\u58f2\u5e97", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u4F11\u6B62", note: "\u6D88\u8CBB\u7A0E\u5F15\u304B\u308C\u308B", paymentDueDays: 30, cadence: "monthly" }, { id: "MAND", name: "\u307E\u3093\u3060\u3089\u3051", company: "", bizType: "\u672C\u5C4B", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u4F11\u6B62", note: "", paymentDueDays: 30, cadence: "monthly" }, { id: "USON", name: "\u3046\u305D\u306E\u305F\u3070\u3053\u5C4B", company: "", bizType: "\u5c02\u9580\u5c0f\u58f2\u5e97", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u4F11\u6B62", note: "", paymentDueDays: 30, cadence: "monthly", locations: [{ id: "LOC-c0cxq0d7", label: "\u672C\u5E97", address: "\u6771\u4EAC(\u6D45\u8349)", contactPerson: "", phone: "", email: "", building: "" }] }, { id: "NAIS", name: "\u5185\u8077\u4F1A\u793E", company: "(\u5185\u8077)", bizType: "\u305d\u306e\u4ed6", contractType: "\u5185\u8077", feeRate: 0, status: "\u7A3C\u50CD\u4E2D", note: "\u5185\u8077\u4E2D\u306E\u5728\u5EAB\u306F\u30CE\u30FC\u30AB\u30A6\u30F3\u30C8\u904B\u7528", paymentDueDays: 30, cadence: "monthly" }, { id: "SCRA", name: "SCRAP", company: "", bizType: "\u672C\u5C4B", contractType: "\u8CB7\u53D6", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u203B\u8981\u60C5\u5831\u66F4\u65B0", paymentDueDays: 30, cadence: "monthly" }, { id: "STOR", name: "STORES", company: "", bizType: "EC", contractType: "\u81EA\u793EEC", feeRate: 0.036, status: "\u7A3C\u50CD\u4E2D", note: "STORES\u624B\u6570\u65993.6%(\u76EE\u5B89)", paymentDueDays: 30, cadence: "monthly" }, { id: "SANS", name: "\u4E09\u7701\u5802", company: "", bizType: "\u672C\u5C4B", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "\u203B\u8981\u60C5\u5831\u66F4\u65B0", paymentDueDays: 30, cadence: "spot" }];
const SEED_RECIPIENTS = [{ id: "RCP-emp01", name: "吉野禎央", type: "\u793E\u54E1", zip: "211-0064", address: "神奈川県川崎市中原区今井南町21番35-606号 ルミエール南2", phone: "09098621305" }, { id: "RCP-emp02", name: "池田佳世", type: "\u793E\u54E1", zip: "158-0083", address: "東京都世田谷区奥沢1-64-6 セジュール奥沢201", phone: "09074165444" }, { id: "RCP-emp03", name: "小尾洋平", type: "\u793E\u54E1", zip: "400-0117", address: "山梨県甲斐市西八幡1036-1 アーバンシャトー甲斐301", phone: "09080314758" }, { id: "RCP-emp04", name: "安齋江理加", type: "\u793E\u54E1", zip: "123-0872", address: "東京都足立区江北7-11-6", phone: "09093633271" }, { id: "RCP-emp05", name: "石橋洋平", type: "\u793E\u54E1", zip: "223-0061", address: "横浜市港北区日吉2-11-16", phone: "08041624295" }, { id: "RCP-emp06", name: "佐藤俊介", type: "\u793E\u54E1", zip: "356-0024", address: "埼玉県ふじみ野市谷田2-4-10", phone: "08065853103" }, { id: "RCP-emp07", name: "竹林大貴", type: "\u793E\u54E1", zip: "140-0014", address: "東京都品川区大井4-12-10 マグノリア第一102", phone: "08091639888" }, { id: "RCP-emp08", name: "平沼茉莉", type: "\u793E\u54E1", zip: "212-0016", address: "神奈川県川崎市幸区南幸町3-2-1-403", phone: "09042082579" }, { id: "RCP-emp09", name: "渡辺一輝", type: "\u793E\u54E1", zip: "177-0042", address: "東京都練馬区下石神井4-12-5 ディフロイデェ501", phone: "08081639566" }];
const TX_TYPES = [{ id: "\u4ED5\u5165", label: "\u4ED5\u5165(\u5165\u5EAB)", shortLabel: "\u4ED5\u5165", icon: ArrowDownCircle, needsFrom: false, needsTo: true, sign: "in", color: "#3F7D5C", group: "\u2460\u5728\u5EAB\u306E\u307F\u5909\u52D5" }, { id: "\u79FB\u52D5", label: "\u79FB\u52D5(\u59D4\u8A17\u30FB\u81EA\u793E)", shortLabel: "\u79FB\u52D5", icon: ArrowRightLeft, needsFrom: true, needsTo: true, sign: "move", color: "#2C6E8F", fromLabel: "\u5834\u6240From", toLabel: "\u5834\u6240To", group: "\u2460\u5728\u5EAB\u306E\u307F\u5909\u52D5" }, { id: "\u68DA\u5378\u8ABF\u6574", label: "\u68DA\u5378\u8ABF\u6574", shortLabel: "\u68DA\u5378", icon: SlidersHorizontal, needsFrom: false, needsTo: true, sign: "adjust", color: "#9B59B6", toLabel: "\u5834\u6240(\u5BFE\u8C61)", group: "\u2460\u5728\u5EAB\u306E\u307F\u5909\u52D5" }, { id: "\u5728\u5EAB\u6D88\u8FBC", label: "\u5728\u5EAB\u6D88\u8FBC(\u30B9\u30BF\u30F3\u30C9\u7B49\u30FB\u58F2\u4E0A\u306F\u5225\u7BA1\u7406)", shortLabel: "\u5728\u5EAB\u6D88\u8FBC", icon: MinusCircle, needsFrom: true, needsTo: false, sign: "out", color: "#5B6E78", fromLabel: "\u5834\u6240From(\u5BFE\u8C61\u306E\u5834\u6240)", group: "\u2460\u5728\u5EAB\u306E\u307F\u5909\u52D5" }, { id: "\u59D4\u8A17", label: "\u59D4\u8A17\u58F2\u4E0A(\u59D4\u8A17\u5148\u306E\u5728\u5EAB\u304C\u6E1B\u308B)", shortLabel: "\u59D4\u8A17\u58F2\u4E0A", icon: ArrowUpCircle, needsFrom: true, needsTo: false, sign: "out", color: "#C1442B", fromLabel: "\u5834\u6240From(\u59D4\u8A17\u5148)", group: "\u2461\u58F2\u4E0A\u3092\u8A18\u9332" }, { id: "\u8CB7\u53D6", label: "\u8CB7\u53D6(\u5009\u5EAB\u304B\u3089\u767A\u9001)", shortLabel: "\u8CB7\u53D6", icon: Handshake, needsFrom: true, needsTo: true, sign: "out", color: "#A0522D", fromLabel: "\u5834\u6240From", toLabel: "\u5834\u6240To(\u8CB7\u53D6\u5148)", group: "\u2461\u58F2\u4E0A\u3092\u8A18\u9332" }, { id: "\u30A4\u30D9\u30F3\u30C8", label: "\u30A4\u30D9\u30F3\u30C8(\u5009\u5EAB\u306E\u5728\u5EAB\u304C\u6E1B\u308B)", shortLabel: "\u30A4\u30D9\u30F3\u30C8", icon: Store, needsFrom: false, needsTo: false, sign: "out", color: "#8A6D3B", group: "\u2461\u58F2\u4E0A\u3092\u8A18\u9332" }, { id: "EC", label: "EC(EC\u306E\u5728\u5EAB\u304C\u6E1B\u308B)", shortLabel: "EC", icon: Globe, needsFrom: true, needsTo: false, sign: "out", color: "#4A7A8C", fromLabel: "\u5834\u6240From(EC\u30C1\u30E3\u30CD\u30EB)", group: "\u2461\u58F2\u4E0A\u3092\u8A18\u9332" }];
const TX_TYPE_MAP = Object.fromEntries(TX_TYPES.map((t) => [t.id, t]));
const UNKNOWN_TX_TYPE = { id: "?", label: "\u4E0D\u660E\u306A\u7A2E\u5225", icon: AlertTriangle, needsFrom: true, needsTo: true, sign: "out", color: "#999999" };
function TxTypeOptions() {
  const groups = [];
  for (const t of TX_TYPES) {
    let g = groups.find((g2) => g2.name === t.group);
    if (!g) {
      g = { name: t.group, items: [] };
      groups.push(g);
    }
    g.items.push(t);
  }
  return groups.map((g) => <optgroup key={g.name} label={g.name}>
      {g.items.map((t) => <option key={t.id} value={t.id}>
          {t.label}
        </option>)}
    </optgroup>);
}
const NAV_ITEMS = [{ id: "dashboard", label: "\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9", icon: LayoutDashboard }, { id: "ledger", label: "\u53D6\u5F15\u8A18\u9332", icon: ArrowLeftRight }, { id: "shipping", label: "\u767A\u9001\u4F9D\u983C\u30FB\u78BA\u8A8D\u30EA\u30B9\u30C8", icon: Truck }, { id: "monthlyCheck", label: "\u6708\u6B21\u30C1\u30A7\u30C3\u30AF", icon: ClipboardCheck }, { id: "salesSummary", label: "\u8CA9\u58F2\u96C6\u8A08", icon: TrendingUp, dividerBefore: true }, { id: "receivables", label: "\u58F2\u639B\u7BA1\u7406", icon: Receipt }, { id: "inventory", label: "\u5728\u5EAB\u72B6\u6CC1", icon: Boxes }, { id: "deliveryNotes", label: "\u7D0D\u54C1\u66F8\u4E00\u89A7", icon: FileText, dividerBefore: true }, { id: "invoices", label: "\u8ACB\u6C42\u66F8\u4E00\u89A7", icon: Receipt }, { id: "products", label: "\u5546\u54C1\u30DE\u30B9\u30BF", icon: Package }, { id: "consignees", label: "\u59D4\u8A17\u5148\u30DE\u30B9\u30BF", icon: Building2 }, { id: "recipients", label: "\u767A\u9001\u5148\u30DE\u30B9\u30BF", icon: MapPin }, { id: "valuation", label: "\u68DA\u5378\u8CC7\u7523\u660E\u7D30", icon: ClipboardList }, { id: "faq", label: "FAQ", icon: Info, dividerBefore: true }, { id: "settings", label: "\u8A2D\u5B9A\u30FB\u9023\u643A", icon: SettingsIcon }];
function findWarehouse(consignees) {
  return consignees.find((c) => c.contractType === "\u5009\u5EAB") || consignees.find((c) => c.id === "WH") || consignees[0];
}
function findStores(consignees) {
  return consignees.find((c) => c.name === "STORES") || consignees.find((c) => c.id === "STOR");
}
function alertTargetQty(inventory, productId, consignees, alertLocationIds) {
  const row = inventory[productId];
  if (!row) return 0;
  if (alertLocationIds && alertLocationIds.length) {
    return alertLocationIds.reduce((sum, id) => sum + (row[id] || 0), 0);
  }
  const warehouseId = findWarehouse(consignees)?.id;
  return warehouseId ? row[warehouseId] || 0 : 0;
}
const DEFAULT_COMPANY_INFO = { name: "\u682A\u5F0F\u4F1A\u793EBOUKEN WORKS", postalCode: "150-0001", address: "\u6771\u4EAC\u90FD\u6E0B\u8C37\u533A\u795E\u5BAE\u524D\u516D\u4E01\u76EE23\u756A4\u53F7 \u6851\u91CE\u30D3\u30EB2\u968E", tel: "03-6822-3005", mail: "info@bouken-works.co.jp", registrationNumber: "T5011001132215", bankName: "\u4E09\u83F1UFJ\u9280\u884C", bankBranch: "\u4E2D\u76EE\u9ED2\u652F\u5E97(643)", bankAccountType: "\u666E\u901A", bankAccountNumber: "0414209", bankAccountHolder: "\u30AB\u30D6\u30B7\u30AD\u30AC\u30A4\u30B7\u30E3\u30DC\u30A6\u30B1\u30F3\u30EF\u30FC\u30AF\u30B9" };
const DEFAULT_COVER_LETTER_MESSAGE = `\u3053\u306E\u5EA6\u306F\u5546\u54C1\u3092\u3054\u8CFC\u5165\u3044\u305F\u3060\u304D
\u3042\u308A\u304C\u3068\u3046\u3054\u3056\u3044\u307E\u3059\u3002

\u5546\u54C1\u306E\u5185\u5BB9\u7269\u306B\u4E00\u90E8\u4E0D\u8DB3\u304C\u3042\u3063\u305F\u65E8
\u5927\u5909\u7533\u3057\u8A33\u3054\u3056\u3044\u307E\u305B\u3093\u3067\u3057\u305F\u3002

\u4E0D\u8DB3\u5206\u306E\u5185\u5BB9\u7269\u3092\u9001\u4ED8\u3044\u305F\u3057\u307E\u3059\u3002

\u3053\u306E\u5EA6\u306F\u304A\u624B\u9593\u3092\u3068\u3089\u305B\u3066\u3057\u307E\u3044
\u7533\u3057\u8A33\u3054\u3056\u3044\u307E\u305B\u3093\u3067\u3057\u305F\u3002

\u4ECA\u5F8C\u3068\u3082BOUKEN WORKS\u3092
\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059\u3002

BOUKEN WORKS \u904B\u55B6\u4E8B\u52D9\u5C40`;
function formatDocNumber(prefix, n) {
  return `${prefix}${String(n).padStart(4, "0")}`;
}
function splitTaxIncluded(total) {
  const subtotal = Math.round(total / 1.1);
  return { subtotal, tax: total - subtotal, total };
}
function buildDeliveryNotesFromTransactions(newTx, consignees, products, issueNumbers) {
  const warehouseId = findWarehouse(consignees)?.id;
  const moveLegs = newTx.filter((t) => t.type === "\u79FB\u52D5" && t.toLocation && t.toLocation !== warehouseId && t._createDeliveryNote);
  if (!moveLegs.length) return [];
  const groups = {};
  for (const t of moveLegs) {
    const key = t.batchId || t.id;
    (groups[key] ||= { consigneeId: t.toLocation, batchId: t.batchId || null, date: t.date, moves: [] }).moves.push(t);
  }
  const groupList = Object.values(groups);
  const numbers = issueNumbers(groupList.length);
  return groupList.map((g, i) => {
    const consignee = consignees.find((c) => c.id === g.consigneeId);
    const feeRate = Number(consignee?.feeRate) || 0;
    const revenueLegs = g.batchId ? newTx.filter((t) => t.batchId === g.batchId && t.type !== "\u79FB\u52D5") : [];
    const items = g.moves.map((move) => {
      const rev = revenueLegs.find((r) => r.relatedId === move.id) || revenueLegs.find((r) => r.productId === move.productId);
      const product = products.find((p) => p.id === move.productId);
      const unitPrice = rev ? Number(rev.unitPrice) || 0 : Math.round((Number(product?.price) || 0) * (1 - feeRate));
      const qty = Number(move.qty) || 0;
      return { productId: move.productId, qty, unitPrice, amount: unitPrice * qty };
    });
    const total = items.reduce((s, it) => s + it.amount, 0);
    const monthLabel = `${new Date(g.date).getMonth() + 1}\u6708\u767A\u9001\u5206`;
    return { id: uid("DN"), number: numbers[i], date: g.date, consigneeId: g.consigneeId, title: `${consignee?.name || ""}\u69D8 ${monthLabel}`, items, ...splitTaxIncluded(total), memo: "", invoiceId: null, sourceBatchId: g.batchId };
  });
}
function buildInvoicesFromTransactions(newTx, consignees, products, issueNumbers) {
  const warehouseId = findWarehouse(consignees)?.id;
  const moveLegs = newTx.filter((t) => t.type === "\u79FB\u52D5" && t.toLocation && t.toLocation !== warehouseId && t._createInvoice);
  const directSales = newTx.filter((t) => t.type === "\u59D4\u8A17" && t._createInvoice);
  if (!moveLegs.length && !directSales.length) return [];
  const groups = {};
  for (const t of moveLegs) {
    const key = t.batchId || t.id;
    (groups[key] ||= { consigneeId: t.toLocation, batchId: t.batchId || null, date: t.date, moves: [], direct: [] }).moves.push(t);
  }
  for (const t of directSales) {
    const key = t.batchId || t.id;
    (groups[key] ||= { consigneeId: t.fromLocation, batchId: t.batchId || null, date: t.date, moves: [], direct: [] }).direct.push(t);
  }
  const groupList = Object.values(groups);
  const numbers = issueNumbers(groupList.length);
  return groupList.map((g, i) => {
    const consignee = consignees.find((c) => c.id === g.consigneeId);
    const feeRate = Number(consignee?.feeRate) || 0;
    const revenueLegs = g.batchId ? newTx.filter((t) => t.batchId === g.batchId && t.type !== "\u79FB\u52D5") : [];
    const moveItems = g.moves.map((move) => {
      const rev = revenueLegs.find((r) => r.relatedId === move.id) || revenueLegs.find((r) => r.productId === move.productId);
      const product = products.find((p) => p.id === move.productId);
      const unitPrice = rev ? Number(rev.unitPrice) || 0 : Math.round((Number(product?.price) || 0) * (1 - feeRate));
      const qty = Number(move.qty) || 0;
      return { productId: move.productId, qty, unitPrice, amount: unitPrice * qty };
    });
    const directItems = g.direct.map((t) => ({ productId: t.productId, qty: Number(t.qty) || 0, unitPrice: Number(t.unitPrice) || 0, amount: Number(t.amount) || 0 }));
    const items = [...moveItems, ...directItems];
    const total = items.reduce((s, it) => s + it.amount, 0);
    const monthLabel = `${new Date(g.date).getMonth() + 1}\u6708\u767A\u6CE8\u5206`;
    const monthKeyLabel = monthKey(g.date);
    return { id: uid("INV"), number: numbers[i], date: todayStr(), consigneeId: g.consigneeId, title: `${consignee?.name || ""}\u69D8 ${monthLabel}`, month: monthKeyLabel, monthFrom: monthKeyLabel, monthTo: monthKeyLabel, items, ...splitTaxIncluded(total), memo: "", sourceBatchId: g.batchId };
  });
}
function buildDeliveryNoteFromShippingRequest(req, consignees, products, transactions, number, title) {
  const consignee = consignees.find((c) => c.id === req.consigneeId);
  const feeRate = Number(consignee?.feeRate) || 0;
  const linkedTx = req.sourceBatchId ? transactions.filter((t) => t.batchId === req.sourceBatchId && t.type !== "\u79FB\u52D5") : [];
  const items = req.items.map((it) => {
    const linked = linkedTx.find((t) => t.productId === it.productId);
    const product = products.find((p) => p.id === it.productId);
    const unitPrice = linked ? Number(linked.unitPrice) || 0 : Math.round((Number(product?.price) || 0) * (1 - feeRate));
    return { productId: it.productId, qty: it.qty, unitPrice, amount: unitPrice * it.qty };
  });
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { id: uid("DN"), number, date: todayStr(), consigneeId: req.consigneeId, title, items, ...splitTaxIncluded(total), memo: "", invoiceId: null, sourceRequestId: req.id, sourceBatchId: req.sourceBatchId || null };
}
function buildDeliveryNoteFromBatchId(batchId, consignees, products, transactions, number, title) {
  const moveLegs = transactions.filter((t) => t.batchId === batchId && t.type === "\u79FB\u52D5");
  const revenueLegs = transactions.filter((t) => t.batchId === batchId && t.type !== "\u79FB\u52D5");
  if (!moveLegs.length) return null;
  const consigneeId = moveLegs[0].toLocation;
  const consignee = consignees.find((c) => c.id === consigneeId);
  const feeRate = Number(consignee?.feeRate) || 0;
  const items = moveLegs.map((move) => {
    const rev = revenueLegs.find((r) => r.relatedId === move.id) || revenueLegs.find((r) => r.productId === move.productId);
    const product = products.find((p) => p.id === move.productId);
    const unitPrice = rev ? Number(rev.unitPrice) || 0 : Math.round((Number(product?.price) || 0) * (1 - feeRate));
    const qty = Number(move.qty) || 0;
    return { productId: move.productId, qty, unitPrice, amount: unitPrice * qty };
  });
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { id: uid("DN"), number, date: todayStr(), consigneeId, title, items, ...splitTaxIncluded(total), memo: "", invoiceId: null, sourceBatchId: batchId };
}
/** Rebuilds an invoice from the CURRENT contents of a batch's transactions —
 *  handles both move-leg batches (買取/移動 pairs, mirroring
 *  buildDeliveryNoteFromBatchId) and direct 委託 sales that have no move
 *  leg at all. Used both for the per-shipment invoice button and for
 *  keeping an invoice in sync when its source transaction is edited. */
function buildInvoiceFromBatchId(batchId, consignees, products, transactions, number, title) {
  const batchTx = transactions.filter((t) => t.batchId === batchId);
  const moveLegs = batchTx.filter((t) => t.type === "\u79FB\u52D5");
  const revenueLegs = batchTx.filter((t) => t.type !== "\u79FB\u52D5");
  let consigneeId, items;
  if (moveLegs.length) {
    consigneeId = moveLegs[0].toLocation;
    const consignee = consignees.find((c) => c.id === consigneeId);
    const feeRate = Number(consignee?.feeRate) || 0;
    items = moveLegs.map((move) => {
      const rev = revenueLegs.find((r) => r.relatedId === move.id) || revenueLegs.find((r) => r.productId === move.productId);
      const product = products.find((p) => p.id === move.productId);
      const unitPrice = rev ? Number(rev.unitPrice) || 0 : Math.round((Number(product?.price) || 0) * (1 - feeRate));
      const qty = Number(move.qty) || 0;
      return { productId: move.productId, qty, unitPrice, amount: unitPrice * qty };
    });
  } else if (revenueLegs.length) {
    consigneeId = revenueLegs[0].fromLocation;
    items = revenueLegs.map((t) => ({ productId: t.productId, qty: Number(t.qty) || 0, unitPrice: Number(t.unitPrice) || 0, amount: Number(t.amount) || 0 }));
  } else {
    return null;
  }
  const total = items.reduce((s, i) => s + i.amount, 0);
  const monthLabel = monthKey(batchTx[0]?.date || todayStr());
  return { id: uid("INV"), number, date: todayStr(), consigneeId, title, month: monthLabel, monthFrom: monthLabel, monthTo: monthLabel, items, ...splitTaxIncluded(total), memo: "", sourceBatchId: batchId };
}
function buildInvoiceFromShippingRequest(req, consignees, products, transactions, number, title) {
  const consignee = consignees.find((c) => c.id === req.consigneeId);
  const feeRate = Number(consignee?.feeRate) || 0;
  const linkedTx = req.sourceBatchId ? transactions.filter((t) => t.batchId === req.sourceBatchId && t.type !== "\u79FB\u52D5") : [];
  const items = req.items.map((it) => {
    const linked = linkedTx.find((t) => t.productId === it.productId);
    const product = products.find((p) => p.id === it.productId);
    const unitPrice = linked ? Number(linked.unitPrice) || 0 : Math.round((Number(product?.price) || 0) * (1 - feeRate));
    return { productId: it.productId, qty: it.qty, unitPrice, amount: unitPrice * it.qty };
  });
  const total = items.reduce((s, i) => s + i.amount, 0);
  return { id: uid("INV"), number, date: todayStr(), consigneeId: req.consigneeId, title, month: monthKey(req.date || todayStr()), items, ...splitTaxIncluded(total), memo: "", sourceRequestId: req.id, sourceBatchId: req.sourceBatchId || null };
}
function buildInvoiceFromTransactions(consignee, transactions, products, monthFrom, monthTo, number, title) {
  const monthTx = transactions.filter((t) => (t.type === "\u59D4\u8A17" || t.type === "\u8CB7\u53D6") && t.fromLocation === consignee.id && monthKey(t.date) >= monthFrom && monthKey(t.date) <= monthTo);
  const byProduct = {};
  for (const t of monthTx) {
    const p = byProduct[t.productId] ||= { qty: 0, amount: 0 };
    p.qty += Number(t.qty) || 0;
    p.amount += Number(t.amount) || 0;
  }
  const items = Object.entries(byProduct).map(([productId, v]) => ({ productId, qty: v.qty, unitPrice: v.qty ? Math.round(v.amount / v.qty) : 0, amount: v.amount })).sort((a, b) => b.amount - a.amount);
  const total = items.reduce((s, i) => s + i.amount, 0);
  const monthLabel = monthFrom === monthTo ? monthFrom : `${monthFrom}\u301C${monthTo}`;
  return { id: uid("INV"), number, date: todayStr(), consigneeId: consignee.id, title, month: monthLabel, monthFrom, monthTo, items, ...splitTaxIncluded(total), memo: "" };
}
function deriveShippingRequests(newTx, consignees) {
  const warehouseId = findWarehouse(consignees)?.id;
  const shipments = newTx.filter((t) => t.type === "\u79FB\u52D5" && t.toLocation && t.toLocation !== warehouseId && !t._skipShipping);
  if (!shipments.length) return [];
  const groups = {};
  for (const t of shipments) {
    const key = t.batchId || t.id;
    (groups[key] ||= { consigneeId: t.toLocation, date: t.date, items: [], sourceBatchId: t.batchId || null }).items.push({ productId: t.productId, qty: Number(t.qty) || 0, sampleQty: 0 });
  }
  return Object.values(groups).map((g) => {
    const consignee = consignees.find((c) => c.id === g.consigneeId);
    const locs = consignee?.locations || [];
    return { id: uid("SHIP"), consigneeId: g.consigneeId, locationId: locs.length === 1 ? locs[0].id : "", deadline: "", date: g.date, items: g.items, status: "pending", completedAt: "", memo: "", manual: false, sourceBatchId: g.sourceBatchId };
  });
}
function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function decodeGoogleJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(atob(base64).split("").map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0")).join(""));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function toHiragana(str) {
  return String(str || "").replace(/[\u30a1-\u30f6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 96));
}
function toFullWidthKatakana(str) {
  const s = String(str || "");
  const map = { "\uFF61": "\u3002", "\uFF62": "\u300C", "\uFF63": "\u300D", "\uFF64": "\u3001", "\uFF65": "\u30FB", "\uFF66": "\u30F2", "\uFF67": "\u30A1", "\uFF68": "\u30A3", "\uFF69": "\u30A5", "\uFF6A": "\u30A7", "\uFF6B": "\u30A9", "\uFF6C": "\u30E3", "\uFF6D": "\u30E5", "\uFF6E": "\u30E7", "\uFF6F": "\u30C3", "\uFF70": "\u30FC", "\uFF71": "\u30A2", "\uFF72": "\u30A4", "\uFF73": "\u30A6", "\uFF74": "\u30A8", "\uFF75": "\u30AA", "\uFF76": "\u30AB", "\uFF77": "\u30AD", "\uFF78": "\u30AF", "\uFF79": "\u30B1", "\uFF7A": "\u30B3", "\uFF7B": "\u30B5", "\uFF7C": "\u30B7", "\uFF7D": "\u30B9", "\uFF7E": "\u30BB", "\uFF7F": "\u30BD", "\uFF80": "\u30BF", "\uFF81": "\u30C1", "\uFF82": "\u30C4", "\uFF83": "\u30C6", "\uFF84": "\u30C8", "\uFF85": "\u30CA", "\uFF86": "\u30CB", "\uFF87": "\u30CC", "\uFF88": "\u30CD", "\uFF89": "\u30CE", "\uFF8A": "\u30CF", "\uFF8B": "\u30D2", "\uFF8C": "\u30D5", "\uFF8D": "\u30D8", "\uFF8E": "\u30DB", "\uFF8F": "\u30DE", "\uFF90": "\u30DF", "\uFF91": "\u30E0", "\uFF92": "\u30E1", "\uFF93": "\u30E2", "\uFF94": "\u30E4", "\uFF95": "\u30E6", "\uFF96": "\u30E8", "\uFF97": "\u30E9", "\uFF98": "\u30EA", "\uFF99": "\u30EB", "\uFF9A": "\u30EC", "\uFF9B": "\u30ED", "\uFF9C": "\u30EF", "\uFF9D": "\u30F3", "\uFF9E": "\u3099", "\uFF9F": "\u309A" };
  const base = s.replace(/[\uFF61-\uFF9F]/g, (ch) => map[ch] || ch);
  return base.replace(/([\u30AB-\u30C9\u30CF-\u30DB\u30A6])\u3099/g, (_, c) => String.fromCharCode(c.charCodeAt(0) + 1)).replace(/([\u30CF-\u30DB])\u309A/g, (_, c) => String.fromCharCode(c.charCodeAt(0) + 2));
}
function normalizePhone(str) {
  const s = String(str || "");
  const halfWidth = s.replace(/[\uFF10-\uFF19]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 65248)).replace(/[\uFF0D\u2010-\u2015\u30FC\uFF0D]/g, "-");
  return halfWidth.replace(/-/g, "");
}
function withHonorific(name) {
  if (!name) return "";
  if (/\u69D8\)?$/.test(name)) return name;
  if (name.endsWith(")")) {
    const idx = name.lastIndexOf("(");
    if (idx > 0) return `${name.slice(0, idx)}\u69D8${name.slice(idx)}`;
  }
  return `${name}\u69D8`;
}
function kanaMatch(text, query) {
  if (!query) return true;
  if (!text) return false;
  const norm = (s) => toHiragana(String(s).toLowerCase()).replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 65248)).replace(/[\s\u3000]+/g, "");
  return norm(text).includes(norm(query));
}
function todayStr() {
  const d = /* @__PURE__ */ new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
/** Converts a full ISO timestamp (e.g. completedAt) to a local-timezone
 *  YYYY-MM-DD string for display — .slice(0,10) on an ISO string gives the
 *  UTC date, which is wrong by one day during early-morning JST hours. */
function localDateFromISO(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function formatYen(n) {
  const v = Math.round(Number(n) || 0);
  return "\xA5" + v.toLocaleString("ja-JP");
}
function formatNum(n) {
  const v = Number(n) || 0;
  return v.toLocaleString("ja-JP");
}
function monthKey(dateStr) {
  if (!dateStr) return "";
  return dateStr.slice(0, 7);
}
function shiftMonth(monthStr, delta) {
  const [y, m] = monthStr.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function csvEscape(v) {
  const s = String(v ?? "");
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}
function toCsv(rows, headers) {
  const lines = [headers.map(csvEscape).join(",")];
  for (const r of rows) {
    lines.push(headers.map((h) => csvEscape(r[h])).join(","));
  }
  return lines.join("\n");
}
function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function readTextFile(file, cb) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => cb(String(reader.result || ""));
  reader.readAsText(file, "UTF-8");
}
let pdfJsLoadPromise = null;
function loadPdfJs() {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (pdfJsLoadPromise) return pdfJsLoadPromise;
  pdfJsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.js";
    script.onload = () => {
      try {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      } catch (err) {
        reject(err);
      }
    };
    script.onerror = () => reject(new Error("pdf.js\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F"));
    document.head.appendChild(script);
  });
  return pdfJsLoadPromise;
}
async function extractPdfAsRows(file) {
  const pdfjsLib = await loadPdfJs();
  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const lines = [];
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const items = content.items.map((it) => ({ x: it.transform[4], y: it.transform[5], width: it.width || 0, text: it.str })).filter((it) => it.text.trim());
    items.sort((a, b) => b.y - a.y || a.x - b.x);
    const rows = [];
    const TOLERANCE = 3;
    items.forEach((it) => {
      let row = rows.find((r) => Math.abs(r.y - it.y) <= TOLERANCE);
      if (!row) {
        row = { y: it.y, items: [] };
        rows.push(row);
      }
      row.items.push(it);
    });
    rows.forEach((row) => {
      row.items.sort((a, b) => a.x - b.x);
      const parts = [];
      let cur = "";
      let prevX1 = null;
      row.items.forEach((it) => {
        const gap = prevX1 !== null ? it.x - prevX1 : 0;
        const avgCharWidth = it.width / Math.max(it.text.length, 1);
        if (prevX1 !== null && gap > avgCharWidth * 1.5) {
          if (cur.trim()) parts.push(cur.trim());
          cur = it.text;
        } else {
          cur += it.text;
        }
        prevX1 = it.x + it.width;
      });
      if (cur.trim()) parts.push(cur.trim());
      const line = parts.join("\t");
      if (line) lines.push(line);
    });
    if (pageNum < pdf.numPages) lines.push("");
  }
  return lines.join("\n");
}
function parseCsv(text, delimiter = ",") {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === delimiter) {
        row.push(field);
        field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        field = "";
        if (row.length > 1 || row[0] !== "") rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return { headers: [], records: [] };
  const headers = rows[0].map((h) => h.trim());
  const records = rows.slice(1).map((r) => {
    const rec = {};
    headers.forEach((h, idx) => rec[h] = (r[idx] ?? "").trim());
    return rec;
  });
  return { headers, records };
}
/** Emails often paste as "greeting text" + the actual Excel table (as
 *  tab-separated rows) + "closing text / address block", all mixed
 *  together. Detecting the paste format on the RAW text (including that
 *  prose) badly confuses the table-vs-line-vs-pairs heuristic, since the
 *  prose lines dilute the match ratio. This finds the contiguous block of
 *  delimited-looking lines and returns just that, discarding the prose
 *  before and after it. If no clear tabular block is found, the original
 *  text is returned unchanged (so single-column pastes etc. still work).
 */
function extractTabularBlock(text) {
  const lines = text.split(/\r?\n/);
  const isDelimited = (l) => l.includes("\t") || (l.match(/,/g) || []).length >= 1;
  const start = lines.findIndex(isDelimited);
  if (start === -1) return text;
  let end = start;
  while (end < lines.length && (isDelimited(lines[end]) || lines[end].trim() === "")) end++;
  while (end > start && lines[end - 1].trim() === "") end--;
  return lines.slice(start, end).join("\n");
}
function parseDelimited(text) {
  const cleaned = extractTabularBlock(text);
  const firstLine = cleaned.split(/\r?\n/, 1)[0] || "";
  const delimiter = firstLine.includes("	") ? "	" : ",";
  return parseCsv(cleaned, delimiter);
}
function parseAlternatingLines(text, headerLabels = []) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l !== "");
  let start = 0;
  while (start < lines.length && headerLabels.some((h) => lines[start] === h)) start++;
  const rest = lines.slice(start);
  const pairs = [];
  for (let i = 0; i < rest.length; i += 2) {
    pairs.push({ name: rest[i] || "", value: rest[i + 1] || "" });
  }
  return pairs;
}
const NAME_QTY_LINE_RE = /^(.+?)[ \t\u3000:：]*(\d+)[^\d]*$/;
function parseNameQtyLines(text, headerLabels = []) {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l !== "");
  const results = [];
  for (const line of lines) {
    if (headerLabels.includes(line)) continue;
    const m = line.match(NAME_QTY_LINE_RE);
    if (m) results.push({ name: m[1].trim(), value: m[2] });
  }
  return results;
}
function normalizeForMatch(str) {
  return toHiragana(String(str || "")).replace(/[Ａ-Ｚａ-ｚ０-９]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 65248)).replace(/[\s\u3000]+/g, "").toLowerCase();
}
function matchProductByName(rawName, products) {
  const trimmed = (rawName || "").trim();
  if (!trimmed) return null;
  const exact = products.find((p) => p.name.trim() === trimmed);
  if (exact) return exact;
  const containing = products.filter((p) => p.name.trim().length >= 2 && trimmed.includes(p.name.trim())).sort((a, b) => b.name.length - a.name.length);
  if (containing[0]) return containing[0];
  const hiraTrimmed = toHiragana(trimmed);
  const kanaExact = products.find((p) => toHiragana(p.name.trim()) === hiraTrimmed);
  if (kanaExact) return kanaExact;
  const kanaContaining = products.filter((p) => p.name.trim().length >= 2 && hiraTrimmed.includes(toHiragana(p.name.trim()))).sort((a, b) => b.name.length - a.name.length);
  if (kanaContaining[0]) return kanaContaining[0];
  const normTrimmed = normalizeForMatch(trimmed);
  const normExact = products.find((p) => normalizeForMatch(p.name) === normTrimmed);
  if (normExact) return normExact;
  const normContaining = products.filter((p) => p.name.trim().length >= 2 && normTrimmed.includes(normalizeForMatch(p.name))).sort((a, b) => b.name.length - a.name.length);
  return normContaining[0] || null;
}
const STORAGE_KEYS = { masters: "zk-inv:masters", transactions: "zk-inv:transactions", settings: "zk-inv:settings", misc: "zk-inv:misc", shipDocs: "zk-inv:shipdocs", coverLetters: "zk-inv:coverletters", customFaq: "zk-inv:customfaq", faqOverrides: "zk-inv:faqoverrides" };
let opChain = Promise.resolve();
function queuedOp(fn) {
  const p = opChain.then(() => new Promise((r) => setTimeout(r, 120))).then(fn);
  opChain = p.then(() => {
  }, () => {
  });
  return p;
}
function describeError(opName, key, e) {
  return { op: opName, key, name: e?.name ?? String(e), message: e?.message ?? "", stack: e?.stack ?? "(no stack)" };
}
async function instrumented(opName, key, fn) {
  try {
    return await fn();
  } catch (e) {
    try {
      e.__diag = describeError(opName, key, e);
    } catch {
    }
    throw e;
  }
}
const LS_PREFIX = "zk-inv-ls:";
function hasClaudeStorage() {
  return typeof window !== "undefined" && typeof window.storage?.get === "function" && typeof window.storage?.set === "function" && typeof window.storage?.list === "function";
}
const STORAGE_TIMEOUT_MS = 2e4;
function withTimeout(promise, opName, key) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      const e = new Error(`${opName}\u304C${STORAGE_TIMEOUT_MS / 1e3}\u79D2\u4EE5\u5185\u306B\u5FDC\u7B54\u3057\u307E\u305B\u3093\u3067\u3057\u305F(\u30BF\u30A4\u30E0\u30A2\u30A6\u30C8)`);
      e.name = "TimeoutError";
      e.__diag = describeError(opName, key, e);
      reject(e);
    }, STORAGE_TIMEOUT_MS);
    promise.then((v) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(v);
    }, (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      reject(err);
    });
  });
}
const rawGet = (key) => queuedOp(() => instrumented("rawGet", key, () => {
  if (hasClaudeStorage()) return withTimeout(window.storage.get(key, true), "rawGet", key);
  const v = localStorage.getItem(LS_PREFIX + key);
  return Promise.resolve(v === null ? null : { key, value: v, shared: true });
}));
const rawSet = (key, json) => queuedOp(() => instrumented("rawSet", key, () => {
  if (hasClaudeStorage()) return withTimeout(window.storage.set(key, json, true), "rawSet", key);
  localStorage.setItem(LS_PREFIX + key, json);
  return Promise.resolve({ key, value: json, shared: true });
}));
const rawList = (prefix) => queuedOp(() => instrumented("rawList", prefix, () => {
  if (hasClaudeStorage()) return withTimeout(window.storage.list(prefix, true), "rawList", prefix);
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(LS_PREFIX)) {
      const bare = k.slice(LS_PREFIX.length);
      if (!prefix || bare.startsWith(prefix)) keys.push(bare);
    }
  }
  return Promise.resolve({ keys, prefix, shared: true });
}));
const blockedKeys = /* @__PURE__ */ new Set();
const blockedListeners = /* @__PURE__ */ new Set();
function setKeyBlocked(key, blocked) {
  if (blocked) blockedKeys.add(key);
  else blockedKeys.delete(key);
  for (const fn of blockedListeners) fn(blockedKeys.size > 0);
}
async function storageGetChecked(key, attempt = 0, _lastGetErr = null, _lastListErr = null) {
  const MAX = 4;
  try {
    const res = await rawGet(key);
    return { ok: true, value: res ? JSON.parse(res.value) : void 0 };
  } catch (e) {
    const getErr = e.__diag || describeError("rawGet", key, e);
    let exists = null;
    let listErr = null;
    try {
      const l = await rawList(key);
      exists = Array.isArray(l?.keys) ? l.keys.includes(key) : null;
    } catch (e2) {
      exists = null;
      listErr = e2.__diag || describeError("rawList", key, e2);
    }
    if (exists === false) return { ok: true, value: void 0 };
    if (attempt < MAX) {
      await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
      return storageGetChecked(key, attempt + 1, getErr, listErr);
    }
    return { ok: false, getError: getErr, listError: listErr };
  }
}
const saveFailListeners = /* @__PURE__ */ new Set();
let saveFailingCount = 0;
function setSaveFailing(delta) {
  saveFailingCount = Math.max(0, saveFailingCount + delta);
  for (const fn of saveFailListeners) fn(saveFailingCount > 0);
}
async function storageSet(key, value, attempt = 0) {
  if (blockedKeys.has(key)) {
    logDiag("save", key, false, Array.isArray(value) ? value.length : void 0, { op: "blocked", key, name: "Blocked", message: "\u3053\u306E\u7AEF\u672B\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u3067\u306F\u8AAD\u307F\u8FBC\u307F\u3092\u78BA\u8A8D\u3067\u304D\u306A\u304B\u3063\u305F\u305F\u3081\u3001\u4FDD\u5B58\u3092\u30D6\u30ED\u30C3\u30AF\u3057\u3066\u3044\u307E\u3059\u3002", stack: "" });
    return false;
  }
  const MAX_ATTEMPTS = 8;
  try {
    await rawSet(key, JSON.stringify(value));
    logDiag("save", key, true, Array.isArray(value) ? value.length : void 0);
    if (attempt > 0) setSaveFailing(-1);
    return true;
  } catch (e) {
    if (attempt === 0) setSaveFailing(1);
    if (attempt < MAX_ATTEMPTS) {
      const delay = Math.min(500 * 2 ** attempt, 6e3);
      await new Promise((r) => setTimeout(r, delay));
      return storageSet(key, value, attempt + 1);
    }
    console.error("storage set failed after retries", key, e);
    logDiag("save", key, false, Array.isArray(value) ? value.length : void 0, e.__diag || describeError("rawSet", key, e));
    setSaveFailing(-1);
    return false;
  }
}
function SaveFailingBanner() {
  const [failing, setFailing] = useState(false);
  useEffect(() => {
    const fn = (v) => setFailing(v);
    saveFailListeners.add(fn);
    return () => saveFailListeners.delete(fn);
  }, []);
  if (!failing) return null;
  return <div className="fixed top-0 left-0 right-0 text-center text-sm font-medium py-2 px-3" style={{ background: "var(--danger)", color: "white", zIndex: 999999 }}>
      ⚠
      保存に失敗し、再試行中です。このまま少し待ってから操作してください(閉じないでください)
    </div>;
}
function LoadBlockedBanner() {
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const fn = (v) => setBlocked(v);
    blockedListeners.add(fn);
    fn(blockedKeys.size > 0);
    return () => blockedListeners.delete(fn);
  }, []);
  if (!blocked) return null;
  return <div className="fixed top-0 left-0 right-0 text-center text-sm font-medium py-2 px-3" style={{ background: "var(--danger)", color: "white", zIndex: 999999 }}>
      ⚠
      データを読み込めませんでした。保存を停止しています。ここで登録しても保存されません。一度閉じて、開き直してください。
    </div>;
}
const DIAG_LOG = [];
const diagListeners = /* @__PURE__ */ new Set();
let diagSeq = 0;
function logDiag(kind, key, ok, count, errorInfo) {
  const now = /* @__PURE__ */ new Date();
  const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  DIAG_LOG.push({ id: diagSeq++, t, kind, key: (key || "").replace("zk-inv:", ""), ok, count, error: errorInfo || null });
  if (DIAG_LOG.length > 30) DIAG_LOG.shift();
  for (const fn of diagListeners) fn();
}
const pendingFlushers = /* @__PURE__ */ new Set();
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      for (const flush of pendingFlushers) flush();
    }
  });
  window.addEventListener("pagehide", () => {
    for (const flush of pendingFlushers) flush();
  });
}
async function migrateMiscFromLegacyKeys() {
  const [adj, mc, inv] = await Promise.all([storageGetChecked("zk-inv:adjustments"), storageGetChecked("zk-inv:monthlychecks"), storageGetChecked("zk-inv:invoices")]);
  return { adjustments: adj.ok && adj.value || [], monthlyChecks: mc.ok && mc.value || [], invoices: inv.ok && inv.value || [] };
}
async function migrateShipDocsFromLegacyKeys() {
  const [ship, dn] = await Promise.all([storageGetChecked("zk-inv:shippingrequests"), storageGetChecked("zk-inv:deliverynotes")]);
  return { shippingRequests: ship.ok && ship.value || [], deliveryNotes: dn.ok && dn.value || [] };
}
function usePersistentState(key, initialValue, migrate) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const debounceRef = useRef(null);
  const pendingWriteRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await storageGetChecked(key);
      if (cancelled) return;
      if (result.ok) {
        let v = result.value;
        if (v === void 0) {
          v = migrate ? await migrate() : initialValue;
          if (migrate) storageSet(key, v);
        }
        setKeyBlocked(key, false);
        logDiag("load", key, true, Array.isArray(v) ? v.length : void 0);
        setValue(v);
      } else {
        setKeyBlocked(key, true);
        logDiag("load", key, false, void 0, { get: result.getError, list: result.listError });
        setValue(initialValue);
      }
      setLoaded(true);
    })();
    return () => {
      cancelled = true;
    };
    // keyが変わった時だけマウント時ロードする設計。migrate/initialValueを依存に入れると
    // 再レンダーごとに再実行され、編集直後の値が古い読み込み結果で上書きされるリスクがあるため意図的に外している。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => {
    const flush = () => {
      if (pendingWriteRef.current) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        const { key: k, next } = pendingWriteRef.current;
        pendingWriteRef.current = null;
        storageSet(k, next);
      }
    };
    pendingFlushers.add(flush);
    return () => {
      flush();
      pendingFlushers.delete(flush);
    };
  }, []);
  const update = useCallback((updater) => {
    setValue((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      setSyncing(true);
      pendingWriteRef.current = { key, next };
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        pendingWriteRef.current = null;
        await storageSet(key, next);
        setSyncing(false);
      }, 350);
      return next;
    });
  }, [key]);
  const appendSafe = useCallback(async (newItems) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pendingWriteRef.current = null;
    setSyncing(true);
    // Merge directly into our local state rather than re-fetching the
    // latest value from storage first — this halves the number of storage
    // round-trips per save (was: get-latest, then set; now: just set).
    // Trade-off: if another session saves to this same key at nearly the
    // same instant, one of the two additions could be lost. Accepted as
    // low-risk since concurrent edits to the same key are rare in practice
    // (different consignees/transactions are usually registered separately).
    const merged = Array.isArray(value) ? [...value, ...newItems] : newItems;
    setValue(merged);
    try {
      return await storageSet(key, merged);
    } finally {
      setSyncing(false);
    }
  }, [key, value]);
  return [value, update, loaded, syncing, appendSafe];
}
function computeInventory(transactions, products, _consignees) {
  const inv = {};
  for (const p of products) inv[p.id] = { __total: 0 };
  const bump = (productId, locationId, delta) => {
    if (!inv[productId]) inv[productId] = { __total: 0 };
    inv[productId][locationId] = (inv[productId][locationId] || 0) + delta;
    inv[productId].__total += delta;
  };
  const sorted = [...transactions].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  for (const tx of sorted) {
    const type = TX_TYPE_MAP[tx.type];
    if (!type || !tx.productId) continue;
    const qty = Number(tx.qty) || 0;
    if (type.sign === "in") {
      if (tx.toLocation) bump(tx.productId, tx.toLocation, qty);
    } else if (type.sign === "out") {
      if (tx.fromLocation) bump(tx.productId, tx.fromLocation, -qty);
    } else if (type.sign === "move") {
      if (tx.fromLocation) bump(tx.productId, tx.fromLocation, -qty);
      if (tx.toLocation) bump(tx.productId, tx.toLocation, qty);
    } else if (type.sign === "adjust") {
      const dir = tx.adjustDirection === "decrease" ? -1 : 1;
      if (tx.toLocation) bump(tx.productId, tx.toLocation, Math.abs(qty) * dir);
    }
  }
  return inv;
}
function computeStockAlerts(inventory, products, consignees, alertLocationIds) {
  const zero = [];
  const low = [];
  for (const p of products) {
    if (p.status !== "\u53D6\u6271\u4E2D" && p.status !== "\u53D6\u6271\u4E0D\u53EF") continue;
    const qty = alertTargetQty(inventory, p.id, consignees, alertLocationIds);
    if (qty <= 0) zero.push({ product: p, total: qty });
    else if (qty <= (Number(p.reorderPoint) || 0)) low.push({ product: p, total: qty });
  }
  zero.sort((a, b) => a.product.name.localeCompare(b.product.name, "ja"));
  low.sort((a, b) => a.total - b.total);
  return { zero, low };
}
function computeSalesEstimate(consignees, transactions, month, adjustments) {
  const adjByKey = Object.fromEntries(adjustments.map((a) => [`${a.consigneeId}:${a.month}`, Number(a.amount) || 0]));
  const rows = [];
  for (const c of consignees) {
    if (["\u81EA\u793E", "\u5009\u5EAB", "\u5185\u8077"].includes(c.contractType)) continue;
    const sales = transactions.filter((t) => isRevenueTx(t) && t.fromLocation === c.id && monthKey(t.date) === month);
    const cumulativeSales = sales.reduce((s, t) => s + (Number(t.amount) || 0), 0);
    const adjustment = adjByKey[`${c.id}:${month}`] || 0;
    if (cumulativeSales === 0 && adjustment === 0) continue;
    const estimatedPayout = cumulativeSales + adjustment;
    rows.push({ consignee: c, cumulativeSales, adjustment, estimatedPayout });
  }
  rows.sort((a, b) => b.estimatedPayout - a.estimatedPayout);
  return rows;
}
function computeSalesEstimateFiscalYearTotal(consignees, transactions, adjustments, fiscalYear) {
  const monthKeys = FISCAL_MONTHS.map((m) => `${m === 1 ? fiscalYear + 1 : fiscalYear}-${String(m).padStart(2, "0")}`);
  let total = 0;
  for (const mk of monthKeys) {
    const rows = computeSalesEstimate(consignees, transactions, mk, adjustments);
    total += rows.reduce((s, r) => s + r.estimatedPayout, 0);
  }
  return total;
}
function isRevenueTx(t) {
  return t.type === "\u59D4\u8A17" || t.type === "\u8CB7\u53D6" || t.type === "\u30A4\u30D9\u30F3\u30C8" || t.type === "EC";
}
function computeMonthlySales(transactions) {
  const byMonth = {};
  for (const t of transactions) {
    if (!isRevenueTx(t)) continue;
    const mk = monthKey(t.date);
    if (!mk) continue;
    byMonth[mk] = (byMonth[mk] || 0) + (Number(t.amount) || 0);
  }
  return byMonth;
}
function computeAnnualProductSales(transactions, products, year) {
  const byProduct = {};
  for (const t of transactions) {
    if (!isRevenueTx(t) || !t.date) continue;
    if (year !== "all" && fiscalYearOf(t.date) !== Number(year)) continue;
    const p = byProduct[t.productId] ||= { qty: 0, amount: 0 };
    p.qty += Number(t.qty) || 0;
    p.amount += Number(t.amount) || 0;
  }
  return products.map((p) => ({ product: p, qty: byProduct[p.id]?.qty || 0, amount: byProduct[p.id]?.amount || 0 })).filter((r) => r.qty > 0).sort((a, b) => b.qty - a.qty);
}
function computeAnnualConsigneeSales(transactions, consignees, year) {
  const byConsignee = {};
  for (const t of transactions) {
    if (!isRevenueTx(t) || !t.date) continue;
    if (year !== "all" && fiscalYearOf(t.date) !== Number(year)) continue;
    const c = byConsignee[t.fromLocation] ||= { qty: 0, amount: 0 };
    c.qty += Number(t.qty) || 0;
    c.amount += Number(t.amount) || 0;
  }
  return consignees.map((c) => ({ consignee: c, qty: byConsignee[c.id]?.qty || 0, amount: byConsignee[c.id]?.amount || 0 })).filter((r) => r.qty > 0).sort((a, b) => b.amount - a.amount);
}
function computeMonthlyProductSales(transactions, products, month) {
  const byProduct = {};
  for (const t of transactions) {
    if (!isRevenueTx(t) || !t.date) continue;
    if (monthKey(t.date) !== month) continue;
    const p = byProduct[t.productId] ||= { qty: 0, amount: 0 };
    p.qty += Number(t.qty) || 0;
    p.amount += Number(t.amount) || 0;
  }
  return products.map((p) => ({ product: p, qty: byProduct[p.id]?.qty || 0, amount: byProduct[p.id]?.amount || 0 })).filter((r) => r.qty > 0).sort((a, b) => b.qty - a.qty);
}
function computeMonthlyConsigneeSales(transactions, consignees, month) {
  const byConsignee = {};
  for (const t of transactions) {
    if (!isRevenueTx(t) || !t.date) continue;
    if (monthKey(t.date) !== month) continue;
    const c = byConsignee[t.fromLocation] ||= { qty: 0, amount: 0 };
    c.qty += Number(t.qty) || 0;
    c.amount += Number(t.amount) || 0;
  }
  return consignees.map((c) => ({ consignee: c, qty: byConsignee[c.id]?.qty || 0, amount: byConsignee[c.id]?.amount || 0 })).filter((r) => r.qty > 0).sort((a, b) => b.amount - a.amount);
}
function computeEventSales(transactions) {
  const byEvent = {};
  for (const t of transactions) {
    if (t.type !== "\u30A4\u30D9\u30F3\u30C8" || !t.date) continue;
    const name = t.eventName || "(\u30A4\u30D9\u30F3\u30C8\u540D\u672A\u8A2D\u5B9A)";
    const e = byEvent[name] ||= { qty: 0, amount: 0, firstDate: t.date, lastDate: t.date };
    e.qty += Number(t.qty) || 0;
    e.amount += Number(t.amount) || 0;
    if (t.date < e.firstDate) e.firstDate = t.date;
    if (t.date > e.lastDate) e.lastDate = t.date;
  }
  return Object.entries(byEvent).map(([name, v]) => ({ name, ...v })).sort((a, b) => (b.lastDate || "").localeCompare(a.lastDate || ""));
}
const FISCAL_MONTHS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];
function fiscalYearOf(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return m === 1 ? y - 1 : y;
}
function computeConsigneeMonthlyTotals(consignee, transactions, fiscalYear) {
  const monthKeys = FISCAL_MONTHS.map((m) => `${m === 1 ? fiscalYear + 1 : fiscalYear}-${String(m).padStart(2, "0")}`);
  const sales = transactions.filter((t) => isRevenueTx(t) && t.fromLocation === consignee.id);
  return FISCAL_MONTHS.map((m, i) => {
    const monthSales = sales.filter((t) => monthKey(t.date) === monthKeys[i]);
    return { month: monthKeys[i], label: `${m}\u6708`, qty: monthSales.reduce((s, t) => s + (Number(t.qty) || 0), 0), amount: monthSales.reduce((s, t) => s + (Number(t.amount) || 0), 0) };
  });
}
function computeConsigneeMonthlyPivot(consignee, transactions, products, fiscalYear) {
  const currentFeeRate = Number(consignee.feeRate) || 0;
  const grossOf = (t) => {
    const fr = t.feeRateAtEntry !== void 0 && t.feeRateAtEntry !== null ? Number(t.feeRateAtEntry) : currentFeeRate;
    const net = Number(t.amount) || 0;
    return fr < 1 ? net / (1 - fr) : net;
  };
  const monthKeys = FISCAL_MONTHS.map((m) => `${m === 1 ? fiscalYear + 1 : fiscalYear}-${String(m).padStart(2, "0")}`);
  const sales = transactions.filter((t) => isRevenueTx(t) && t.fromLocation === consignee.id);
  return products.map((p) => {
    const row = { シリーズ: p.genre || "", \u54C1\u540D: p.name, \u58F2\u4FA1: p.price };
    let totalQty = 0;
    let totalNetAmount = 0;
    let totalGrossAmount = 0;
    FISCAL_MONTHS.forEach((m, i) => {
      const monthSales = sales.filter((t) => t.productId === p.id && monthKey(t.date) === monthKeys[i]);
      const qty = monthSales.reduce((s, t) => s + (Number(t.qty) || 0), 0);
      row[`${m}\u6708`] = qty;
      totalQty += qty;
      totalNetAmount += monthSales.reduce((s, t) => s + (Number(t.amount) || 0), 0);
      totalGrossAmount += monthSales.reduce((s, t) => s + grossOf(t), 0);
    });
    const grossAmount = Math.round(totalGrossAmount);
    row["\u8CA9\u58F2\u6570\u5408\u8A08"] = totalQty;
    row["\u58F2\u4E0A\u5408\u8A08"] = grossAmount;
    row["\u624B\u6570\u6599"] = grossAmount - totalNetAmount;
    return row;
  });
}
const GLOBAL_STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans+JP:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

input[type="date"], input[type="month"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2.75rem !important;
  min-height: 0 !important;
  max-height: 2.75rem !important;
  line-height: 2.75rem !important;
  box-sizing: border-box !important;
  padding: 0 0.75rem !important;
  font-size: 16px !important;
  font-family: inherit !important;
  width: 100% !important;
  max-width: 100% !important;
  display: block !important;
  vertical-align: middle !important;
}

@media (min-width: 640px) {
  input[type="date"], input[type="month"] {
    max-width: 12rem !important;
  }
}

/* iOS Safari (and WebViews built on it) automatically zooms the whole page
   in when a focused form field has a computed font-size under 16px, and
   does not always zoom back out when the field loses focus or a modal
   closes — this is what was causing the page to appear "zoomed in, cut off
   at the sides" after using the registration form. Forcing every text
   input to render at 16px+ prevents the browser from ever triggering that
   zoom in the first place. */
input, select, textarea {
  font-size: 16px !important;
}

/* Table headers are short labels (日付, 状態, etc.) that should never wrap —
   on narrow mobile screens they were wrapping character-by-character
   instead of relying on the table's existing horizontal scroll. */
th {
  white-space: nowrap;
}

.zk-root {
  --ink: #2E2621;
  --ink-2: #3D332C;
  --ink-soft: #4A3F37;
  --paper: #F2ECE0;
  --card: #FFFFFF;
  --accent: #BF8B34;
  --accent-soft: #F0DFB8;
  --accent2: #5B6E78;
  --danger: #B8412A;
  --danger-soft: #F5DCD3;
  --success: #3F7D5C;
  --success-soft: #DCEAE1;
  --text: #241F1B;
  --text-muted: #6C6058;
  --border: #DED2BE;
  font-family: 'IBM Plex Sans JP', system-ui, sans-serif;
  color: var(--text);
  background: var(--paper);
  min-height: 100vh;
}
.zk-root .font-display { font-family: 'Fraunces', serif; }
.zk-root .font-mono { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; }
table, th, td {
  box-sizing: border-box;
}
.zk-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
.zk-scrollbar::-webkit-scrollbar-thumb { background: var(--ink-soft); border-radius: 4px; }
.zk-hide-scrollbar::-webkit-scrollbar { display: none; }
.zk-hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
.zk-tab-active { position: relative; }
.zk-tab-active::before {
  content: "";
  position: absolute; left: 0; top: 8px; bottom: 8px; width: 3px;
  background: var(--accent); border-radius: 0 3px 3px 0;
}
.zk-stamp {
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 999px; font-weight: 700; font-size: 11px;
}
@keyframes zk-pulse { 0%,100%{ opacity: 1;} 50%{ opacity: .55; } }
.zk-pulse { animation: zk-pulse 1.8s ease-in-out infinite; }
@media print {
  body * { visibility: hidden; }
  .zk-print-doc, .zk-print-doc * { visibility: visible; }
  .zk-print-doc { position: absolute; top: 0; left: 0; width: 100%; }
  .zk-no-print { display: none !important; }
}
`;
function useInjectStyle(css) {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [css]);
}
function Card({ children, className = "", style }) {
  return <div className={`rounded-lg border ${className}`} style={{ background: "var(--card)", borderColor: "var(--border)", ...style }}>
      {children}
    </div>;
}
function SectionTitle({ eyebrow, title, action }) {
  return <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
      <div>
        {eyebrow && <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: "var(--accent2)" }}>
            {eyebrow}
          </div>}
        <h2 className="font-display text-2xl font-semibold" style={{ color: "var(--ink)" }}>
          {title}
        </h2>
      </div>
      {action}
    </div>;
}
function Button({ children, onClick, variant = "primary", size = "md", icon: Icon, disabled, type = "button", className = "", style }) {
  const sizes = { sm: "px-2.5 py-1.5 text-xs", md: "px-3.5 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
  const base = "inline-flex items-center gap-1.5 rounded-md font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = { primary: { background: "var(--ink)", color: "white" }, accent: { background: "var(--accent)", color: "white" }, success: { background: "var(--success-soft)", color: "var(--success)", border: "1px solid var(--success)" }, danger: { background: "var(--danger)", color: "white" }, ghost: { background: "transparent", color: "var(--ink)", border: "1px solid var(--border)" }, subtle: { background: "var(--paper)", color: "var(--text)" } };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${className}`} style={{ ...variants[variant], ...style }}>
      {Icon && <Icon size={size === "sm" ? 14 : 16} />}
      {children}
    </button>;
}
function Badge({ children, tone = "default" }) {
  const tones = { default: { background: "var(--paper)", color: "var(--text-muted)", border: "1px solid var(--border)" }, success: { background: "var(--success-soft)", color: "var(--success)" }, danger: { background: "var(--danger-soft)", color: "var(--danger)" }, accent: { background: "var(--accent-soft)", color: "#8A5E10" }, info: { background: "#E2E7E8", color: "var(--accent2)" } };
  return <span className="zk-stamp px-2 py-0.5 whitespace-nowrap" style={tones[tone]}>
      {children}
    </span>;
}
function Input({ label, className = "", ...props }) {
  return <label className="block text-sm">
      {label && <div className="mb-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </div>}
      <input {...props} className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${className}`} style={{ borderColor: "var(--border)", background: "white" }} />
    </label>;
}
function Select({ label, children, className = "", ...props }) {
  return <label className="block text-sm">
      {label && <div className="mb-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </div>}
      <select {...props} className={`w-full rounded-md border px-3 py-2 text-sm outline-none bg-white ${className}`} style={{ borderColor: "var(--border)" }}>
        {children}
      </select>
    </label>;
}
/** Month picker with prev/next arrows (calendar-based, works even for months
 *  with no data) plus a dropdown for jumping straight to any month that has
 *  data — avoids needing to scroll a growing flat list every time. */
function MonthNav({ month, setMonth, monthsAvailable }) {
  const [y, m] = month.split("-");
  const years = useMemo(() => {
    const s = new Set(monthsAvailable.map((mm) => mm.slice(0, 4)));
    s.add(y);
    return Array.from(s).sort((a, b) => b.localeCompare(a));
  }, [monthsAvailable, y]);
  return <div className="flex items-center gap-1 flex-wrap">
      <button type="button" onClick={() => setMonth(shiftMonth(month, -1))} className="p-2 rounded-md border hover:bg-black/5" style={{ borderColor: "var(--border)" }} title="前月">
        <ChevronLeft size={16} />
      </button>
      <select value={y} onChange={(e) => setMonth(`${e.target.value}-${m}`)} className="rounded-md border px-2 py-2 text-sm outline-none bg-white" style={{ borderColor: "var(--border)" }}>
        {years.map((yy) => <option key={yy} value={yy}>
            {yy}年
          </option>)}
      </select>
      <select value={m} onChange={(e) => setMonth(`${y}-${e.target.value}`)} className="rounded-md border px-2 py-2 text-sm outline-none bg-white" style={{ borderColor: "var(--border)" }}>
        {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((mm) => <option key={mm} value={mm}>
            {Number(mm)}月
          </option>)}
      </select>
      <button type="button" onClick={() => setMonth(shiftMonth(month, 1))} className="p-2 rounded-md border hover:bg-black/5" style={{ borderColor: "var(--border)" }} title="次月">
        <ChevronRight size={16} />
      </button>
    </div>;
}
function Combobox({ label, options, value, onChange, placeholder = "\u5165\u529B\u3057\u3066\u691C\u7D22\u2026", required, disabled }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const selected = options.find((o) => o.value === value) || null;
  useEffect(() => {
    if (!open) setQuery(selected ? selected.label : "");
  }, [selected, open]);
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery(selected ? selected.label : "");
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [selected]);
  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q || selected && q.toLowerCase() === selected.label.toLowerCase()) return options;
    return options.filter((o) => kanaMatch(o.label, q) || kanaMatch(o.sublabel || "", q));
  }, [query, options, selected]);
  const pick = (opt) => {
    onChange(opt.value);
    setQuery(opt.label);
    setOpen(false);
  };
  const onKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlight]) pick(filtered[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(selected ? selected.label : "");
    }
  };
  return <div className="block text-sm relative" ref={wrapRef}>
      {label && <div className="mb-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </div>}
      <div className="relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-muted)" }} />
        <input ref={inputRef} value={disabled ? "" : query} placeholder={disabled ? "(\u4E0D\u8981)" : placeholder} required={required} disabled={disabled} onFocus={() => {
    setOpen(true);
    setHighlight(0);
  }} onChange={(e) => {
    setQuery(e.target.value);
    setOpen(true);
    setHighlight(0);
    if (!e.target.value) onChange("");
  }} onKeyDown={onKeyDown} className="w-full rounded-md border pl-7 pr-7 py-2 text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed" style={{ borderColor: "var(--border)", background: disabled ? "var(--paper)" : "white" }} />
        {selected && !disabled && <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-black/5" onClick={() => {
    onChange("");
    setQuery("");
    inputRef.current?.focus();
    setOpen(true);
  }}>
            <X size={13} style={{ color: "var(--text-muted)" }} />
          </button>}
      </div>
      {open && <div className="absolute z-20 mt-1 w-full rounded-md border shadow-lg overflow-y-auto zk-scrollbar" style={{ borderColor: "var(--border)", background: "white", maxHeight: 240 }}>
          {filtered.length === 0 ? <div className="px-3 py-2 text-sm" style={{ color: "var(--text-muted)" }}>
              該当する項目がありません
            </div> : filtered.map((o, i) => <button type="button" key={o.value} onMouseDown={(e) => {
    e.preventDefault();
    pick(o);
  }} onMouseEnter={() => setHighlight(i)} className="w-full text-left px-3 py-2 text-sm flex items-center justify-between gap-2" style={{ background: i === highlight ? "var(--paper)" : "transparent" }}>
                <span className="truncate">{o.label}</span>
                {o.sublabel && <span className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>
                    {o.sublabel}
                  </span>}
              </button>)}
        </div>}
    </div>;
}
function Modal({ open, onClose, title, children, wide, footer }) {
  useLayoutEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const body = document.body;
    const prev = { position: body.style.position, top: body.style.top, width: body.style.width };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(18,38,42,0.45)" }}>
      <div className={`w-full ${wide ? "max-w-2xl" : "max-w-md"} flex flex-col rounded-xl shadow-2xl`} style={{ background: "var(--card)", maxHeight: "85vh" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>
            {title}
          </h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-black/5">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto zk-scrollbar" style={{ flex: "1 1 auto", minHeight: 0 }}>
          {children}
        </div>
        {footer && <div className="px-5 py-4 border-t shrink-0 flex justify-end gap-2" style={{ borderColor: "var(--border)" }}>
            {footer}
          </div>}
      </div>
    </div>;
}
function EmptyState({ icon: Icon, title, description }) {
  return <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="p-3 rounded-full mb-3" style={{ background: "var(--paper)" }}>
        <Icon size={26} style={{ color: "var(--text-muted)" }} />
      </div>
      <div className="font-medium mb-1" style={{ color: "var(--ink)" }}>
        {title}
      </div>
      {description && <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          {description}
        </div>}
    </div>;
}
/** Slices a (already filtered/sorted) list into pages. Resets to page 1
 *  whenever the list's length or identity changes (e.g. a search/filter
 *  was applied) so the person never lands on a blank out-of-range page. */
function usePagination(items, defaultPageSize = 50) {
  const [pageSize, setPageSizeRaw] = useState(defaultPageSize);
  const [page, setPage] = useState(1);
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  useEffect(() => {
    setPage(1);
  }, [totalCount, pageSize]);
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const pageItems = useMemo(() => items.slice((clampedPage - 1) * pageSize, clampedPage * pageSize), [items, clampedPage, pageSize]);
  const setPageSize = (n) => {
    setPageSizeRaw(n);
    setPage(1);
  };
  return { pageItems, page: clampedPage, setPage, pageSize, setPageSize, totalPages, totalCount };
}
function TopScrollSync({ thead, tbody, tableClassName, tableStyle, className = "" }) {
  const headRef = useRef(null);
  const barRef = useRef(null);
  const bodyRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const syncing = useRef(false);
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const update = () => setScrollWidth(el.scrollWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  });
  const syncFrom = (source) => (e) => {
    if (syncing.current) return;
    syncing.current = true;
    const left = e.target.scrollLeft;
    if (source !== "head" && headRef.current) headRef.current.scrollLeft = left;
    if (source !== "bar" && barRef.current) barRef.current.scrollLeft = left;
    if (source !== "body" && bodyRef.current) bodyRef.current.scrollLeft = left;
    syncing.current = false;
  };
  return <>
      <div ref={headRef} onScroll={syncFrom("head")} className="overflow-x-auto zk-hide-scrollbar">
        <table className={tableClassName} style={tableStyle}>
          {thead}
        </table>
      </div>
      <div ref={barRef} onScroll={syncFrom("bar")} className="overflow-x-auto zk-scrollbar" style={{ height: 14, background: "var(--paper)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} title="ここをドラッグすると表を横にスクロールできます">
        <div style={{ width: scrollWidth, height: 1 }} />
      </div>
      <div ref={bodyRef} onScroll={syncFrom("body")} className={`overflow-x-auto zk-scrollbar ${className}`}>
        <table className={tableClassName} style={tableStyle}>
          {tbody}
        </table>
      </div>
    </>;
}
function PaginationBar({ page, setPage, pageSize, setPageSize, totalPages, totalCount, pageSizeOptions = [30, 50, 100] }) {
  if (totalCount === 0) return null;
  const from = pageSize === Infinity ? 1 : (page - 1) * pageSize + 1;
  const to = pageSize === Infinity ? totalCount : Math.min(page * pageSize, totalCount);
  return <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm py-1">
      <div className="flex items-center gap-1.5">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          表示件数:
        </span>
        {pageSizeOptions.map((n) => <button key={n} type="button" onClick={() => setPageSize(n)} className="px-2 py-1 rounded-md text-xs font-medium" style={pageSize === n ? { background: "var(--accent-soft)", color: "var(--ink)" } : { color: "var(--text-muted)" }}>
            {n === Infinity ? "\u3059\u3079\u3066" : `${n}\u4EF6`}
          </button>)}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {totalCount}件中 {from}〜{to}件
        </span>
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="p-1.5 rounded-md border disabled:opacity-30" style={{ borderColor: "var(--border)" }}>
          <ChevronLeft size={14} />
        </button>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {page} / {totalPages}
        </span>
        <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="p-1.5 rounded-md border disabled:opacity-30" style={{ borderColor: "var(--border)" }}>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>;
}
function ConfirmBar({ message, onConfirm, onCancel, confirmLabel = "\u524A\u9664\u3059\u308B" }) {
  return <div className="flex flex-col gap-2 px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)" }}>
      <span className="text-sm" style={{ color: "var(--danger)" }}>
        {message}
      </span>
      <div className="flex gap-2 justify-end">
        <Button size="sm" variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <Button size="sm" variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>;
}
/** Like ConfirmBar, but for deleting a transaction that may have a linked
 *  shipping request and/or delivery note — offers deleting just the
 *  transaction, or the transaction plus everything linked to it. */
function ConfirmDeleteWithLinked({ linked, onConfirm, onCancel, baseMessage = "削除しますか？" }) {
  const hasLinked = linked.ship > 0 || linked.notes > 0 || linked.invoices > 0;
  if (!hasLinked) {
    return <ConfirmBar message={baseMessage} confirmLabel="はい" onConfirm={() => onConfirm(true)} onCancel={onCancel} />;
  }
  const parts = [];
  if (linked.ship > 0) parts.push(`発送依頼${linked.ship}件`);
  if (linked.notes > 0) parts.push(`納品書${linked.notes}件`);
  if (linked.invoices > 0) parts.push(`請求書${linked.invoices}件`);
  return <ConfirmBar message={`この取引には${parts.join("・")}が紐づいています。まとめて削除されますが、よろしいですか？`} confirmLabel="はい" onConfirm={() => onConfirm(true)} onCancel={onCancel} />;
}
function FilePasteRow({ onText, allowPdf }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (isPdf) {
      setBusy(true);
      try {
        const text = await extractPdfAsRows(file);
        onText((prev) => prev ? `${prev}\n${text}` : text);
      } catch {
        setError("PDF\u306E\u8AAD\u307F\u8FBC\u307F\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u78BA\u8A8D\u3059\u308B\u304B\u3001\u672C\u756A\u516C\u958B\u5F8C\u306E\u74B0\u5883\u3067\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002");
      }
      setBusy(false);
    } else {
      readTextFile(file, onText);
    }
  };
  return <div className="flex items-center gap-2 text-sm flex-wrap">
      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border cursor-pointer" style={{ borderColor: "var(--border)", background: "white", color: "var(--text)" }}>
        <UploadCloud size={14} />
        {busy ? "\u8AAD\u307F\u53D6\u308A\u4E2D..." : allowPdf ? "CSV\u30FBPDF\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E" : "CSV\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E"}
        <input type="file" accept={allowPdf ? ".csv,.tsv,text/csv,text/plain,.pdf,application/pdf" : ".csv,.tsv,text/csv,text/plain"} className="hidden" disabled={busy} onChange={(e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = "";
  }} />
      </label>
      <span style={{ color: "var(--text-muted)" }}>または下に直接貼り付け</span>
      {error && <span className="text-xs w-full" style={{ color: "var(--danger)" }}>
          {error}
        </span>}
    </div>;
}
function DebouncedNumberInput({ value, onCommit, className, style, placeholder }) {
  const [text, setText] = useState(String(value ?? ""));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setText(String(value ?? ""));
  }, [value, focused]);
  const commit = () => onCommit(text);
  return <input type="number" value={text} placeholder={placeholder} onFocus={() => setFocused(true)} onChange={(e) => setText(e.target.value)} onBlur={() => {
    setFocused(false);
    commit();
  }} onKeyDown={(e) => {
    if (e.key === "Enter") {
      commit();
      e.currentTarget.blur();
    }
  }} className={className} style={style} />;
}
function StatCard({ label, value, sub, tone = "default", icon: Icon }) {
  const toneColor = { default: "var(--ink)", danger: "var(--danger)", success: "var(--success)", accent: "var(--accent)" }[tone];
  return <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
        {Icon && <Icon size={16} style={{ color: toneColor }} />}
      </div>
      <div className="font-mono text-2xl font-semibold" style={{ color: toneColor }}>
        {value}
      </div>
      {sub && <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          {sub}
        </div>}
    </Card>;
}
const DASHBOARD_BANNER = "data:image/jpeg;base64,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";
function Dashboard({ products, consignees, transactions, inventory, alerts, monthlyChecks, shippingRequests, goTo, appsScriptUrl }) {
  const today = todayStr();
  const thisMonth = monthKey(today);
  const monthlySales = useMemo(() => computeMonthlySales(transactions), [transactions]);
  const thisMonthSales = monthlySales[thisMonth] || 0;
  const prevMonthKey = shiftMonth(thisMonth, -1);
  const prevMonthSales = monthlySales[prevMonthKey] || 0;
  const momChange = prevMonthSales ? ((thisMonthSales - prevMonthSales) / prevMonthSales * 100).toFixed(1) : null;
  const totalStockValue = products.reduce((s, p) => s + (inventory[p.id]?.__total || 0) * getCurrentCost(p), 0);
  const consigneeById = Object.fromEntries(consignees.map((c) => [c.id, c]));
  const pendingShippingCount = (shippingRequests || []).filter((r) => r.status !== "done").length;
  const [importActivity, setImportActivity] = useState(null);
  const [importActivityError, setImportActivityError] = useState("");
  useEffect(() => {
    if (!appsScriptUrl) return;
    let cancelled = false;
    fetch(appsScriptUrl).then((res) => res.json()).then((json) => {
      if (cancelled) return;
      if (json.status === "ok") {
        const rows = json.data.externalImports || [];
        const byConsignee = {};
        rows.forEach((r) => {
          const name = r["\u59D4\u8A17\u5148\u540D"] || "(\u4E0D\u660E)";
          const t = r["\u53D6\u8FBC\u65E5\u6642"] || "";
          if (!byConsignee[name] || t > byConsignee[name]) byConsignee[name] = t;
        });
        const list = Object.entries(byConsignee).map(([name, t]) => ({ name, t })).sort((a, b) => b.t.localeCompare(a.t)).slice(0, 5);
        setImportActivity(list);
      } else {
        setImportActivityError("\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F");
      }
    }).catch(() => {
      if (!cancelled) setImportActivityError("\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");
    });
    return () => {
      cancelled = true;
    };
  }, [appsScriptUrl]);
  const checkTargets = consignees.filter((c) => c.status === "\u7A3C\u50CD\u4E2D" && c.cadence !== "spot" && (c.contractType === "\u59D4\u8A17" || c.contractType === "\u8CB7\u53D6"));
  const pendingChecks = checkTargets.filter((c) => {
    const kind = c.contractType === "\u59D4\u8A17" ? "sales" : "invoice";
    return !monthlyChecks.some((m) => m.consigneeId === c.id && m.month === thisMonth && m.kind === kind && (m.state === "done" || m.state === "skip"));
  });
  return <div className="space-y-6">
      <div className="rounded-xl overflow-hidden shadow-sm" style={{ maxHeight: 220 }}>
        <img src={DASHBOARD_BANNER} alt="THE NAZO STORE" className="w-full h-full object-cover" style={{ maxHeight: 220, objectPosition: "center 40%" }} />
      </div>
      <SectionTitle eyebrow="Overview" title="ダッシュボード" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="今月の売上(税込)" value={formatYen(thisMonthSales)} icon={Wallet} sub={momChange !== null ? `\u524D\u6708\u6BD4 ${momChange > 0 ? "+" : ""}${momChange}%` : "\u524D\u6708\u30C7\u30FC\u30BF\u306A\u3057"} />
        <button type="button" onClick={() => goTo?.("valuation")} className="text-left block w-full h-full">
          <StatCard label="在庫評価額(原価ベース)" value={formatYen(totalStockValue)} icon={Boxes} sub="今日時点・タップで明細へ" />
        </button>
        <button type="button" onClick={() => goTo?.("shipping")} className="text-left block w-full h-full">
          <StatCard label="発送確認の残り" value={pendingShippingCount} tone={pendingShippingCount > 0 ? "accent" : void 0} icon={Truck} sub="未対応の発送依頼件数" />
        </button>
        <StatCard label="要対応アラート" value={alerts.zero.length + alerts.low.length + pendingChecks.length} tone="accent" icon={AlertTriangle} sub="在庫切れ・少数(対象拠点は設定で変更可)・月次チェック未対応の合計" />
      </div>

      {appsScriptUrl && <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw size={16} style={{ color: "var(--accent2)" }} />
            <span className="font-medium text-sm">委託先スプレッドシートの取込アクティビティ</span>
          </div>
          {importActivityError && <div className="text-xs" style={{ color: "var(--danger)" }}>
              {importActivityError}
            </div>}
          {!importActivityError && importActivity === null && <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              読み込み中…
            </div>}
          {!importActivityError && importActivity && importActivity.length === 0 && <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              まだ取込データがありません
            </div>}
          {!importActivityError && importActivity && importActivity.length > 0 && <ul className="space-y-1.5">
              {importActivity.map((a) => <li key={a.name} className="flex items-center justify-between text-sm">
                  <span>{a.name}のスプレッドシートを取り込みました</span>
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {a.t}
                  </span>
                </li>)}
            </ul>}
        </Card>}

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Boxes size={16} style={{ color: "var(--danger)" }} />
              <span className="font-medium text-sm">在庫ゼロ・少数商品</span>
            </div>
            <button className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={() => goTo("inventory")}>
              在庫状況へ
            </button>
          </div>
          {alerts.zero.length === 0 && alerts.low.length === 0 ? <div className="text-sm py-4 text-center" style={{ color: "var(--text-muted)" }}>
              取扱中商品の在庫は十分です
            </div> : <div className="space-y-2 max-h-64 overflow-y-auto zk-scrollbar pr-1">
              {alerts.zero.map((a) => <div key={a.product.id} className="flex items-center justify-between text-sm p-2 rounded-md" style={{ background: "var(--danger-soft)" }}>
                  <span className="font-medium truncate max-w-[55%]">
                    {a.product.name}
                  </span>
                  <Badge tone="danger">在庫ゼロ</Badge>
                </div>)}
              {alerts.low.map((a) => <div key={a.product.id} className="flex items-center justify-between text-sm p-2 rounded-md" style={{ background: "var(--accent-soft)" }}>
                  <span className="font-medium truncate max-w-[55%]">
                    {a.product.name}
                  </span>
                  <span className="font-mono text-xs">
                    残{a.total}(発注点{a.product.reorderPoint})
                  </span>
                  <Badge tone="accent">少数</Badge>
                </div>)}
            </div>}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={16} style={{ color: pendingChecks.length > 0 ? "var(--danger)" : "var(--success)" }} />
              <span className="font-medium text-sm">
                {thisMonth} 月次チェック
              </span>
            </div>
            <button className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={() => goTo("monthlyCheck")}>
              月次チェックへ
            </button>
          </div>
          {pendingChecks.length === 0 ? <div className="text-sm py-4 text-center" style={{ color: "var(--success)" }}>
              今月分は全て対応済みです ✓
            </div> : <div className="space-y-2 max-h-64 overflow-y-auto zk-scrollbar pr-1">
              {pendingChecks.map((c) => <div key={c.id} className="flex items-center justify-between text-sm p-2 rounded-md" style={{ background: "var(--accent-soft)" }}>
                  <span className="font-medium truncate max-w-[65%]">
                    {c.name}
                  </span>
                  <Badge tone="accent">
                    {c.contractType === "\u59D4\u8A17" ? "\u58F2\u4E0A\u672A\u5165\u529B" : "\u8ACB\u6C42\u672A\u78BA\u8A8D"}
                  </Badge>
                </div>)}
            </div>}
        </Card>
      </div>

      <Card className="p-4">
        <div className="font-medium text-sm mb-3">最近の取引(直近10件)</div>
        {transactions.length === 0 ? <EmptyState icon={ArrowLeftRight} title="まだ取引がありません" description="「取引記録」タブから入庫・販売などを記録しましょう" /> : <div className="overflow-x-auto zk-scrollbar">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left" style={{ color: "var(--text-muted)" }}>
                  <th className="py-1.5 pr-3 font-medium">日付</th>
                  <th className="py-1.5 pr-3 font-medium">種別</th>
                  <th className="py-1.5 pr-3 font-medium">商品</th>
                  <th className="py-1.5 pr-3 font-medium">場所</th>
                  <th className="py-1.5 pr-3 font-medium text-right">数量</th>
                  <th className="py-1.5 pr-3 font-medium text-right">金額</th>
                </tr>
              </thead>
              <tbody>
                {[...transactions].sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 10).map((t) => {
    const type = TX_TYPE_MAP[t.type] || UNKNOWN_TX_TYPE;
    const p = products.find((pp) => pp.id === t.productId);
    return <tr key={t.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="py-1.5 pr-3 font-mono text-xs">
                          {t.date}
                        </td>
                        <td className="py-1.5 pr-3">
                          <span className="inline-flex items-center gap-1">
                            {type && <type.icon size={13} style={{ color: type.color }} />}
                            {type?.shortLabel || t.type}
                          </span>
                        </td>
                        <td className="py-1.5 pr-3 truncate max-w-[160px]">
                          {p?.name || "-"}
                        </td>
                        <td className="py-1.5 pr-3 text-xs">
                          {consigneeById[t.fromLocation]?.name || "\u2014"} →{" "}
                          {consigneeById[t.toLocation]?.name || "\u2014"}
                        </td>
                        <td className="py-1.5 pr-3 text-right font-mono">
                          {formatNum(t.qty)}
                        </td>
                        <td className="py-1.5 pr-3 text-right font-mono">
                          {t.amount ? formatYen(t.amount) : "-"}
                        </td>
                      </tr>;
  })}
              </tbody>
            </table>
          </div>}
      </Card>
    </div>;
}
function useDeleteConfirm() {
  const [pendingId, setPendingId] = useState(null);
  return { pendingId, ask: (id) => setPendingId(id), cancel: () => setPendingId(null), isPending: (id) => pendingId === id };
}
function useDragReorder(setList, enabled = true) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);
  const rowProps = (index) => enabled ? { draggable: true, onDragStart: () => setDragIndex(index), onDragOver: (e) => {
    e.preventDefault();
    setOverIndex(index);
  }, onDragLeave: () => setOverIndex((o) => o === index ? null : o), onDrop: (e) => {
    e.preventDefault();
    setOverIndex(null);
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      return;
    }
    setList((prev) => {
      const arr = [...prev];
      const [moved] = arr.splice(dragIndex, 1);
      arr.splice(index, 0, moved);
      return arr;
    });
    setDragIndex(null);
  }, onDragEnd: () => {
    setDragIndex(null);
    setOverIndex(null);
  }, style: { opacity: dragIndex === index ? 0.4 : 1, borderTop: overIndex === index && dragIndex !== index ? "2px solid var(--accent)" : void 0, cursor: "grab" } } : {};
  return rowProps;
}
function useDragReorderById(setList, enabled = true) {
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);
  const rowProps = (id) => enabled ? { draggable: true, onDragStart: () => setDragId(id), onDragOver: (e) => {
    e.preventDefault();
    setOverId(id);
  }, onDragLeave: () => setOverId((o) => o === id ? null : o), onDrop: (e) => {
    e.preventDefault();
    setOverId(null);
    if (dragId === null || dragId === id) {
      setDragId(null);
      return;
    }
    setList((prev) => {
      const arr = [...prev];
      const fromIdx = arr.findIndex((x) => x.id === dragId);
      if (fromIdx < 0) return prev;
      const [moved] = arr.splice(fromIdx, 1);
      const toIdx = arr.findIndex((x) => x.id === id);
      arr.splice(toIdx < 0 ? arr.length : toIdx, 0, moved);
      return arr;
    });
    setDragId(null);
  }, onDragEnd: () => {
    setDragId(null);
    setOverId(null);
  }, style: { opacity: dragId === id ? 0.4 : 1, borderTop: overId === id && dragId !== id ? "2px solid var(--accent)" : void 0, cursor: "grab" } } : {};
  return rowProps;
}
const EMPTY_PRODUCT = { name: "", furigana: "", genre: "", jan: "", price: 0, cost: 0, costHistory: [], lot: "", status: "\u53D6\u6271\u4E2D", note: "", reorderPoint: 100 };
function getCostHistory(product) {
  if (product.costHistory && product.costHistory.length) return product.costHistory;
  if (product.cost) return [{ date: "2000-01-01", amount: Number(product.cost) || 0, note: "\u65E7\u30C7\u30FC\u30BF\u304B\u3089\u5F15\u7D99\u304E" }];
  return [];
}
function getCostAsOf(product, date) {
  const history = getCostHistory(product).filter((h) => h.date <= date).sort((a, b) => b.date.localeCompare(a.date) || b.amount - a.amount);
  return history.length ? Number(history[0].amount) || 0 : 0;
}
function getCurrentCost(product) {
  return getCostAsOf(product, todayStr());
}
function ProductForm({ initial, onSave, onCancel, existingGenres = [] }) {
  const [form, setForm] = useState(() => {
    const base = initial || EMPTY_PRODUCT;
    return { ...base, costHistory: getCostHistory(base) };
  });
  const [error, setError] = useState("");
  const [showGenreSuggest, setShowGenreSuggest] = useState(false);
  const [newCostDate, setNewCostDate] = useState(todayStr());
  const [newCostAmount, setNewCostAmount] = useState("");
  const [newCostNote, setNewCostNote] = useState("");
  const addCostEntry = () => {
    if (!newCostAmount) return;
    setForm((f) => ({ ...f, costHistory: [...(f.costHistory || []), { date: newCostDate, amount: Number(newCostAmount) || 0, note: newCostNote }].sort((a, b) => a.date.localeCompare(b.date)) }));
    setNewCostAmount("");
    setNewCostNote("");
  };
  const removeCostEntry = (idx) => setForm((f) => ({ ...f, costHistory: f.costHistory.filter((_, i) => i !== idx) }));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("\u5546\u54C1\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");
      return;
    }
    setError("");
    const currentCost = form.costHistory && form.costHistory.length ? getCurrentCost({ costHistory: form.costHistory }) : Number(form.cost) || 0;
    onSave({ ...form, cost: currentCost });
  };
  return <div className="space-y-6">
      {error && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
          {error}
        </div>}
      <Input label="商品名 *" value={form.name} onChange={set("name")} autoFocus />
      <Input label="フリガナ(ひらがな・検索用)" value={form.furigana || ""} onChange={set("furigana")} placeholder="例: きみょうなはつめいかのいえ" />
      <div className="relative">
        <Input label="シリーズ" value={form.genre} onChange={set("genre")} placeholder="例: たばこ謎" onFocus={() => setShowGenreSuggest(true)} onBlur={() => setTimeout(() => setShowGenreSuggest(false), 150)} autoComplete="off" />
        {showGenreSuggest && existingGenres.length > 0 && <div className="absolute left-0 right-0 mt-1 rounded-md overflow-hidden max-h-48 overflow-y-auto" style={{ zIndex: 60, background: "var(--card)", border: "2px solid var(--accent)", boxShadow: "0 6px 16px rgba(0,0,0,0.2)" }}>
            <div className="px-3 py-1.5 text-[11px] font-medium" style={{ background: "var(--accent-soft)", color: "var(--accent2)" }}>
              既存のシリーズから選ぶ({existingGenres.length}件)
            </div>
            {existingGenres.map((g) => <button key={g} type="button" className="block w-full text-left px-3 py-2 text-sm hover:bg-black/5 border-t" style={{ borderColor: "var(--border)" }} onMouseDown={(e) => {
        e.preventDefault();
        setForm((f) => ({ ...f, genre: g }));
        setShowGenreSuggest(false);
      }}>
                {g}
              </button>)}
          </div>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="JANコード" value={form.jan} onChange={set("jan")} />
        <Input label="上代(税込)" type="number" value={form.price} onChange={set("price")} />
      </div>
      <div>
        <div className="mb-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          原価(増刷などで変わるたびに記録します)
        </div>
        <div className="rounded-md border p-3 space-y-2" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              現在の原価(最新)
            </span>
            <span className="text-lg font-semibold">
              {formatYen(form.costHistory && form.costHistory.length ? getCurrentCost({ costHistory: form.costHistory }) : Number(form.cost) || 0)}
            </span>
          </div>
          {form.costHistory && form.costHistory.length > 0 && <div className="space-y-1">
              {[...form.costHistory].sort((a, b) => b.date.localeCompare(a.date)).map((h) => {
      const idx = form.costHistory.indexOf(h);
      return <div key={idx} className="flex items-center justify-between text-xs px-2 py-1 rounded" style={{ background: "var(--paper)" }}>
                    <span>
                      {h.date} ・ {formatYen(h.amount)}
                      {h.note && ` ・ ${h.note}`}
                    </span>
                    <button type="button" className="p-0.5 rounded hover:bg-black/10" onClick={() => removeCostEntry(idx)}>
                      <Trash2 size={12} style={{ color: "var(--danger)" }} />
                    </button>
                  </div>;
    })}
            </div>}
          <div className="flex items-end gap-2 pt-1 border-t" style={{ borderColor: "var(--border)" }}>
            <Input label="日付" type="date" value={newCostDate} onChange={(e) => setNewCostDate(e.target.value)} className="text-xs" />
            <Input label="金額" type="number" value={newCostAmount} onChange={(e) => setNewCostAmount(e.target.value)} className="text-xs" placeholder="例: 55.4" />
            <Input label="メモ(任意)" value={newCostNote} onChange={(e) => setNewCostNote(e.target.value)} className="text-xs" placeholder="例: 3刷" />
            <Button variant="ghost" size="sm" onClick={addCostEntry} disabled={!newCostAmount}>
              追加
            </Button>
          </div>
        </div>
      </div>
      <Input label="出荷ロット" value={form.lot} onChange={set("lot")} />
      <Input label="発注点(この数以下で警告)" type="number" value={form.reorderPoint} onChange={set("reorderPoint")} />
      <Select label="取扱状況" value={form.status} onChange={set("status")}>
        <option>取扱中</option>
        <option>取扱不可</option>
        <option>在庫なし</option>
        <option>販売終了</option>
      </Select>
      <p className="text-xs -mt-2 px-1" style={{ color: "var(--text-muted)" }}>
        「取扱不可」は委託先へのメッセージです(新たに委託先へは案内しない)。自社(STORES・イベント等)では引き続き販売するため、在庫アラートの対象には含まれます。「販売終了」は完全に取り扱いをやめる場合で、在庫アラートの対象から外れます。
      </p>
      <Input label="備考" value={form.note} onChange={set("note")} />
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check}>
          保存
        </Button>
      </div>
    </div>;
}
const BulkAddProducts = forwardRef(function BulkAddProducts2({ onAdd, onCountChange }, ref) {
  const [hasHeader, setHasHeader] = useState(true);
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState(null);
  const [mapping, setMapping] = useState({ name: "", genre: "", jan: "", price: "", cost: "", lot: "", status: "", note: "" });
  const parseNow = () => {
    if (!raw.trim()) {
      setParsed(null);
      return;
    }
    let p = parseDelimited(raw);
    if (!hasHeader) {
      const width = Math.max(0, ...p.records.map((r) => Object.keys(r).length), p.headers.length);
      const cols = Array.from({ length: width }, (_, i) => `\u5217${i + 1}`);
      const allRows = [p.headers, ...p.records.map((r) => p.headers.map((h) => r[h]))];
      p = { headers: cols, records: allRows.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i] ?? ""]))) };
    }
    setParsed(p);
    const guess = (cands) => p.headers.find((h) => cands.some((c) => h.includes(c))) || "";
    setMapping({ name: guess(["\u5546\u54C1\u540D", "\u54C1\u540D", "name", "\u5546\u54C1"]), genre: guess(["シリーズ", "genre", "\u30AB\u30C6\u30B4\u30EA"]), jan: guess(["JAN", "jan", "\u30D0\u30FC\u30B3\u30FC\u30C9"]), price: guess(["\u4E0A\u4EE3", "\u4FA1\u683C", "price", "\u5B9A\u4FA1"]), cost: guess(["\u539F\u4FA1", "cost"]), lot: guess(["\u30ED\u30C3\u30C8", "lot"]), status: guess(["\u53D6\u6271\u72B6\u6CC1", "\u72B6\u614B", "status"]), note: guess(["\u5099\u8003", "note", "\u30E1\u30E2"]) });
  };
  const rows = useMemo(() => {
    if (!parsed || !mapping.name) return [];
    return parsed.records.map((rec) => ({ name: (rec[mapping.name] || "").trim(), genre: mapping.genre ? (rec[mapping.genre] || "").trim() : "", jan: mapping.jan ? (rec[mapping.jan] || "").trim() : "", price: mapping.price ? Number(String(rec[mapping.price] || "0").replace(/[^0-9.-]/g, "")) || 0 : 0, cost: mapping.cost ? Number(String(rec[mapping.cost] || "0").replace(/[^0-9.-]/g, "")) || 0 : 0, lot: mapping.lot ? (rec[mapping.lot] || "").trim() : "", status: mapping.status ? (rec[mapping.status] || "").trim() || "\u53D6\u6271\u4E2D" : "\u53D6\u6271\u4E2D", note: mapping.note ? (rec[mapping.note] || "").trim() : "", reorderPoint: 3 })).filter((r) => r.name);
  }, [parsed, mapping]);
  useEffect(() => {
    onCountChange?.(rows.length);
  }, [rows.length, onCountChange]);
  useImperativeHandle(ref, () => ({ confirm: () => onAdd(rows.map((r) => ({ ...r, id: uid("P") }))) }), [rows, onAdd]);
  return <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        スプレッドシートの表（複数行）をそのままコピーしてここに貼り付けてください。CSVファイルの内容を貼り付けても構いません。
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
        1行目は見出し（列名）
      </label>
      <FilePasteRow onText={setRaw} />
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} placeholder={"\u5546\u54C1\u540D	シリーズ	JAN\u30B3\u30FC\u30C9	\u4E0A\u4EE3	\u5378\u91D1\u984D\n\u5947\u5999\u306A\u767A\u660E\u5BB6\u306E\u5BB6	\u4E0D\u601D\u8B70\u306A\u5BB6	4580747420058	2500	1750"} className="w-full h-32 rounded-md border p-2 text-xs font-mono outline-none" style={{ borderColor: "var(--border)" }} />
      <Button variant="ghost" onClick={parseNow} disabled={!raw.trim()}>
        貼り付けた内容を解析する
      </Button>

      {parsed && <div className="space-y-3">
          <div className="grid md:grid-cols-3 gap-2">
            {[["name", "\u5546\u54C1\u540D *"], ["genre", "シリーズ"], ["jan", "JAN\u30B3\u30FC\u30C9"], ["price", "\u4E0A\u4EE3"], ["cost", "\u539F\u4FA1"], ["lot", "\u51FA\u8377\u30ED\u30C3\u30C8"], ["status", "\u53D6\u6271\u72B6\u6CC1"], ["note", "\u5099\u8003"]].map(([key, label]) => <Select key={key} label={label} value={mapping[key]} onChange={(e) => setMapping((m) => ({ ...m, [key]: e.target.value }))}>
                <option value="">(使わない)</option>
                {parsed.headers.map((h) => <option key={h} value={h}>
                    {h}
                  </option>)}
              </Select>)}
          </div>

          {!mapping.name ? <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
              「商品名」列を指定してください
            </div> : <>
              <div className="text-sm" style={{ color: "var(--success)" }}>
                {rows.length}件の商品を登録できます
              </div>
              <div className="overflow-y-auto zk-scrollbar max-h-56 border rounded-md" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-xs">
                  <thead style={{ background: "var(--paper)" }}>
                    <tr className="text-left">
                      <th className="py-1.5 px-2">商品名</th>
                      <th className="py-1.5 px-2">シリーズ</th>
                      <th className="py-1.5 px-2 text-right">上代</th>
                      <th className="py-1.5 px-2 text-right">原価</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="py-1 px-2">{r.name}</td>
                        <td className="py-1 px-2">{r.genre || "-"}</td>
                        <td className="py-1 px-2 text-right font-mono">
                          {formatYen(r.price)}
                        </td>
                        <td className="py-1 px-2 text-right font-mono">
                          {r.cost ? formatYen(r.cost) : "-"}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </>}
        </div>}
    </div>;
});
function ProductMaster({ products, setProducts, inventory, consignees, stockAlertLocationIds }) {
  const [modal, setModal] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [query, setQuery] = useState("");
  const del = useDeleteConfirm();
  const bulkRef = useRef(null);
  const [bulkCount, setBulkCount] = useState(0);
  const dragRow = useDragReorder(setProducts, !query);
  const filteredWithIndex = products.map((p, i) => ({ p, i })).filter(({ p }) => !query || kanaMatch(p.name, query) || kanaMatch(p.furigana || "", query) || kanaMatch(p.genre || "", query) || kanaMatch(p.jan || "", query));
  const filtered = filteredWithIndex.map(({ p }) => p);
  const sortedFiltered = useMemo(() => {
    const activeItems = filteredWithIndex.filter(({ p }) => (PRODUCT_STATUS_RANK[p.status] ?? 1) === 1);
    const genres = Array.from(new Set(activeItems.map(({ p }) => p.genre || "\u305D\u306E\u4ED6")));
    genres.sort((a, b) => a === "\u305D\u306E\u4ED6" ? 1 : b === "\u305D\u306E\u4ED6" ? -1 : 0);
    const genreOrder = new Map(genres.map((g, idx) => [g, idx]));
    return [...filteredWithIndex].sort((a, b) => {
      const ra = PRODUCT_STATUS_RANK[a.p.status] ?? 1;
      const rb = PRODUCT_STATUS_RANK[b.p.status] ?? 1;
      if (ra !== rb) return ra - rb;
      if (ra === 1) {
        const ga = genreOrder.get(a.p.genre || "\u305D\u306E\u4ED6") ?? 999;
        const gb = genreOrder.get(b.p.genre || "\u305D\u306E\u4ED6") ?? 999;
        if (ga !== gb) return ga - gb;
      }
      return a.i - b.i;
    });
  }, [filteredWithIndex]);
  const { pageItems, page, setPage, pageSize, setPageSize, totalPages, totalCount } = usePagination(sortedFiltered);
  const save = (formRaw) => {
    const form = { ...formRaw, genre: toFullWidthKatakana(formRaw.genre) };
    if (modal === "new") {
      setProducts((prev) => {
        if (form.genre) {
          let lastIdx = -1;
          prev.forEach((p, i) => {
            if (p.genre === form.genre) lastIdx = i;
          });
          if (lastIdx !== -1) {
            const arr = [...prev];
            arr.splice(lastIdx + 1, 0, { ...form, id: uid("P") });
            return arr;
          }
        }
        return [...prev, { ...form, id: uid("P") }];
      });
    } else {
      setProducts((prev) => prev.map((p) => p.id === modal.id ? { ...form, id: p.id } : p));
    }
    setModal(null);
  };
  const bulkAdd = (newProducts) => {
    setProducts((prev) => [...prev, ...newProducts.map((p) => ({ ...p, genre: toFullWidthKatakana(p.genre) }))]);
    setModal(null);
  };
  const remove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    del.cancel();
  };
  const exportCsv = () => {
    const rows = products.map((p) => ({ 商品名: p.name, 読み方: p.furigana || "", シリーズ: p.genre || "", JANコード: p.jan || "", 上代: p.price ?? "", 原価: getCurrentCost(p), ロット: p.lot || "", 発注点: p.reorderPoint ?? "", ステータス: p.status || "", 備考: p.note || "" }));
    downloadText(`\u5546\u54C1\u30DE\u30B9\u30BF_${todayStr()}.csv`, "\uFEFF" + toCsv(rows, ["\u5546\u54C1\u540D", "\u8AAD\u307F\u65B9", "シリーズ", "JAN\u30B3\u30FC\u30C9", "\u4E0A\u4EE3", "\u539F\u4FA1", "\u30ED\u30C3\u30C8", "\u767A\u6CE8\u70B9", "\u30B9\u30C6\u30FC\u30BF\u30B9", "\u5099\u8003"]));
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow={`${products.length}\u4EF6`} title="商品マスタ" action={<div className="flex gap-2">
            <Button variant="ghost" icon={Download} onClick={exportCsv} disabled={!products.length}>
              CSV出力
            </Button>
            <Button variant="ghost" icon={UploadCloud} onClick={() => setModal("bulk")}>
              まとめて追加(貼り付け)
            </Button>
            <Button variant="accent" icon={Plus} onClick={() => setModal("new")}>
              商品を追加
            </Button>
          </div>} />
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="商品名・シリーズ・JANで検索" className="w-full pl-8 pr-3 py-2 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", background: "white" }} />
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {query ? "\u691C\u7D22\u4E2D\u306F\u4E26\u3073\u66FF\u3048\u3067\u304D\u307E\u305B\u3093" : "\u5DE6\u7AEF\u306E \u283F \u3092\u30C9\u30E9\u30C3\u30B0\u3057\u3066\u81EA\u7531\u306B\u4E26\u3073\u66FF\u3048\u3067\u304D\u307E\u3059"}
        </span>
      </div>
      <Card className="overflow-hidden" style={{ borderWidth: 2, maxWidth: 890 }}>
        <TopScrollSync tableClassName="text-sm" tableStyle={{ tableLayout: "fixed", width: 850 }} thead={<thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3 font-medium sticky left-0" style={{ width: 200, boxSizing: "border-box", color: "var(--text-muted)", background: "var(--paper)", borderRight: "1px solid var(--border)" }}>
                  商品名
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 100, color: "var(--accent2)" }}>
                  シリーズ
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 130, color: "var(--text-muted)" }}>
                  JANコード
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 90, color: "var(--text-muted)" }}>
                  上代
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 90, color: "var(--text-muted)" }}>
                  原価
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 70, color: "var(--text-muted)" }}>
                  在庫
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 90, color: "var(--text-muted)" }}>
                  状態
                </th>
                <th className="py-2 px-3" style={{ width: 80 }} />
              </tr>
            </thead>} tbody={<tbody>
              {pageItems.map(({ p, i: index }, i) => {
    const total = inventory[p.id]?.__total || 0;
    const alertQty = alertTargetQty(inventory, p.id, consignees, stockAlertLocationIds);
    const low = (p.status === "\u53D6\u6271\u4E2D" || p.status === "\u53D6\u6271\u4E0D\u53EF") && alertQty <= (Number(p.reorderPoint) || 0);
    const { style: dragStyle, ...dragHandlers } = dragRow(index);
    const rank = PRODUCT_STATUS_RANK[p.status] ?? 1;
    const prevItem = i > 0 ? pageItems[i - 1].p : null;
    const prevRank = prevItem ? PRODUCT_STATUS_RANK[prevItem.status] ?? 1 : null;
    const showStatusDivider = prevRank !== null && rank !== prevRank;
    const genreLabel = p.genre || "\u305D\u306E\u4ED6";
    const prevGenreLabel = prevItem ? prevItem.genre || "\u305D\u306E\u4ED6" : null;
    const showGenreDivider = rank === 1 && !showStatusDivider && genreLabel !== prevGenreLabel;
    const showFirstGenreHeader = i === 0 && rank === 1;
    return <React.Fragment key={p.id}>
                    {showStatusDivider && <tr>
                        <td className="py-1.5 px-3 text-xs font-semibold sticky left-0" style={{ width: 200, boxSizing: "border-box", background: "var(--accent-soft)", color: "var(--accent2)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }}>
                          販売終了
                        </td>
                        <td colSpan={7} style={{ background: "var(--accent-soft)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }} />
                      </tr>}
                    {(showGenreDivider || showFirstGenreHeader) && <tr>
                        <td className="py-1.5 px-3 text-xs font-semibold sticky left-0" style={{ width: 200, boxSizing: "border-box", background: "var(--accent-soft)", color: "var(--accent2)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }}>
                          {genreLabel}
                        </td>
                        <td colSpan={7} style={{ background: "var(--accent-soft)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }} />
                      </tr>}
                    <tr style={{ background: index % 2 ? "var(--paper)" : "var(--card)", ...dragStyle }} {...dragHandlers}>
                    <td className="py-2 px-3 font-medium sticky left-0" style={{ width: 200, boxSizing: "border-box", background: index % 2 ? "var(--paper)" : "var(--card)", borderTop: "2px solid var(--border)", borderRight: "1px solid var(--border)" }}>
                      <div className="flex items-start gap-1.5">
                        {!query && <span style={{ color: "var(--text-muted)", cursor: "grab", flexShrink: 0, marginTop: 2 }}>
                            <GripVertical size={14} />
                          </span>}
                        <span style={{ whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.3 }}>{p.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3" style={{ borderTop: "2px solid var(--border)" }}>
                      {p.genre ? <Badge tone="accent">{p.genre}</Badge> : <span style={{ color: "var(--text-muted)" }}>-</span>}
                    </td>
                    <td className="py-2 px-3 font-mono text-xs" style={{ color: "var(--text-muted)", borderTop: "2px solid var(--border)" }}>
                      {p.jan || "-"}
                    </td>
                    <td className="py-2 px-3 text-right font-mono" style={{ borderTop: "2px solid var(--border)" }}>
                      {formatYen(p.price)}
                    </td>
                    <td className="py-2 px-3 text-right font-mono" style={{ borderTop: "2px solid var(--border)" }}>
                      {getCurrentCost(p) ? formatYen(getCurrentCost(p)) : "-"}
                    </td>
                    <td className="py-2 px-3 text-right font-mono" style={{ borderTop: "2px solid var(--border)" }}>
                      <span style={{ color: low ? "var(--danger)" : "var(--text)" }}>
                        {formatNum(total)}
                      </span>
                    </td>
                    <td className="py-2 px-3" style={{ borderTop: "2px solid var(--border)" }}>
                      <Badge tone={p.status === "\u53D6\u6271\u4E2D" ? "success" : p.status === "\u5728\u5EAB\u306A\u3057" ? "danger" : p.status === "\u8CA9\u58F2\u7D42\u4E86" ? "default" : "accent"}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-2 px-3" style={{ borderTop: "2px solid var(--border)" }}>
                      {del.isPending(p.id) ? <ConfirmBar message="削除しますか？" onConfirm={() => remove(p.id)} onCancel={del.cancel} /> : <div className="flex gap-1 justify-end">
                          <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setDetailProduct(p)} title="詳細を見る">
                            <Info size={14} style={{ color: "var(--accent2)" }} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setModal(p)}>
                            <Pencil size={14} />
                          </button>
                          <button className="p-1.5 rounded hover:bg-black/5" onClick={() => del.ask(p.id)}>
                            <Trash2 size={14} style={{ color: "var(--danger)" }} />
                          </button>
                        </div>}
                    </td>
                  </tr>
                  </React.Fragment>;
  })}
              {filtered.length === 0 && <tr>
                  <td colSpan={8}>
                    <EmptyState icon={Package} title="商品が見つかりません" />
                  </td>
                </tr>}
            </tbody>} />
        <PaginationBar page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} totalPages={totalPages} totalCount={totalCount} pageSizeOptions={[30, 50, 100, Infinity]} />
      </Card>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "new" ? "\u5546\u54C1\u3092\u8FFD\u52A0" : modal === "bulk" ? "\u5546\u54C1\u3092\u307E\u3068\u3081\u3066\u8FFD\u52A0" : "\u5546\u54C1\u3092\u7DE8\u96C6"} wide={modal === "bulk"} footer={modal === "bulk" ? <>
              <Button variant="ghost" onClick={() => setModal(null)}>
                キャンセル
              </Button>
              <Button variant="accent" icon={UploadCloud} onClick={() => bulkRef.current?.confirm()} disabled={bulkCount === 0}>
                {bulkCount || ""}件をまとめて追加
              </Button>
            </> : null}>
        {modal === "bulk" ? <BulkAddProducts ref={bulkRef} onAdd={bulkAdd} onCountChange={setBulkCount} /> : <ProductForm initial={modal === "new" ? null : modal} onSave={save} onCancel={() => setModal(null)} existingGenres={Array.from(new Set(products.map((p) => p.genre).filter(Boolean)))} />}
      </Modal>
      <Modal open={!!detailProduct} onClose={() => setDetailProduct(null)} title={`${detailProduct?.name || ""} \u306E\u8A73\u7D30`}>
        {detailProduct && (() => {
    const row = inventory[detailProduct.id] || { __total: 0 };
    const locRows = consignees.filter((c) => (row[c.id] || 0) !== 0).map((c) => ({ name: c.name, qty: row[c.id] }));
    return <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    読み方
                  </div>
                  <div>{detailProduct.furigana || "-"}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    シリーズ
                  </div>
                  <div>{detailProduct.genre || "-"}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    JANコード
                  </div>
                  <div className="font-mono text-xs">{detailProduct.jan || "-"}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    上代
                  </div>
                  <div>{formatYen(detailProduct.price)}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    原価(最新)
                  </div>
                  <div>{getCurrentCost(detailProduct) ? formatYen(getCurrentCost(detailProduct)) : "-"}</div>
                </div>
                {getCostHistory(detailProduct).length > 1 && <div className="col-span-2 sm:col-span-3">
                    <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                      原価の履歴
                    </div>
                    <div className="space-y-0.5">
                      {[...getCostHistory(detailProduct)].sort((a, b) => b.date.localeCompare(a.date)).map((h, i) => <div key={i} className="text-xs">
                          {h.date} ・ {formatYen(h.amount)}
                          {h.note && ` ・ ${h.note}`}
                        </div>)}
                    </div>
                  </div>}
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    出荷ロット
                  </div>
                  <div>{detailProduct.lot || "-"}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    発注点
                  </div>
                  <div>{formatNum(detailProduct.reorderPoint || 0)}</div>
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    ステータス
                  </div>
                  <div>{detailProduct.status || "-"}</div>
                </div>
              </div>
              <div>
                <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                  在庫内訳(合計{formatNum(row.__total || 0)})
                </div>
                {locRows.length === 0 ? <div style={{ color: "var(--text-muted)" }}>
                    在庫がありません
                  </div> : <div className="rounded-md border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                    <table className="w-full text-sm">
                      <tbody>
                        {locRows.map((r) => <tr key={r.name} className="border-t first:border-t-0" style={{ borderColor: "var(--border)" }}>
                            <td className="py-1.5 px-3">{r.name}</td>
                            <td className="py-1.5 px-3 text-right font-mono">
                              {formatNum(r.qty)}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>}
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                  備考
                </div>
                <div className="whitespace-pre-wrap">
                  {detailProduct.note || "-"}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
                <Button variant="ghost" onClick={() => setDetailProduct(null)}>
                  閉じる
                </Button>
                <Button variant="accent" icon={Pencil} onClick={() => {
        setModal(detailProduct);
        setDetailProduct(null);
      }}>
                  編集する
                </Button>
              </div>
            </div>;
  })()}
      </Modal>
    </div>;
}
const EMPTY_CONSIGNEE = { name: "", furigana: "", company: "", bizType: "", contractType: "\u59D4\u8A17", feeRate: 0.3, status: "\u7A3C\u50CD\u4E2D", note: "", paymentDueDays: 30, paymentTerms: "", cadence: "monthly", address: "", contactPerson: "", assignedStaff: "", locations: [], reportMethod: "manual", sourceSheetUrl: "", reportEmailFrom: "" };
function emptyConsigneeLocation() {
  return { id: uid("LOC"), label: "", address: "", building: "", contactPerson: "", phone: "", email: "" };
}
const BASE_CONTRACT_TYPES = ["\u59D4\u8A17", "\u8CB7\u53D6", "\u81EA\u793E"];
function ConsigneeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => {
    const base = initial || EMPTY_CONSIGNEE;
    if ((!base.locations || base.locations.length === 0) && (base.address || base.contactPerson)) {
      return { ...base, locations: [{ id: uid("LOC"), label: "\u672C\u5E97", address: base.address || "", contactPerson: base.contactPerson || "", phone: "" }] };
    }
    if (!base.locations || base.locations.length === 0) {
      return { ...base, locations: [emptyConsigneeLocation()] };
    }
    return { ...base, locations: base.locations };
  });
  const [error, setError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const contractTypeOptions = BASE_CONTRACT_TYPES.includes(form.contractType) ? BASE_CONTRACT_TYPES : [...BASE_CONTRACT_TYPES, form.contractType];
  const setLocation = (id, key) => (e) => {
    setForm((f) => ({ ...f, locations: f.locations.map((l) => l.id === id ? { ...l, [key]: e.target.value } : l) }));
  };
  const addLocation = () => setForm((f) => ({ ...f, locations: [...f.locations, emptyConsigneeLocation()] }));
  const removeLocation = (id) => setForm((f) => ({ ...f, locations: f.locations.filter((l) => l.id !== id) }));
  const handleSubmit = () => {
    if (!form.name.trim()) {
      setError("\u59D4\u8A17\u5148\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");
      return;
    }
    setError("");
    const first = form.locations[0];
    onSave({ ...form, address: first?.address || "", contactPerson: first?.contactPerson || "" });
  };
  return <div className="space-y-6">
      {error && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
          {error}
        </div>}
      <Input label="委託先名 *" value={form.name} onChange={set("name")} autoFocus />
      <Input label="読み方(ひらがな・検索用)" value={form.furigana || ""} onChange={set("furigana")} placeholder="例: ときとき" />
      <Input label="運営会社" value={form.company} onChange={set("company")} />
      <Input label="事業形態" value={form.bizType} onChange={set("bizType")} />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            拠点(住所・担当者・電話番号)
          </span>
          <button type="button" className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={addLocation}>
            + 拠点を追加
          </button>
        </div>
        {form.locations.length === 0 ? <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            拠点情報がありません。「+
            拠点を追加」で住所・担当者を登録できます(複数追加可)。
          </p> : <div className="space-y-2">
            {form.locations.map((loc, i) => <div key={loc.id} className="p-3 rounded-md space-y-2" style={{ background: "var(--paper)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between">
                  <Input label={`\u62E0\u70B9\u540D(\u4F8B: \u672C\u5E97\u30FB${i + 1}\u53F7\u5E97)`} value={loc.label} onChange={setLocation(loc.id, "label")} />
                  <button type="button" className="p-1.5 ml-2 mt-4 rounded hover:bg-black/5" onClick={() => removeLocation(loc.id)}>
                    <Trash2 size={14} style={{ color: "var(--danger)" }} />
                  </button>
                </div>
                <Input label="住所" value={loc.address} onChange={setLocation(loc.id, "address")} />
                <Input label="施設名(ビル名など)" value={loc.building || ""} onChange={setLocation(loc.id, "building")} />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="担当者" value={loc.contactPerson} onChange={setLocation(loc.id, "contactPerson")} />
                  <Input label="電話番号" value={loc.phone} onChange={(e) => setLocation(loc.id, "phone")({ target: { value: normalizePhone(e.target.value) } })} />
                  <Input label="メールアドレス" value={loc.email || ""} onChange={setLocation(loc.id, "email")} />
                </div>
              </div>)}
          </div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select label="契約形態" value={form.contractType} onChange={set("contractType")}>
          {contractTypeOptions.map((t) => <option key={t}>{t}</option>)}
        </Select>
        <Input label="手数料率(%)" type="number" step="0.1" value={form.feeRate ? Math.round(Number(form.feeRate) * 1000) / 10 : ""} onChange={(e) => setForm((f) => ({ ...f, feeRate: e.target.value === "" ? "" : Number(e.target.value) / 100 }))} placeholder="例: 30" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="支払サイト(日数)" type="number" value={form.paymentDueDays} onChange={set("paymentDueDays")} />
        <Input label="支払条件(自由記述)" value={form.paymentTerms || ""} onChange={set("paymentTerms")} placeholder="例: 月末締め翌月25日払い" />
        <Select label="ステータス" value={form.status} onChange={set("status")}>
          <option>稼働中</option>
          <option>休止</option>
          <option>閉店</option>
        </Select>
      </div>
      <Select label="月次チェック" value={form.cadence || "monthly"} onChange={set("cadence")}>
        <option value="monthly">毎月(月次チェックの対象)</option>
        <option value="spot">スポット・依頼ベース(月次チェック対象外)</option>
      </Select>
      <Select label="売上報告の受け取り方" value={form.reportMethod || "manual"} onChange={set("reportMethod")}>
        <option value="manual">手動入力(こちらで取引記録に入力)</option>
        <option value="email">メールで届く</option>
        <option value="sheet">スプレッドシートを自動取得</option>
      </Select>
      {form.reportMethod === "sheet" && <Input label="取得元スプレッドシートURL" value={form.sourceSheetUrl || ""} onChange={set("sourceSheetUrl")} placeholder="https://docs.google.com/spreadsheets/d/..." />}
      {form.reportMethod === "email" && <Input label="報告メールの送信元アドレス(判別用)" value={form.reportEmailFrom || ""} onChange={set("reportEmailFrom")} placeholder="例: shop@example.com" />}
      <Input label="担当社員(社内)" value={form.assignedStaff || ""} onChange={set("assignedStaff")} placeholder="例: 山田" />
      <Input label="備考" value={form.note} onChange={set("note")} />
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check}>
          保存
        </Button>
      </div>
    </div>;
}
const BulkPasteImporter = forwardRef(function BulkPasteImporter2({ fields, onAdd, onCountChange, previewKeys, placeholder }, ref) {
  const [hasHeader, setHasHeader] = useState(true);
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState(null);
  const [mapping, setMapping] = useState(Object.fromEntries(fields.map((f) => [f.key, ""])));
  const parseNow = () => {
    if (!raw.trim()) {
      setParsed(null);
      return;
    }
    let p = parseDelimited(raw);
    if (!hasHeader) {
      const width = Math.max(0, ...p.records.map((r) => Object.keys(r).length), p.headers.length);
      const cols = Array.from({ length: width }, (_, i) => `\u5217${i + 1}`);
      const allRows = [p.headers, ...p.records.map((r) => p.headers.map((h) => r[h]))];
      p = { headers: cols, records: allRows.map((r) => Object.fromEntries(cols.map((c, i) => [c, r[i] ?? ""]))) };
    }
    setParsed(p);
    const guess = (cands) => p.headers.find((h) => cands.some((c) => h.includes(c))) || "";
    setMapping(Object.fromEntries(fields.map((f) => [f.key, guess(f.guess || [])])));
  };
  const requiredField = fields.find((f) => f.required);
  const rows = useMemo(() => {
    if (!parsed || !mapping[requiredField?.key]) return [];
    return parsed.records.map((rec) => {
      const obj = {};
      for (const f of fields) {
        const col = mapping[f.key];
        let val = col ? (rec[col] || "").trim() : "";
        if (!val && f.default !== void 0) val = f.default;
        if (f.numeric) val = Number(String(val || "0").replace(/[^0-9.-]/g, "")) || 0;
        if (f.percentToDecimal) val = val / 100;
        if (f.normalize) val = f.normalize(val);
        obj[f.key] = val;
      }
      return obj;
    }).filter((r) => requiredField ? String(r[requiredField.key] || "").trim() : true);
  }, [parsed, mapping, fields, requiredField]);
  useEffect(() => {
    onCountChange?.(rows.length);
  }, [rows.length, onCountChange]);
  useImperativeHandle(ref, () => ({ confirm: () => onAdd(rows) }), [rows, onAdd]);
  return <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        スプレッドシートの複数行をそのままコピーして貼り付けてください。CSVの内容でも構いません。
      </p>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
        1行目は見出し（列名）
      </label>
      <FilePasteRow onText={setRaw} />
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} placeholder={placeholder} className="w-full h-32 rounded-md border p-2 text-xs font-mono outline-none" style={{ borderColor: "var(--border)" }} />
      <Button variant="ghost" onClick={parseNow} disabled={!raw.trim()}>
        貼り付けた内容を解析する
      </Button>

      {parsed && <div className="space-y-3">
          <div className="grid md:grid-cols-3 gap-2">
            {fields.map((f) => <Select key={f.key} label={f.label} value={mapping[f.key]} onChange={(e) => setMapping((m) => ({ ...m, [f.key]: e.target.value }))}>
                <option value="">(使わない)</option>
                {parsed.headers.map((h) => <option key={h} value={h}>
                    {h}
                  </option>)}
              </Select>)}
          </div>

          {!mapping[requiredField?.key] ? <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
              「{requiredField?.label}」列を指定してください
            </div> : <>
              <div className="text-sm" style={{ color: "var(--success)" }}>
                {rows.length}件登録できます
              </div>
              <div className="overflow-y-auto zk-scrollbar max-h-56 border rounded-md" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-xs">
                  <thead style={{ background: "var(--paper)" }}>
                    <tr className="text-left">
                      {previewKeys.map((k) => <th key={k} className="py-1.5 px-2">
                          {fields.find((f) => f.key === k)?.label.replace(" *", "")}
                        </th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                        {previewKeys.map((k) => {
      const field = fields.find((f) => f.key === k);
      const display = field?.percentToDecimal ? `${(Number(r[k]) * 100).toFixed(1)}%` : String(r[k] ?? "") || "-";
      return <td key={k} className="py-1 px-2">
                              {display}
                            </td>;
    })}
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </>}
        </div>}
    </div>;
});
const CONSIGNEE_BULK_FIELDS = [{ key: "name", label: "委託先名 *", required: true, guess: ["委託先名", "委託先", "店舗名", "name"] }, { key: "furigana", label: "読み方", guess: ["読み方", "ふりがな", "フリガナ"] }, { key: "company", label: "運営会社", guess: ["運営会社", "company"] }, { key: "bizType", label: "事業形態", guess: ["事業形態", "業種"] }, { key: "contractType", label: "契約形態", guess: ["契約形態"], default: "委託" }, { key: "feeRate", label: "手数料率(%)", numeric: true, percentToDecimal: true, guess: ["手数料率", "手数料"], default: 30 }, { key: "paymentDueDays", label: "支払サイト(日数)", numeric: true, guess: ["支払サイト", "サイト"], default: 30 }, { key: "paymentTerms", label: "支払条件", guess: ["支払条件", "paymentTerms"] }, { key: "cadence", label: "月次チェック", guess: ["月次チェック", "cadence"], default: "monthly" }, { key: "reportMethod", label: "売上報告の受け取り方", guess: ["売上報告の受け取り方", "報告方法", "reportMethod"], default: "manual", normalize: (v) => {
  const s = String(v || "").trim();
  if (s.includes("スプレッドシート") || s.toLowerCase() === "sheet") return "sheet";
  if (s.includes("メール") || s.toLowerCase() === "email") return "email";
  return "manual";
} }, { key: "sourceSheetUrl", label: "取得元スプレッドシートURL", guess: ["取得元スプレッドシートURL", "スプレッドシートURL", "シートURL"] }, { key: "reportEmailFrom", label: "報告メールの送信元アドレス", guess: ["報告メールの送信元アドレス", "報告メールアドレス", "送信元アドレス"] }, { key: "assignedStaff", label: "担当社員", guess: ["担当社員", "社内担当", "assignedStaff"] }, { key: "address", label: "住所", guess: ["住所"] }, { key: "building", label: "建物名", guess: ["建物名", "建物"] }, { key: "contactPerson", label: "担当者", guess: ["担当者"] }, { key: "phone", label: "電話番号", guess: ["電話番号", "電話", "TEL"] }, { key: "email", label: "メールアドレス", guess: ["メールアドレス", "メール", "email"] }, { key: "status", label: "ステータス", guess: ["ステータス", "状態"], default: "稼働中" }, { key: "note", label: "備考", guess: ["備考", "メモ"] }];
const PRODUCT_STATUS_RANK = { "\u53D6\u6271\u4E2D": 1, "\u53D6\u6271\u4E0D\u53EF": 1, "\u5728\u5EAB\u306A\u3057": 1, "\u8CA9\u58F2\u7D42\u4E86": 2 };
const STATUS_RANK = { \u7A3C\u50CD\u4E2D: 0, \u4F11\u6B62: 1, \u9589\u5E97: 2 };
function ConsigneeMaster({ consignees, setConsignees }) {
  const [modal, setModal] = useState(null);
  const [detailConsignee, setDetailConsignee] = useState(null);
  const del = useDeleteConfirm();
  const bulkRef = useRef(null);
  const [bulkCount, setBulkCount] = useState(0);
  const dragRow = useDragReorderById(setConsignees, true);
  const displayList = useMemo(() => {
    return consignees.map((c, i) => ({ c, i })).sort((a, b) => (STATUS_RANK[a.c.status] ?? 1) - (STATUS_RANK[b.c.status] ?? 1) || a.i - b.i).map((x) => x.c);
  }, [consignees]);
  const { pageItems, page, setPage, pageSize, setPageSize, totalPages, totalCount } = usePagination(displayList);
  const save = (form) => {
    if (modal === "new") {
      setConsignees((prev) => [...prev, { ...form, id: uid("C") }]);
    } else {
      setConsignees((prev) => prev.map((c) => c.id === modal.id ? { ...form, id: c.id } : c));
    }
    setModal(null);
  };
  const remove = (id) => {
    setConsignees((prev) => prev.filter((c) => c.id !== id));
    del.cancel();
  };
  const bulkAdd = (rows) => {
    setConsignees((prev) => [...prev, ...rows.map((r) => {
      const { building, phone, email, ...rest } = r;
      const hasLocationInfo = rest.address || building || rest.contactPerson || phone || email;
      const cadence = /\u30B9\u30DD\u30C3\u30C8|spot/i.test(rest.cadence || "") ? "spot" : "monthly";
      return {
        ...rest,
        cadence,
        id: uid("C"),
        locations: hasLocationInfo ? [{ id: uid("LOC"), label: "\u672C\u5E97", address: rest.address || "", building: building || "", contactPerson: rest.contactPerson || "", phone: phone || "", email: email || "" }] : [],
      };
    })]);
    setModal(null);
  };
  const exportCsv = () => {
    const rows = consignees.map((c) => {
      const loc0 = c.locations?.[0] || {};
      return { 委託先名: c.name, 読み方: c.furigana || "", 運営会社: c.company || "", 事業形態: c.bizType || "", 契約形態: c.contractType || "", "手数料率(%)": c.feeRate ? Math.round(Number(c.feeRate) * 1000) / 10 : 0, "支払サイト(日数)": c.paymentDueDays ?? "", 支払条件: c.paymentTerms || "", 月次チェック: c.cadence === "spot" ? "スポット" : "毎月", 住所: c.address || loc0.address || "", 建物名: loc0.building || "", 担当者: c.contactPerson || loc0.contactPerson || "", 担当社員: c.assignedStaff || "", 電話番号: loc0.phone || "", メールアドレス: loc0.email || "", ステータス: c.status || "", 備考: c.note || "" };
    });
    downloadText(`委託先マスタ_${todayStr()}.csv`, "\uFEFF" + toCsv(rows, ["委託先名", "読み方", "運営会社", "事業形態", "契約形態", "手数料率(%)", "支払サイト(日数)", "支払条件", "月次チェック", "住所", "建物名", "担当者", "担当社員", "電話番号", "メールアドレス", "ステータス", "備考"]));
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow={`${consignees.length}\u4EF6`} title="委託先マスタ" action={<div className="flex gap-2">
            <Button variant="ghost" icon={Download} onClick={exportCsv} disabled={!consignees.length}>
              CSV出力
            </Button>
            <Button variant="ghost" icon={UploadCloud} onClick={() => setModal("bulk")}>
              まとめて追加(貼り付け)
            </Button>
            <Button variant="accent" icon={Plus} onClick={() => setModal("new")}>
              委託先を追加
            </Button>
          </div>} />
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        左端の ⠿
        をドラッグして並び替えできます。「休止」「閉店」は自動的に下に移動します
      </p>
      <Card className="overflow-hidden" style={{ borderWidth: 2, maxWidth: 740 }}>
        <TopScrollSync tableClassName="text-sm" tableStyle={{ tableLayout: "fixed", width: 700 }} thead={<thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3 font-medium sticky left-0" style={{ width: 200, boxSizing: "border-box", color: "var(--text-muted)", background: "var(--paper)", borderRight: "1px solid var(--border)" }}>
                  委託先名
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 120, color: "var(--text-muted)" }}>
                  事業形態
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 100, color: "var(--text-muted)" }}>
                  契約形態
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 90, color: "var(--text-muted)" }}>
                  手数料率
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 90, color: "var(--text-muted)" }}>
                  状態
                </th>
                <th className="py-2 px-3" style={{ width: 100 }} />
              </tr>
            </thead>} tbody={<tbody>
              {pageItems.map((c, i) => {
    const { style: dragStyle, ...dragHandlers } = dragRow(c.id);
    const prevRank = i > 0 ? STATUS_RANK[pageItems[i - 1].status] ?? 1 : null;
    const rank = STATUS_RANK[c.status] ?? 1;
    const showDivider = prevRank !== null && rank !== prevRank;
    return <React.Fragment key={c.id}>
                    {showDivider && <tr>
                        <td className="py-1.5 px-3 text-xs font-semibold sticky left-0" style={{ width: 200, boxSizing: "border-box", background: "var(--accent-soft)", color: "var(--accent2)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }}>
                          {rank === 2 ? "\u9589\u5E97" : "\u53D6\u5F15\u4F11\u6B62"}
                        </td>
                        <td colSpan={5} style={{ background: "var(--accent-soft)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }} />
                      </tr>}
                    <tr style={{ opacity: c.status !== "\u7A3C\u50CD\u4E2D" ? 0.65 : 1, background: i % 2 ? "var(--paper)" : "var(--card)", ...dragStyle }} {...dragHandlers}>
                      <td className="py-2 px-3 font-medium sticky left-0" style={{ width: 200, boxSizing: "border-box", background: i % 2 ? "var(--paper)" : "var(--card)", borderTop: "2px solid var(--border)", borderRight: "1px solid var(--border)" }}>
                        <div className="flex items-start gap-1.5">
                          <span style={{ color: "var(--text-muted)", cursor: "grab", flexShrink: 0, marginTop: 2 }}>
                            <GripVertical size={14} />
                          </span>
                          <span style={{ whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.3 }}>{c.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)", borderTop: "2px solid var(--border)" }}>
                        {c.bizType || "-"}
                      </td>
                      <td className="py-2 px-3" style={{ borderTop: "2px solid var(--border)" }}>{c.contractType}</td>
                      <td className="py-2 px-3 text-right font-mono" style={{ borderTop: "2px solid var(--border)" }}>
                        {((Number(c.feeRate) || 0) * 100).toFixed(1)}%
                      </td>
                      <td className="py-2 px-3" style={{ borderTop: "2px solid var(--border)" }}>
                        <Badge tone={c.status === "\u7A3C\u50CD\u4E2D" ? "success" : "default"}>
                          {c.status}
                        </Badge>
                      </td>
                      <td className="py-2 px-3" style={{ borderTop: "2px solid var(--border)" }}>
                        {del.isPending(c.id) ? <ConfirmBar message="削除しますか？" onConfirm={() => remove(c.id)} onCancel={del.cancel} /> : <div className="flex gap-1 justify-end">
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setDetailConsignee(c)} title="詳細を見る">
                              <Info size={14} style={{ color: "var(--accent2)" }} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setModal(c)}>
                              <Pencil size={14} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => del.ask(c.id)}>
                              <Trash2 size={14} style={{ color: "var(--danger)" }} />
                            </button>
                          </div>}
                      </td>
                    </tr>
                  </React.Fragment>;
  })}
            </tbody>} />
        <PaginationBar page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} totalPages={totalPages} totalCount={totalCount} pageSizeOptions={[30, 50, 100, Infinity]} />
      </Card>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "new" ? "\u59D4\u8A17\u5148\u3092\u8FFD\u52A0" : modal === "bulk" ? "\u59D4\u8A17\u5148\u3092\u307E\u3068\u3081\u3066\u8FFD\u52A0" : "\u59D4\u8A17\u5148\u3092\u7DE8\u96C6"} wide={modal === "bulk"} footer={modal === "bulk" ? <>
              <Button variant="ghost" onClick={() => setModal(null)}>
                キャンセル
              </Button>
              <Button variant="accent" icon={UploadCloud} onClick={() => bulkRef.current?.confirm()} disabled={bulkCount === 0}>
                {bulkCount || ""}件をまとめて追加
              </Button>
            </> : null}>
        {modal === "bulk" ? <BulkPasteImporter ref={bulkRef} fields={CONSIGNEE_BULK_FIELDS} previewKeys={["name", "contractType", "feeRate", "address", "phone"]} placeholder={"委託先名\t読み方\t運営会社\t契約形態\t手数料率(%)\t住所\t電話番号\tメールアドレス\n新規カフェ\tしんきかふぇ\t株式会社サンプル\t委託\t30\t東京都渋谷区1-2-3\t03-1234-5678\tinfo@example.com"} onAdd={bulkAdd} onCountChange={setBulkCount} /> : <ConsigneeForm initial={modal === "new" ? null : modal} onSave={save} onCancel={() => setModal(null)} />}
      </Modal>
      <Modal open={!!detailConsignee} onClose={() => setDetailConsignee(null)} title={`${detailConsignee?.name || ""} \u306E\u8A73\u7D30`}>
        {detailConsignee && <div className="space-y-3 text-sm">
            <div>
              <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                運営会社
              </div>
              <div>{detailConsignee.company || "-"}</div>
            </div>
            <div>
              <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                担当社員(社内)
              </div>
              <div>{detailConsignee.assignedStaff || "-"}</div>
            </div>
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                拠点(住所・担当者・電話番号)
              </div>
              {!detailConsignee.locations || detailConsignee.locations.length === 0 ? <div style={{ color: "var(--text-muted)" }}>
                  登録されていません
                </div> : <div className="space-y-2">
                  {detailConsignee.locations.map((loc) => <div key={loc.id} className="p-2 rounded-md" style={{ background: "var(--paper)" }}>
                      <div className="font-medium">
                        {loc.label || "(\u540D\u79F0\u672A\u8A2D\u5B9A)"}
                      </div>
                      <div style={{ color: "var(--text-muted)" }}>
                        {loc.address || "-"}
                        {loc.building ? ` ${loc.building}` : ""}
                      </div>
                      <div className="flex gap-3 text-xs mt-0.5 flex-wrap" style={{ color: "var(--text-muted)" }}>
                        <span>担当: {loc.contactPerson ? withHonorific(loc.contactPerson) : "-"}</span>
                        <span>TEL: {loc.phone || "-"}</span>
                        {loc.email && <span>Mail: {loc.email}</span>}
                      </div>
                    </div>)}
                </div>}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                  事業形態
                </div>
                <div>{detailConsignee.bizType || "-"}</div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                  契約形態・手数料率
                </div>
                <div>
                  {detailConsignee.contractType || "-"}(
                  {Math.round((Number(detailConsignee.feeRate) || 0) * 100)}%)
                </div>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                  支払条件
                </div>
                <div>{detailConsignee.paymentTerms || "-"}</div>
              </div>
            </div>
            <div>
              <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                備考
              </div>
              <div className="whitespace-pre-wrap">
                {detailConsignee.note || "-"}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
              <Button variant="ghost" onClick={() => setDetailConsignee(null)}>
                閉じる
              </Button>
              <Button variant="accent" icon={Pencil} onClick={() => {
    setModal(detailConsignee);
    setDetailConsignee(null);
  }}>
                編集する
              </Button>
            </div>
          </div>}
      </Modal>
    </div>;
}
function emptyTx() {
  return { date: todayStr(), type: "\u59D4\u8A17", fromLocation: "", toLocation: "", productId: "", qty: 1, unitPrice: 0, amount: 0, relatedId: "", enteredBy: "", memo: "", eventName: "", adjustDirection: "increase" };
}
function TransactionForm({ initial, initialBatch, products, consignees, inventory, onSave, onCancel, saving, deliveryNotes, invoices, shippingRequests }) {
  const isBatchEdit = !!initialBatch && initialBatch.length > 0;
  const isNew = !initial && !isBatchEdit;
  const editBatchId = initial?.batchId || initialBatch?.[0]?.batchId || null;
  const linkedNote = !isNew && editBatchId ? deliveryNotes?.find((d) => d.sourceBatchId === editBatchId && !d.voided) : null;
  const linkedInvoice = !isNew && editBatchId ? invoices?.find((i) => i.sourceBatchId === editBatchId) : null;
  const linkedShipping = !isNew && editBatchId ? shippingRequests?.find((r) => r.sourceBatchId === editBatchId) : null;
  const [updateDeliveryNote, setUpdateDeliveryNote] = useState(true);
  const [updateInvoice, setUpdateInvoice] = useState(true);
  const [updateShipping, setUpdateShipping] = useState(true);
  const warehouseId = findWarehouse(consignees)?.id || "";
  const [form, setForm] = useState(() => {
    if (isBatchEdit) {
      const moves = initialBatch.filter((t) => t.type === "\u79FB\u52D5");
      const others = initialBatch.filter((t) => t.type !== "\u79FB\u52D5");
      if (moves.length && others.length) {
        const repSale = others[0];
        const repMove = moves.find((m) => m.id === repSale.relatedId) || moves[0];
        const repIsBuyout = repSale.type === "\u8CB7\u53D6";
        const sharedFrom = repIsBuyout ? repMove.fromLocation : repMove.toLocation;
        const sharedTo = repIsBuyout ? repMove.toLocation : "";
        return { ...repSale, fromLocation: sharedFrom, toLocation: sharedTo, items: others.map((sale) => {
          const move = moves.find((m) => m.id === sale.relatedId);
          return { productId: sale.productId, qty: sale.qty, unitPrice: sale.unitPrice, amount: sale.amount, _saleId: sale.id, _moveId: move?.id || null };
        }) };
      }
      return { ...initialBatch[0], items: initialBatch.map((t) => ({ productId: t.productId, qty: t.qty, unitPrice: t.unitPrice, amount: t.amount, adjustDirection: t.adjustDirection || "increase", _saleId: t.id, _moveId: null })) };
    }
    if (initial) {
      return { ...initial, items: [{ productId: initial.productId, qty: initial.qty, unitPrice: initial.unitPrice, amount: initial.amount, adjustDirection: initial.adjustDirection || "increase", _saleId: initial.id, _moveId: null }] };
    }
    return { ...emptyTx(), items: [{ productId: "", qty: 1, unitPrice: 0, amount: 0, adjustDirection: "increase" }] };
  });
  const [error, setError] = useState("");
  const [createShipping, setCreateShipping] = useState(true);
  const [createDeliveryNote, setCreateDeliveryNote] = useState(true);
  const [createInvoice, setCreateInvoice] = useState(() => isNew && form.type === "\u59D4\u8A17");
  useEffect(() => {
    if (isNew && form.type === "\u59D4\u8A17") setCreateInvoice(true);
  }, [form.type, isNew]);
  const type = TX_TYPE_MAP[form.type] || UNKNOWN_TX_TYPE;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const activeConsignees = consignees.filter((c) => c.status !== "\u9589\u5E97" && c.status !== "\u4F11\u6B62");
  const storesId = findStores(consignees)?.id || "";
  const isBuyout = form.type === "\u8CB7\u53D6";
  const isEC = form.type === "EC";
  const isEvent = form.type === "\u30A4\u30D9\u30F3\u30C8";
  const isConsignmentSale = isNew && form.type === "\u59D4\u8A17";
  const willShip = isNew && (form.type === "\u79FB\u52D5" && form.toLocation && form.toLocation !== warehouseId || isBuyout && form.toLocation && form.toLocation !== form.fromLocation);
  const feeConsignee = !isNew && form.type === "\u59D4\u8A17" && form.fromLocation ? consignees.find((c) => c.id === form.fromLocation) : null;
  const feeCurrentRate = feeConsignee ? Number(feeConsignee.feeRate) || 0 : null;
  const feeRecordedRate = form.feeRateAtEntry !== void 0 && form.feeRateAtEntry !== null ? Number(form.feeRateAtEntry) : null;
  const feeRateNoRecord = !!feeConsignee && feeRecordedRate === null;
  const feeRateMismatch = !!feeConsignee && !feeRateNoRecord && feeRecordedRate !== feeCurrentRate;
  const [updateFeeRate, setUpdateFeeRate] = useState(false);
  const originalItemsRef = useRef(form.items);
  const toggleUpdateFeeRate = (checked) => {
    setUpdateFeeRate(checked);
    if (feeRecordedRate === null || feeCurrentRate === null) return;
    if (!checked) {
      setForm((f) => ({ ...f, items: originalItemsRef.current.map((it) => ({ ...it })) }));
      return;
    }
    if (feeRecordedRate >= 1) return;
    const ratio = (1 - feeCurrentRate) / (1 - feeRecordedRate);
    setForm((f) => ({ ...f, items: f.items.map((it) => {
        const newAmount = Math.round((Number(it.amount) || 0) * ratio);
        const newUnitPrice = Number(it.qty) ? Math.round(newAmount / Number(it.qty)) : it.unitPrice;
        return { ...it, amount: newAmount, unitPrice: newUnitPrice };
      }) }));
  };
  const showStockHint = isBuyout || isEvent || isEC && form.fromLocation !== warehouseId || form.type === "\u79FB\u52D5" && form.fromLocation === warehouseId;
  const priceForType = (productId, f) => {
    const p = products.find((pp) => pp.id === productId);
    if (!p) return null;
    if (!isRevenueTx({ type: f.type })) return 0;
    const locId = f.type === "\u8CB7\u53D6" ? f.toLocation : f.fromLocation;
    const c = consignees.find((cc) => cc.id === locId);
    const rate = c ? Number(c.feeRate) || 0 : 0;
    return Math.round(p.price * (1 - rate));
  };
  const recalcAllItems = (f) => ({ ...f, items: f.items.map((it) => {
    const unitPrice = priceForType(it.productId, f);
    if (unitPrice === null) return it;
    return { ...it, unitPrice, amount: unitPrice * (Number(it.qty) || 0) };
  }) });
  const setItem = (i, key, val) => setForm((f) => {
    const items = [...f.items];
    items[i] = { ...items[i], [key]: val };
    if (key === "productId") {
      const unitPrice = priceForType(val, f);
      if (unitPrice !== null) items[i] = { ...items[i], unitPrice, amount: unitPrice * (Number(items[i].qty) || 0) };
    }
    if (key === "qty" || key === "unitPrice") {
      items[i].amount = (Number(items[i].qty) || 0) * (Number(items[i].unitPrice) || 0);
    }
    return { ...f, items };
  });
  const addItem = () => setForm((f) => ({ ...f, items: [...f.items, { productId: "", qty: 1, unitPrice: 0, amount: 0, adjustDirection: "increase" }] }));
  const removeItem = (i) => setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));
  const onTypeChange = (e) => {
    const t = e.target.value;
    setForm((f) => {
      let fromLocation = TX_TYPE_MAP[t].needsFrom ? f.fromLocation : "";
      let toLocation = TX_TYPE_MAP[t].needsTo ? f.toLocation : "";
      if (t === "\u30A4\u30D9\u30F3\u30C8") fromLocation = warehouseId;
      if (t === "\u4ED5\u5165" && !toLocation) toLocation = warehouseId;
      if ((t === "\u79FB\u52D5" || t === "\u5728\u5EAB\u6D88\u8FBC" || t === "\u8CB7\u53D6") && !fromLocation) fromLocation = warehouseId;
      if (t === "EC") fromLocation = storesId;
      if (t === "\u59D4\u8A17") fromLocation = "";
      return recalcAllItems({ ...f, type: t, fromLocation, toLocation, eventName: "" });
    });
  };
  const handleSubmit = () => {
    if (saving) return;
    const missing = [];
    if (!form.date) missing.push("\u65E5\u4ED8");
    if (type.needsFrom && !form.fromLocation) missing.push(type.fromLabel || "\u5834\u6240From");
    if (type.needsTo && !form.toLocation) missing.push(type.toLabel || "\u5834\u6240To");
    if (type.sign === "adjust" && !form.toLocation) missing.push("\u5BFE\u8C61\u306E\u5834\u6240");
    if (isEvent && !form.eventName) missing.push("\u30A4\u30D9\u30F3\u30C8\u540D");
    if (!form.items.some((i) => i.productId)) missing.push("\u5546\u54C1(\u5019\u88DC\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044)");
    if (form.items.some((i) => i.productId && !i.qty)) missing.push("\u6570\u91CF");
    if (missing.length) {
      setError(`\u6B21\u306E\u9805\u76EE\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044: ${missing.join("\u3001")}`);
      return;
    }
    setError("");
    const resolvedFeeRate = feeConsignee ? (feeRateNoRecord || updateFeeRate ? feeCurrentRate : feeRecordedRate) : null;
    const feeRateFlag = form.type === "\u59D4\u8A17" && resolvedFeeRate !== null ? { feeRateAtEntry: resolvedFeeRate } : {};
    const validItems = form.items.filter((i) => i.productId);
    const usePair = isBuyout || isEC && form.fromLocation !== warehouseId;
    const batchId = uid("BATCH");
    const skipFlag = willShip && !createShipping ? { _skipShipping: true } : {};
    const deliveryFlag = { _createDeliveryNote: !isEC && willShip && createDeliveryNote, _createInvoice: !isEC && (willShip || isConsignmentSale) && createInvoice };
    const buildPair = (it, bId, extraFlag, existingMoveId, existingSaleId) => {
      const moveId = existingMoveId || uid("T");
      const moveFrom = isBuyout ? form.fromLocation : warehouseId;
      const moveTo = isBuyout ? form.toLocation : form.fromLocation;
      const saleFrom = isBuyout ? form.toLocation : form.fromLocation;
      const moveTx = { id: moveId, date: form.date, type: "\u79FB\u52D5", fromLocation: moveFrom, toLocation: moveTo, productId: it.productId, qty: Number(it.qty) || 0, unitPrice: Number(it.unitPrice) || 0, amount: Number(it.amount) || 0, relatedId: "", enteredBy: form.enteredBy, memo: `[${form.type}\u30FB\u76F4\u9001 \u81EA\u52D5\u8A18\u9332] ${form.memo || ""}`.trim(), batchId: bId, ...isEC ? { _skipShipping: true } : extraFlag, ...deliveryFlag };
      const saleTx = { id: existingSaleId || uid("T"), date: form.date, type: form.type, fromLocation: saleFrom, toLocation: "", productId: it.productId, qty: Number(it.qty) || 0, unitPrice: Number(it.unitPrice) || 0, amount: Number(it.amount) || 0, relatedId: moveId, enteredBy: form.enteredBy, memo: form.memo, batchId: bId };
      return [moveTx, saleTx];
    };
    if (isNew && usePair) {
      const newTx = [];
      for (const it of validItems) newTx.push(...buildPair(it, batchId, skipFlag));
      onSave(newTx);
    } else if (isNew) {
      const newTx = validItems.map((it) => ({ id: uid("T"), date: form.date, type: form.type, fromLocation: form.fromLocation, toLocation: form.toLocation, productId: it.productId, qty: Number(it.qty) || 0, unitPrice: Number(it.unitPrice) || 0, amount: Number(it.amount) || 0, relatedId: form.relatedId, enteredBy: form.enteredBy, memo: form.memo, adjustDirection: type.sign === "adjust" ? it.adjustDirection || "increase" : void 0, eventName: isEvent ? form.eventName : "", ...batchId ? { batchId } : {}, ...skipFlag, ...deliveryFlag }));
      onSave(newTx);
    } else if (isBatchEdit) {
      const updates = [];
      const deleteIds = [];
      const origBatchId = initialBatch[0].batchId;
      const keptSaleIds = new Set(validItems.map((it) => it._saleId).filter(Boolean));
      const keptMoveIds = new Set(validItems.map((it) => it._moveId).filter(Boolean));
      for (const t of initialBatch) {
        const kept = t.type === "\u79FB\u52D5" ? keptMoveIds.has(t.id) : keptSaleIds.has(t.id);
        if (!kept) deleteIds.push(t.id);
      }
      for (const it of validItems) {
        if (usePair) {
          const [moveTx, saleTx] = buildPair(it, origBatchId, {}, it._moveId, it._saleId);
          updates.push(saleTx, moveTx);
        } else {
          updates.push({ id: it._saleId || uid("T"), date: form.date, type: form.type, fromLocation: isEvent ? warehouseId : form.fromLocation, toLocation: form.toLocation, productId: it.productId, qty: Number(it.qty) || 0, unitPrice: Number(it.unitPrice) || 0, amount: Number(it.amount) || 0, relatedId: form.relatedId, enteredBy: form.enteredBy, memo: form.memo, adjustDirection: type.sign === "adjust" ? it.adjustDirection || "increase" : void 0, eventName: isEvent ? form.eventName : "", batchId: origBatchId, ...feeRateFlag });
        }
      }
      const existingIds = new Set(initialBatch.map((t) => t.id));
      const finalUpdates = updates.filter((u) => existingIds.has(u.id));
      const finalCreates = updates.filter((u) => !existingIds.has(u.id));
      onSave({ __batchEdit: true, updates: finalUpdates, creates: finalCreates, deleteIds, editBatchId: origBatchId, updateDeliveryNote: linkedNote ? updateDeliveryNote : false, updateInvoice: linkedInvoice ? updateInvoice : false, updateShipping: linkedShipping ? updateShipping : false });
    } else {
      const it = form.items[0];
      onSave({ ...form, ...feeRateFlag, productId: it.productId, qty: Number(it.qty) || 0, unitPrice: Number(it.unitPrice) || 0, amount: Number(it.amount) || 0, adjustDirection: type.sign === "adjust" ? it.adjustDirection || "increase" : void 0, editBatchId, updateDeliveryNote: linkedNote ? updateDeliveryNote : false, updateInvoice: linkedInvoice ? updateInvoice : false, updateShipping: linkedShipping ? updateShipping : false });
    }
  };
  return <div className="space-y-6">
      <p className="text-xs px-1" style={{ color: "var(--text-muted)" }}>
        種別は2グループ: ①在庫のみ変動
        ②売上を記録(委託・買取・イベント・EC)。買取は場所Toで買取先を選ぶと出荷履歴つきで2件自動記録されます。ECはチャネル(STORESなど)を選ぶと同様に2件、BOUKEN倉庫のままなら1件で記録されます。イベントは常にBOUKEN倉庫の在庫が減り、イベント名で管理します。
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="日付 *" type="date" value={form.date} onChange={set("date")} />
        <Select label="種別 *" value={form.type} onChange={onTypeChange}>
          <TxTypeOptions />
        </Select>
      </div>

      {type.sign === "adjust" ? <>
          <Combobox label="対象の場所 *" options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={form.toLocation} onChange={(v) => setForm((f) => ({ ...f, toLocation: v }))} placeholder="場所を検索…" />
          <p className="text-xs -mt-1 px-1" style={{ color: "var(--text-muted)" }}>
            棚卸で数が合わなかった時の補正用です。数量はプラスの数字のまま入力してください。商品ごとに「増えた/減った」を下で選べます。
          </p>
        </> : isEvent ? <>
          <Input label="イベント名 *" value={form.eventName || ""} onChange={set("eventName")} placeholder="例: デザインフェスタ2026" autoFocus />
          <p className="text-xs -mt-1 px-1" style={{ color: "var(--text-muted)" }}>
            この記録を保存すると、BOUKEN倉庫の在庫がその場で減ります(発送業者などに自動で送られるわけではなく、持ち出して現地で販売する分の在庫反映です)。場所の選択は不要です。イベント名で後から売上を絞り込めます。
          </p>
        </> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Combobox label={`${type.fromLabel || "\u5834\u6240From"} ${type.needsFrom ? "*" : "(\u4E0D\u8981)"}`} options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={form.fromLocation} onChange={(v) => setForm((f) => recalcAllItems({ ...f, fromLocation: v }))} disabled={!type.needsFrom} placeholder={isEC ? "STORES\u306A\u3069\u3001EC\u30C1\u30E3\u30CD\u30EB\u3092\u691C\u7D22\u2026" : "\u5834\u6240\u3092\u691C\u7D22\u2026"} />
          <Combobox label={`${type.toLabel || "\u5834\u6240To"} ${type.needsTo ? "*" : "(\u4E0D\u8981)"}`} options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={form.toLocation} onChange={(v) => setForm((f) => recalcAllItems({ ...f, toLocation: v }))} disabled={!type.needsTo} placeholder={isBuyout ? "\u8CB7\u53D6\u5148\u3092\u691C\u7D22\u2026" : "\u5834\u6240\u3092\u691C\u7D22\u2026"} />
        </div>}
      {isBuyout && form.toLocation && <p className="text-xs -mt-1 px-1" style={{ color: "var(--text-muted)" }}>
          この記録を保存すると「
          {activeConsignees.find((c) => c.id === form.fromLocation)?.name || "\u5834\u6240From"}{" "}
          →{" "}
          {activeConsignees.find((c) => c.id === form.toLocation)?.name || "\u9078\u629E\u3057\u305F\u8CB7\u53D6\u5148"}
          (移動)」と「
          {activeConsignees.find((c) => c.id === form.toLocation)?.name || "\u9078\u629E\u3057\u305F\u8CB7\u53D6\u5148"}
          での売上」の2件が自動作成されます。
        </p>}
      {isEC && form.fromLocation && <p className="text-xs -mt-1 px-1" style={{ color: "var(--text-muted)" }}>
          {form.fromLocation === warehouseId ? "BOUKEN\u5009\u5EAB\u304C\u9078\u3070\u308C\u3066\u3044\u308B\u306E\u3067\u3001\u305D\u306E\u307E\u307E1\u4EF6\u3060\u3051\u8A18\u9332\u3055\u308C\u307E\u3059(\u81EA\u793E\u306E\u76F4\u63A5\u8CA9\u58F2)\u3002" : `\u3053\u306E\u8A18\u9332\u3092\u4FDD\u5B58\u3059\u308B\u3068\u300CBOUKEN\u5009\u5EAB \u2192 ${activeConsignees.find((c) => c.id === form.fromLocation)?.name || "\u9078\u629E\u3057\u305F\u30C1\u30E3\u30CD\u30EB"}(\u79FB\u52D5)\u300D\u3068\u300C${activeConsignees.find((c) => c.id === form.fromLocation)?.name || "\u9078\u629E\u3057\u305F\u30C1\u30E3\u30CD\u30EB"}\u3067\u306E\u58F2\u4E0A\u300D\u306E2\u4EF6\u304C\u81EA\u52D5\u4F5C\u6210\u3055\u308C\u307E\u3059\u3002`}
        </p>}

      {form.type === "\u4ED5\u5165" && form.items.some((it) => it.productId && !(Number(it.unitPrice) > 0)) && <div className="text-xs px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
          原価(単価)が未入力の商品があります。このまま保存すると、商品マスタの原価は更新されません(今の原価が残ります)。
        </div>}

      {(feeRateMismatch || feeRateNoRecord) && <div className="rounded-lg p-3 space-y-2 text-sm" style={{ background: "var(--accent-soft)", border: "1px solid var(--accent)" }}>
          {feeRateNoRecord ? <>
              <p>
                この取引には手数料率の記録がありません。金額欄は自動では変わらないので、必要なら手動で見直してください。
              </p>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "white" }}>
                <span style={{ color: "var(--text-muted)" }}>この取引に記録される手数料率:</span>
                <strong className="text-base" style={{ color: "var(--accent2)" }}>
                  {(feeCurrentRate * 100).toFixed(1)}%
                </strong>
              </div>
            </> : <>
              <p>
                記録時の手数料率と、今の委託先マスタの手数料率が異なります。チェックすると、下の金額欄もこの比率で自動的に再計算されます(数量や商品自体の変更はチェック後にどうぞ)。
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={updateFeeRate} onChange={(e) => toggleUpdateFeeRate(e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />
                <span>今の{(feeCurrentRate * 100).toFixed(1)}%に更新する</span>
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "white" }}>
                <span style={{ color: "var(--text-muted)" }}>この取引に記録される手数料率:</span>
                <strong className="text-base" style={{ color: updateFeeRate ? "var(--accent2)" : "var(--ink)" }}>
                  {((updateFeeRate ? feeCurrentRate : feeRecordedRate) * 100).toFixed(1)}%
                </strong>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  ({updateFeeRate ? "\u66F4\u65B0\u5F8C" : "\u5143\u306E\u307E\u307E"})
                </span>
              </div>
            </>}
        </div>}

      {willShip && <div className={isBuyout ? "grid grid-cols-1 sm:grid-cols-3 gap-2" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
          <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createShipping ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createShipping ? "var(--accent)" : "var(--border)"}` }}>
            <input type="checkbox" checked={createShipping} onChange={(e) => setCreateShipping(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
            <span className="text-sm">
              <strong style={{ color: "var(--ink)" }}>
                発送依頼を作成する
              </strong>
              <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                チェックすると「発送依頼・確認リスト」に自動で追加されます
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createDeliveryNote ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createDeliveryNote ? "var(--accent)" : "var(--border)"}` }}>
            <input type="checkbox" checked={createDeliveryNote} onChange={(e) => setCreateDeliveryNote(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
            <span className="text-sm">
              <strong style={{ color: "var(--ink)" }}>納品書を作成する</strong>
              <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                チェックすると「納品書一覧」に自動で追加されます
              </span>
            </span>
          </label>
          {isBuyout && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createInvoice ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createInvoice ? "var(--accent)" : "var(--border)"}` }}>
              <input type="checkbox" checked={createInvoice} onChange={(e) => setCreateInvoice(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
              <span className="text-sm">
                <strong style={{ color: "var(--ink)" }}>請求書を作成する</strong>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  チェックすると、この1件分だけで「請求書一覧」に自動で追加されます(通常は後でまとめて発行するのでOFF推奨)
                </span>
              </span>
            </label>}
        </div>}

      {isConsignmentSale && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createInvoice ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createInvoice ? "var(--accent)" : "var(--border)"}` }}>
          <input type="checkbox" checked={createInvoice} onChange={(e) => setCreateInvoice(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
          <span className="text-sm">
            <strong style={{ color: "var(--ink)" }}>請求書を作成する</strong>
            <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              チェックすると、この売上分だけで「請求書一覧」に自動で追加されます(送付待ちのまま置いておき、まとまったら合算して送付できます)
            </span>
          </span>
        </label>}

      {(linkedNote || linkedInvoice || linkedShipping) && <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {linkedShipping && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: updateShipping ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${updateShipping ? "var(--accent)" : "var(--border)"}` }}>
              <input type="checkbox" checked={updateShipping} onChange={(e) => setUpdateShipping(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
              <span className="text-sm">
                <strong style={{ color: "var(--ink)" }}>発送依頼の数量も最新にする</strong>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  締切・担当者・サンプル数などはそのまま残ります
                </span>
              </span>
            </label>}
          {linkedNote && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: updateDeliveryNote ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${updateDeliveryNote ? "var(--accent)" : "var(--border)"}` }}>
              <input type="checkbox" checked={updateDeliveryNote} onChange={(e) => setUpdateDeliveryNote(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
              <span className="text-sm">
                <strong style={{ color: "var(--ink)" }}>納品書({linkedNote.number})も最新の内容に更新する</strong>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  古い番号は一覧から消え、新しい番号で作り直されます
                </span>
              </span>
            </label>}
          {linkedInvoice && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: updateInvoice ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${updateInvoice ? "var(--accent)" : "var(--border)"}` }}>
              <input type="checkbox" checked={updateInvoice} onChange={(e) => setUpdateInvoice(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
              <span className="text-sm">
                <strong style={{ color: "var(--ink)" }}>請求書({linkedInvoice.number})も最新の内容に更新する</strong>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  古い番号は一覧から消え、新しい番号で作り直されます
                </span>
              </span>
            </label>}
        </div>}

      <div>
        {form.items.length > 1 && <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
            商品 {form.items.length}件
          </div>}
        <div className="space-y-3">
          {form.items.map((it, i) => <div key={i} className={form.items.length > 1 ? "p-3 rounded-md space-y-2" : "space-y-2"} style={form.items.length > 1 ? { background: "var(--paper)", border: "1px solid var(--border)" } : void 0}>
              {form.items.length > 1 && <div className="flex justify-end -mt-1 -mr-1">
                  <button type="button" className="p-1 rounded hover:bg-black/5" onClick={() => removeItem(i)}>
                    <Trash2 size={13} style={{ color: "var(--danger)" }} />
                  </button>
                </div>}
              <Combobox label="商品 *" options={products.map((p) => ({ value: p.id, label: p.name, sublabel: [p.furigana, p.genre].filter(Boolean).join(" ") }))} value={it.productId} onChange={(v) => setItem(i, "productId", v)} placeholder="商品名を入力して検索…" />
              {type.sign === "adjust" && <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button type="button" onClick={() => setItem(i, "adjustDirection", "increase")} className="px-3 py-1.5 rounded-lg text-xs font-medium border-2" style={{ borderColor: (it.adjustDirection || "increase") === "increase" ? "var(--success)" : "var(--border)", background: (it.adjustDirection || "increase") === "increase" ? "var(--success-soft)" : "white", color: (it.adjustDirection || "increase") === "increase" ? "var(--success)" : "var(--text)" }}>
                    ＋ 増えた
                  </button>
                  <button type="button" onClick={() => setItem(i, "adjustDirection", "decrease")} className="px-3 py-1.5 rounded-lg text-xs font-medium border-2" style={{ borderColor: it.adjustDirection === "decrease" ? "var(--danger)" : "var(--border)", background: it.adjustDirection === "decrease" ? "var(--danger-soft)" : "white", color: it.adjustDirection === "decrease" ? "var(--danger)" : "var(--text)" }}>
                    － 減った
                  </button>
                </div>}
              {showStockHint && it.productId && (() => {
    const p = products.find((pp) => pp.id === it.productId);
    const stock = inventory?.[it.productId]?.[warehouseId] || 0;
    const low = stock <= (Number(p?.reorderPoint) || 0);
    return <p className="text-xs -mt-1" style={{ color: stock <= 0 ? "var(--danger)" : low ? "var(--accent)" : "var(--text-muted)" }}>
                      BOUKEN倉庫の在庫: {formatNum(stock)}個
                      {stock <= 0 ? "(\u5728\u5EAB\u30BC\u30ED)" : low ? "(\u6B8B\u308A\u308F\u305A\u304B)" : ""}
                    </p>;
  })()}
              {isRevenueTx({ type: form.type }) || form.type === "\u4ED5\u5165" ? <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input label="数量 *" type="number" value={it.qty} onChange={(e) => setItem(i, "qty", e.target.value)} />
                  <Input label={form.type === "\u4ED5\u5165" ? "単価(原価)" : "単価(手取り)"} type="number" value={it.unitPrice} onChange={(e) => setItem(i, "unitPrice", e.target.value)} />
                  <Input label={form.type === "\u4ED5\u5165" ? "金額(原価合計)" : "金額(手取り合計)"} type="number" value={it.amount} onChange={(e) => setItem(i, "amount", e.target.value)} />
                </div> : <Input label="数量 *" type="number" value={it.qty} onChange={(e) => setItem(i, "qty", e.target.value)} />}
              {form.type === "\u4ED5\u5165" && Number(it.unitPrice) === 0 && it.productId && <p className="text-xs -mt-1" style={{ color: "var(--accent)" }}>
                  単価が0円のままだと、この仕入は原価の自動計算に反映されません
                </p>}
            </div>)}
        </div>
        {(isNew || isBatchEdit) && <button type="button" className="text-xs underline mt-2" style={{ color: "var(--accent2)" }} onClick={addItem}>
            + 商品を追加
          </button>}
        {isRevenueTx({ type: form.type }) && <p className="text-xs mt-1 px-1" style={{ color: "var(--text-muted)" }}>
            単価は場所の手数料率を引いた「手取り額」で自動計算されます(委託先マスタの手数料率を使用)。必要に応じて上書きできます。
          </p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="関連ID" value={form.relatedId} onChange={set("relatedId")} placeholder="返却元の取引IDなど" />
        <Input label="入力者" value={form.enteredBy} onChange={set("enteredBy")} />
      </div>
      <Input label="メモ" value={form.memo} onChange={set("memo")} />
      {error && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
          {error}
        </div>}
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel} disabled={saving}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check} disabled={saving}>
          {saving ? "記録中…" : "記録する"}
        </Button>
      </div>
    </div>;
}
const ORDER_HEADER_LABELS = ["\u5546\u54C1\u540D", "\u767A\u6CE8\u6570", "\u6570\u91CF", "\u54C1\u540D", "\u500B\u6570", "\u5546\u54C1", "order", "qty"];
const MODE_LABELS = { table: "\u8868\u5F62\u5F0F(\u30BF\u30D6/CSV\u533A\u5207\u308A)", pairs: "1\u5217\u5F62\u5F0F(\u5546\u54C1\u540D/\u6570\u91CF\u304C\u5225\u3005\u306E\u884C)", line: "1\u884C\u5F62\u5F0F(\u5546\u54C1\u540D \u6570\u91CF)" };
function detectPasteMode(text) {
  const cleaned = extractTabularBlock(text);
  const firstLine = cleaned.split(/\r?\n/, 1)[0] || "";
  if (firstLine.includes("	")) return "table";
  if ((firstLine.match(/,/g) || []).length >= 1) return "table";
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const dataLines = lines.filter((l) => !ORDER_HEADER_LABELS.includes(l));
  if (!dataLines.length) return "table";
  const lineMatches = dataLines.filter((l) => NAME_QTY_LINE_RE.test(l)).length;
  return lineMatches / dataLines.length > 0.6 ? "line" : "pairs";
}
const BulkAddTransactions = forwardRef(function BulkAddTransactions2({ products, consignees, onAdd, onCountChange }, ref) {
  const activeConsignees = consignees.filter((c) => c.status !== "\u9589\u5E97" && c.status !== "\u4F11\u6B62");
  const warehouseId = useMemo(() => findWarehouse(consignees)?.id || "", [consignees]);
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState(null);
  const [pairRows, setPairRows] = useState(null);
  const [detectedMode, setDetectedMode] = useState(null);
  const [manualMode, setManualMode] = useState(null);
  const [showModeSwitch, setShowModeSwitch] = useState(false);
  const [mapping, setMapping] = useState({ date: "", productName: "", qty: "", unitPrice: "", amount: "", memo: "" });
  const [overrides, setOverrides] = useState({});
  const [removedIndices, setRemovedIndices] = useState(() => /* @__PURE__ */ new Set());
  const [qtyOverrides, setQtyOverrides] = useState({});
  const [amountOverrides, setAmountOverrides] = useState({});
  const [sharedType, setSharedType] = useState("\u4ED5\u5165");
  const [sharedFromLocation, setSharedFromLocation] = useState("");
  const [sharedToLocation, setSharedToLocation] = useState(warehouseId);
  const [sharedEventName, setSharedEventName] = useState("");
  const [sharedAdjustDirection, setSharedAdjustDirection] = useState("increase");
  const [sharedDate, setSharedDate] = useState(todayStr());
  const [createShipping, setCreateShipping] = useState(true);
  const [createDeliveryNote, setCreateDeliveryNote] = useState(true);
  const [createInvoice, setCreateInvoice] = useState(() => sharedType === "\u59D4\u8A17");
  useEffect(() => {
    if (sharedType === "\u59D4\u8A17") setCreateInvoice(true);
  }, [sharedType]);
  const typeInfo = TX_TYPE_MAP[sharedType];
  const effectiveMode = manualMode || detectedMode;
  const storesId = useMemo(() => findStores(consignees)?.id || "", [consignees]);
  const isBuyout = sharedType === "\u8CB7\u53D6";
  const isEC = sharedType === "EC";
  const isEvent = sharedType === "\u30A4\u30D9\u30F3\u30C8";
  const isConsignmentSale = sharedType === "\u59D4\u8A17";
  const willShip = sharedType === "\u79FB\u52D5" && sharedToLocation && sharedToLocation !== warehouseId || isBuyout && sharedToLocation && sharedToLocation !== sharedFromLocation;
  const runParse = (modeOverride) => {
    if (!raw.trim()) {
      setParsed(null);
      setPairRows(null);
      setDetectedMode(null);
      return;
    }
    const mode = modeOverride || manualMode || detectPasteMode(raw);
    setDetectedMode(mode);
    setOverrides({});
    setRemovedIndices(/* @__PURE__ */ new Set());
    setQtyOverrides({});
    setAmountOverrides({});
    if (mode === "table") {
      const p = parseDelimited(raw);
      setParsed(p);
      setPairRows(null);
      const guess = (cands) => p.headers.find((h) => cands.some((c) => h.includes(c))) || "";
      setMapping({ date: guess(["\u65E5\u4ED8", "date"]), productName: guess(["\u5546\u54C1\u540D", "\u5546\u54C1", "\u54C1\u540D"]), qty: guess(["\u6570\u91CF", "\u500B\u6570", "qty"]), unitPrice: guess(["\u5358\u4FA1", "price"]), amount: guess(["\u91D1\u984D", "amount"]), memo: guess(["\u30E1\u30E2", "\u5099\u8003"]) });
    } else {
      setParsed(null);
      const parsedPairs = mode === "line" ? parseNameQtyLines(raw, ORDER_HEADER_LABELS) : parseAlternatingLines(raw, ORDER_HEADER_LABELS);
      setPairRows(parsedPairs.filter((pr) => pr.name).map((pr, idx) => ({ idx, productName: pr.name, qty: Number(pr.value) || 1, matched: matchProductByName(pr.name, products) })));
    }
  };
  const switchMode = (m) => {
    setManualMode(m);
    setShowModeSwitch(false);
    runParse(m);
  };
  const [manualRows, setManualRows] = useState([]);
  const rows = useMemo(() => {
    let feeRate = 0;
    if (isRevenueTx({ type: sharedType })) {
      const locId = isBuyout ? sharedToLocation : sharedFromLocation;
      const c = consignees.find((cc) => cc.id === locId);
      feeRate = c ? Number(c.feeRate) || 0 : 0;
    }
    const productById = Object.fromEntries(products.map((p) => [p.id, p]));
    const resolveProduct = (idx, autoMatched) => {
      const overrideId = overrides[idx];
      if (overrideId !== void 0 && overrideId !== "") return productById[overrideId] || null;
      return autoMatched;
    };
    const unitPriceFor = (p) => p && isRevenueTx({ type: sharedType }) ? Math.round((p.price || 0) * (1 - feeRate)) : 0;
    const applyOverrides = (idx, qty, unitPrice, amount, amountWasExplicit) => {
      let finalQty = qty, finalAmount = amount;
      if (qtyOverrides[idx] !== void 0) {
        finalQty = Number(qtyOverrides[idx]) || 0;
        finalAmount = amountWasExplicit ? amount : finalQty * unitPrice;
      }
      if (amountOverrides[idx] !== void 0) finalAmount = Number(amountOverrides[idx]) || 0;
      return { qty: finalQty, amount: finalAmount };
    };
    if (effectiveMode === "table") {
      if (!parsed || !mapping.productName) return manualRows.map((mr) => ({ idx: mr.id, productName: productById[mr.productId]?.name || "", qty: mr.qty, date: sharedDate || todayStr(), unitPrice: unitPriceFor(productById[mr.productId]), amount: mr.qty * unitPriceFor(productById[mr.productId]), memo: "", matched: productById[mr.productId] || null, isManual: true }));
      return [...parsed.records.map((rec, idx) => {
        const productName = (rec[mapping.productName] || "").trim();
        const autoMatched = matchProductByName(productName, products);
        const matched = resolveProduct(idx, autoMatched);
        const qty = mapping.qty ? Number(rec[mapping.qty]) || 1 : 1;
        const date = (mapping.date ? (rec[mapping.date] || "").slice(0, 10) : "") || sharedDate || todayStr();
        const unitPrice = mapping.unitPrice ? Number(rec[mapping.unitPrice]) || 0 : unitPriceFor(matched);
        const amount = mapping.amount ? Number(String(rec[mapping.amount] || "0").replace(/[^0-9.-]/g, "")) || 0 : qty * unitPrice;
        const memo = mapping.memo ? (rec[mapping.memo] || "").trim() : "";
        const adj = applyOverrides(idx, qty, unitPrice, amount, !!mapping.amount);
        return { idx, productName, qty: adj.qty, date, unitPrice, amount: adj.amount, memo, matched: autoMatched };
      }), ...manualRows.map((mr) => ({ idx: mr.id, productName: productById[mr.productId]?.name || "", qty: mr.qty, date: sharedDate || todayStr(), unitPrice: unitPriceFor(productById[mr.productId]), amount: mr.qty * unitPriceFor(productById[mr.productId]), memo: "", matched: productById[mr.productId] || null, isManual: true }))];
    }
    const parsedRows = !pairRows ? [] : pairRows.map((pr) => {
      const matched = resolveProduct(pr.idx, pr.matched);
      const unitPrice = unitPriceFor(matched);
      const baseAmount = pr.qty * unitPrice;
      const adj = applyOverrides(pr.idx, pr.qty, unitPrice, baseAmount, false);
      return { idx: pr.idx, productName: pr.productName, qty: adj.qty, date: sharedDate || todayStr(), unitPrice, amount: adj.amount, memo: "", matched: pr.matched };
    });
    return [...parsedRows, ...manualRows.map((mr) => ({ idx: mr.id, productName: productById[mr.productId]?.name || "", qty: mr.qty, date: sharedDate || todayStr(), unitPrice: unitPriceFor(productById[mr.productId]), amount: mr.qty * unitPriceFor(productById[mr.productId]), memo: "", matched: productById[mr.productId] || null, isManual: true }))];
  }, [effectiveMode, parsed, pairRows, mapping, sharedDate, sharedType, sharedFromLocation, sharedToLocation, isBuyout, consignees, products, qtyOverrides, amountOverrides, overrides, manualRows]);
  const validRows = rows.filter((r) => (r.matched || overrides[r.idx]) && !removedIndices.has(r.idx));
  const locationOk = typeInfo.sign === "adjust" ? !!sharedToLocation : isEvent ? !!sharedEventName : (!typeInfo.needsFrom || !!sharedFromLocation) && (!typeInfo.needsTo || !!sharedToLocation);
  useEffect(() => {
    onCountChange?.(locationOk ? validRows.length : 0);
  }, [validRows.length, locationOk, onCountChange]);
  useImperativeHandle(ref, () => ({ confirm: () => {
    const newTx = [];
    const batchId = uid("BATCH");
    const skipFlag = willShip && !createShipping ? { _skipShipping: true } : {};
    const deliveryFlag = { _createDeliveryNote: !isEC && willShip && createDeliveryNote, _createInvoice: !isEC && (willShip || isConsignmentSale) && createInvoice };
    const usePair = isBuyout || isEC && sharedFromLocation !== warehouseId;
    for (const r of validRows) {
      const productId = overrides[r.idx] !== void 0 ? overrides[r.idx] : r.matched?.id || "";
      if (usePair) {
        const moveId = uid("T");
        const moveFrom = isBuyout ? sharedFromLocation : warehouseId;
        const moveTo = isBuyout ? sharedToLocation : sharedFromLocation;
        const saleFrom = isBuyout ? sharedToLocation : sharedFromLocation;
        newTx.push({ id: moveId, date: r.date, type: "\u79FB\u52D5", fromLocation: moveFrom, toLocation: moveTo, productId, qty: r.qty, unitPrice: r.unitPrice, amount: r.amount, relatedId: "", enteredBy: "\u307E\u3068\u3081\u3066\u8FFD\u52A0", memo: `[${sharedType}\u30FB\u76F4\u9001 \u81EA\u52D5\u8A18\u9332] ${r.memo || ""}`.trim(), batchId, ...isEC ? { _skipShipping: true } : skipFlag, ...deliveryFlag });
        newTx.push({ id: uid("T"), date: r.date, type: sharedType, fromLocation: saleFrom, toLocation: "", productId, qty: r.qty, unitPrice: r.unitPrice, amount: r.amount, relatedId: moveId, enteredBy: "\u307E\u3068\u3081\u3066\u8FFD\u52A0", memo: r.memo, batchId });
      } else if (typeInfo.sign === "adjust") {
        newTx.push({ id: uid("T"), date: r.date, type: sharedType, fromLocation: "", toLocation: sharedToLocation, productId, qty: r.qty, unitPrice: r.unitPrice, amount: r.amount, relatedId: "", enteredBy: "\u307E\u3068\u3081\u3066\u8FFD\u52A0", memo: r.memo, adjustDirection: sharedAdjustDirection, batchId });
      } else {
        newTx.push({ id: uid("T"), date: r.date, type: sharedType, fromLocation: isEvent ? warehouseId : typeInfo.needsFrom ? sharedFromLocation : "", toLocation: typeInfo.needsTo ? sharedToLocation : "", productId, qty: r.qty, unitPrice: r.unitPrice, amount: r.amount, relatedId: "", enteredBy: "\u307E\u3068\u3081\u3066\u8FFD\u52A0", memo: r.memo, eventName: isEvent ? sharedEventName : "", batchId, ...skipFlag, ...deliveryFlag });
      }
    }
    onAdd(newTx);
  } }), [validRows, overrides, sharedType, sharedFromLocation, sharedToLocation, sharedEventName, sharedAdjustDirection, isBuyout, isEC, isEvent, isConsignmentSale, willShip, createShipping, createDeliveryNote, createInvoice, warehouseId, typeInfo, onAdd]);
  return <div className="space-y-4">
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
        増刷入庫・棚卸などをまとめて記録できます。表・1列・1行のどの形式でも自動判定します。商品名は商品マスタと自動照合します。
      </p>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        種別は2グループ: ①在庫のみ変動
        ②売上を記録(委託・買取・イベント・EC)。買取は場所Toで買取先を選ぶと2件ずつ自動記録されます。ECはチャネル(STORESなど)ならそのまま2件、BOUKEN倉庫のままなら1件で記録されます。
      </p>

      <Select label="種別(全行に適用)" value={sharedType} onChange={(e) => {
    const t = e.target.value;
    setSharedType(t);
    setSharedEventName("");
    let nextFrom = sharedFromLocation;
    let nextTo = sharedToLocation;
    if (t === "\u30A4\u30D9\u30F3\u30C8") nextFrom = warehouseId;
    else if ((t === "\u79FB\u52D5" || t === "\u5728\u5EAB\u6D88\u8FBC" || t === "\u8CB7\u53D6") && !nextFrom) nextFrom = warehouseId;
    else if (t === "EC") nextFrom = storesId;
    else if (t === "\u59D4\u8A17") nextFrom = "";
    else if (nextFrom === warehouseId && !["\u79FB\u52D5", "\u5728\u5EAB\u6D88\u8FBC", "\u8CB7\u53D6"].includes(t)) nextFrom = "";
    if (t !== "\u8CB7\u53D6" && t !== "\u4ED5\u5165" && t !== "\u79FB\u52D5") nextTo = "";
    if (t === "\u8CB7\u53D6" && nextTo === warehouseId) nextTo = "";
    setSharedFromLocation(nextFrom);
    setSharedToLocation(nextTo);
  }}>
        <TxTypeOptions />
      </Select>

      {isRevenueTx({ type: sharedType }) && <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          単価は選んだ場所の手数料率を引いた「手取り額」で自動計算されます(委託先マスタの手数料率を使用。BOUKEN倉庫は0%なので満額になります)。
        </p>}

      {sharedType === "\u4ED5\u5165" && validRows.some((r) => !(Number(r.unitPrice) > 0)) && <div className="text-xs px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
          原価(単価)が未入力の行があります。このまま保存すると、該当商品の商品マスタの原価は更新されません(今の原価が残ります)。
        </div>}

      {typeInfo.sign === "adjust" ? <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button type="button" onClick={() => setSharedAdjustDirection("increase")} className="px-3 py-2 rounded-lg text-sm font-medium border-2" style={{ borderColor: sharedAdjustDirection === "increase" ? "var(--success)" : "var(--border)", background: sharedAdjustDirection === "increase" ? "var(--success-soft)" : "white", color: sharedAdjustDirection === "increase" ? "var(--success)" : "var(--text)" }}>
              ＋ 増えた(在庫が見つかった)
            </button>
            <button type="button" onClick={() => setSharedAdjustDirection("decrease")} className="px-3 py-2 rounded-lg text-sm font-medium border-2" style={{ borderColor: sharedAdjustDirection === "decrease" ? "var(--danger)" : "var(--border)", background: sharedAdjustDirection === "decrease" ? "var(--danger-soft)" : "white", color: sharedAdjustDirection === "decrease" ? "var(--danger)" : "var(--text)" }}>
              － 減った(在庫が足りなかった)
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            <Combobox label="対象の場所(全行に適用) *" options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={sharedToLocation} onChange={setSharedToLocation} placeholder="場所を検索…" />
            <Input label="日付(表に列がなければこちらを使用)" type="date" value={sharedDate} onChange={(e) => setSharedDate(e.target.value)} />
          </div>
          <p className="text-xs -mt-2" style={{ color: "var(--text-muted)" }}>
            数量はプラスの数字のまま入力してください。
          </p>
        </> : isEvent ? <>
          <div className="grid md:grid-cols-2 gap-3">
            <Input label="イベント名(全行に適用) *" value={sharedEventName} onChange={(e) => setSharedEventName(e.target.value)} placeholder="例: デザインフェスタ2026" />
            <Input label="日付(表に列がなければこちらを使用)" type="date" value={sharedDate} onChange={(e) => setSharedDate(e.target.value)} />
          </div>
          <p className="text-xs -mt-2" style={{ color: "var(--text-muted)" }}>
            在庫はBOUKEN倉庫から自動で減ります(場所の選択は不要です)。イベント名で後から売上を絞り込めます。
          </p>
        </> : <div className="grid md:grid-cols-3 gap-3">
          <Combobox label={`${typeInfo.fromLabel || "\u5834\u6240From"}(\u5168\u884C\u306B\u9069\u7528) ${typeInfo.needsFrom ? "*" : "(\u4E0D\u8981)"}`} options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={sharedFromLocation} onChange={setSharedFromLocation} disabled={!typeInfo.needsFrom} placeholder={isEC ? "STORES\u306A\u3069\u3001EC\u30C1\u30E3\u30CD\u30EB\u3092\u691C\u7D22\u2026" : "\u5834\u6240\u3092\u691C\u7D22\u2026"} />
          {typeInfo.needsTo && <Combobox label={`${typeInfo.toLabel || "\u5834\u6240To"}(\u5168\u884C\u306B\u9069\u7528) *`} options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={sharedToLocation} onChange={setSharedToLocation} placeholder={isBuyout ? "\u8CB7\u53D6\u5148\u3092\u691C\u7D22\u2026" : "\u5834\u6240\u3092\u691C\u7D22\u2026"} />}
          <Input label="日付(表に列がなければこちらを使用)" type="date" value={sharedDate} onChange={(e) => setSharedDate(e.target.value)} />
        </div>}
      {isBuyout && sharedFromLocation && sharedToLocation && <p className="text-xs -mt-2" style={{ color: "var(--text-muted)" }}>
          「
          {activeConsignees.find((c) => c.id === sharedFromLocation)?.name || "\u5834\u6240From"}{" "}
          →{" "}
          {activeConsignees.find((c) => c.id === sharedToLocation)?.name || "\u9078\u629E\u3057\u305F\u8CB7\u53D6\u5148"}
          (移動)」と「
          {activeConsignees.find((c) => c.id === sharedToLocation)?.name || "\u9078\u629E\u3057\u305F\u8CB7\u53D6\u5148"}
          での売上」の2件が各行ごとに自動記録されます。
        </p>}
      {isEC && sharedFromLocation && <p className="text-xs -mt-2" style={{ color: "var(--text-muted)" }}>
          {sharedFromLocation === warehouseId ? "BOUKEN\u5009\u5EAB\u304C\u9078\u3070\u308C\u3066\u3044\u308B\u306E\u3067\u3001\u5404\u884C1\u4EF6\u305A\u3064\u3060\u3051\u8A18\u9332\u3055\u308C\u307E\u3059(\u81EA\u793E\u306E\u76F4\u63A5\u8CA9\u58F2)\u3002" : "BOUKEN\u5009\u5EAB\u304B\u3089\u306E\u79FB\u52D5\u3068\u3001\u9078\u3093\u3060\u5834\u6240\u3067\u306E\u58F2\u4E0A\u306E2\u4EF6\u304C\u5404\u884C\u3054\u3068\u306B\u81EA\u52D5\u8A18\u9332\u3055\u308C\u307E\u3059\u3002"}
        </p>}
      {willShip && <div className={isBuyout ? "grid grid-cols-1 sm:grid-cols-3 gap-2" : "grid grid-cols-1 sm:grid-cols-2 gap-2"}>
          <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createShipping ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createShipping ? "var(--accent)" : "var(--border)"}` }}>
            <input type="checkbox" checked={createShipping} onChange={(e) => setCreateShipping(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
            <span className="text-sm">
              <strong style={{ color: "var(--ink)" }}>
                発送依頼を作成する
              </strong>
              <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                チェックすると「発送依頼・確認リスト」に自動で追加されます
              </span>
            </span>
          </label>
          <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createDeliveryNote ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createDeliveryNote ? "var(--accent)" : "var(--border)"}` }}>
            <input type="checkbox" checked={createDeliveryNote} onChange={(e) => setCreateDeliveryNote(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
            <span className="text-sm">
              <strong style={{ color: "var(--ink)" }}>納品書を作成する</strong>
              <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                チェックすると「納品書一覧」に自動で追加されます
              </span>
            </span>
          </label>
          {isBuyout && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createInvoice ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createInvoice ? "var(--accent)" : "var(--border)"}` }}>
              <input type="checkbox" checked={createInvoice} onChange={(e) => setCreateInvoice(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
              <span className="text-sm">
                <strong style={{ color: "var(--ink)" }}>請求書を作成する</strong>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  チェックすると、まとめたこの分だけで「請求書一覧」に自動で追加されます(通常は後でまとめて発行するのでOFF推奨)
                </span>
              </span>
            </label>}
        </div>}

      {isConsignmentSale && <label className="flex items-start gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition" style={{ background: createInvoice ? "var(--accent-soft)" : "var(--paper)", border: `2px solid ${createInvoice ? "var(--accent)" : "var(--border)"}` }}>
          <input type="checkbox" checked={createInvoice} onChange={(e) => setCreateInvoice(e.target.checked)} className="mt-0.5" style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
          <span className="text-sm">
            <strong style={{ color: "var(--ink)" }}>請求書を作成する</strong>
            <span className="block text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
              チェックすると、この売上分だけで「請求書一覧」に自動で追加されます(送付待ちのまま置いておき、まとまったら合算して送付できます)
            </span>
          </span>
        </label>}

      <FilePasteRow onText={setRaw} allowPdf />
      <p className="text-xs -mt-1" style={{ color: "var(--text-muted)" }}>
        PDFはレイアウトによって読み取り結果が崩れることがあります。下の欄で内容を確認・修正してから解析してください。
      </p>
      <textarea value={raw} onChange={(e) => setRaw(e.target.value)} placeholder={"\u65E5\u4ED8	\u5546\u54C1\u540D	\u6570\u91CF\n2026-07-04	\u5947\u5999\u306A\u767A\u660E\u5BB6\u306E\u5BB6	50\n\n(\u307E\u305F\u306F)\nHOTEL\u3046\u305F\u305F\u306D\u300050\n\u55AB\u8336\u30B3\u30DE\u30C9\u30EA\u300030"} className="w-full h-36 rounded-md border p-2 text-xs font-mono outline-none" style={{ borderColor: "var(--border)" }} />
      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="ghost" onClick={() => runParse()} disabled={!raw.trim()}>
          貼り付けた内容を解析する
        </Button>
        {effectiveMode && <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>
              検出した形式：
              <strong style={{ color: "var(--ink)" }}>
                {MODE_LABELS[effectiveMode]}
              </strong>
            </span>
            <button type="button" className="underline" style={{ color: "var(--accent2)" }} onClick={() => setShowModeSwitch((s) => !s)}>
              違う場合はこちら
            </button>
          </div>}
      </div>
      {showModeSwitch && <div className="flex gap-2 flex-wrap">
          {Object.entries(MODE_LABELS).map(([m, label]) => <button key={m} type="button" onClick={() => switchMode(m)} className="px-3 py-1.5 rounded text-xs font-medium border" style={{ borderColor: "var(--border)", background: effectiveMode === m ? "var(--paper)" : "white" }}>
              {label}
            </button>)}
        </div>}

      {effectiveMode === "table" && parsed && <div className="grid md:grid-cols-3 gap-2">
          <Select label="日付の列" value={mapping.date} onChange={(e) => setMapping((m) => ({ ...m, date: e.target.value }))}>
            <option value="">(なし・上の既定値を使用)</option>
            {parsed.headers.map((h) => <option key={h} value={h}>
                {h}
              </option>)}
          </Select>
          <Select label="商品名の列 *" value={mapping.productName} onChange={(e) => setMapping((m) => ({ ...m, productName: e.target.value }))}>
            <option value="">選択してください</option>
            {parsed.headers.map((h) => <option key={h} value={h}>
                {h}
              </option>)}
          </Select>
          <Select label="数量の列" value={mapping.qty} onChange={(e) => setMapping((m) => ({ ...m, qty: e.target.value }))}>
            <option value="">(なし・1個扱い)</option>
            {parsed.headers.map((h) => <option key={h} value={h}>
                {h}
              </option>)}
          </Select>
          {!["\u79FB\u52D5", "\u68DA\u5378\u8ABF\u6574", "\u5728\u5EAB\u6D88\u8FBC"].includes(sharedType) && <Select label="単価の列" value={mapping.unitPrice} onChange={(e) => setMapping((m) => ({ ...m, unitPrice: e.target.value }))}>
              <option value="">{sharedType === "\u4ED5\u5165" ? "(なし・0円のまま。後で行ごとに入力してください)" : "(なし・商品マスタの卸金額を使用)"}</option>
              {parsed.headers.map((h) => <option key={h} value={h}>
                  {h}
                </option>)}
            </Select>}
          {!["\u79FB\u52D5", "\u68DA\u5378\u8ABF\u6574", "\u5728\u5EAB\u6D88\u8FBC"].includes(sharedType) && <Select label="金額の列" value={mapping.amount} onChange={(e) => setMapping((m) => ({ ...m, amount: e.target.value }))}>
              <option value="">(なし・数量×単価で自動計算)</option>
              {parsed.headers.map((h) => <option key={h} value={h}>
                  {h}
                </option>)}
            </Select>}
          <Select label="メモの列" value={mapping.memo} onChange={(e) => setMapping((m) => ({ ...m, memo: e.target.value }))}>
            <option value="">(なし)</option>
            {parsed.headers.map((h) => <option key={h} value={h}>
                {h}
              </option>)}
          </Select>
        </div>}

      <div>
        <Button variant="ghost" size="sm" icon={Plus} onClick={() => setManualRows((prev) => [...prev, { id: uid("MR"), productId: "", qty: 1 }])}>
          手動で行を追加
        </Button>
        <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
          貼り付けで拾えなかった商品は、ここから追加して一覧の中で選択・数量調整できます
        </span>
      </div>

      {rows.length > 0 && <>
          <div className="text-sm" style={{ color: "var(--success)" }}>
            {rows.length}件検出（商品照合できたもの：{validRows.length}件）
            {removedIndices.size > 0 && <>
                {" "}
                ・{removedIndices.size}件を削除済み
                <button type="button" className="underline ml-1" style={{ color: "var(--accent2)" }} onClick={() => setRemovedIndices(/* @__PURE__ */ new Set())}>
                  すべて元に戻す
                </button>
              </>}
          </div>
          {!locationOk && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
              場所が選択されていません。上の
              {isBuyout ? "\u300C\u8CB7\u53D6\u5148\u30FB\u767A\u9001\u5148\u300D" : "\u300C\u5834\u6240From\u300D\u300C\u5834\u6240To\u300D"}
              を選ぶまで登録できません(委託先の手数料率が正しく反映されず、金額が正しく計算できないためです)。
            </div>}
          <div className="overflow-y-auto zk-scrollbar max-h-64 border rounded-md" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-xs">
              <thead style={{ background: "var(--paper)" }}>
                <tr className="text-left">
                  <th className="py-1.5 px-2">日付</th>
                  <th className="py-1.5 px-2">貼り付け元の商品名</th>
                  <th className="py-1.5 px-2 text-right">数量</th>
                  <th className="py-1.5 px-2 text-right">金額</th>
                  <th className="py-1.5 px-2">照合先商品</th>
                  <th className="py-1.5 px-2" />
                </tr>
              </thead>
              <tbody>
                {rows.filter((r) => !removedIndices.has(r.idx)).map((r) => <tr key={r.idx} className="border-t" style={{ borderColor: "var(--border)" }}>
                      <td className="py-1 px-2 font-mono">{r.date}</td>
                      <td className="py-1 px-2">{r.productName || "-"}</td>
                      <td className="py-1 px-2 text-right">
                        <DebouncedNumberInput value={r.qty} onCommit={(text) => setQtyOverrides((prev) => ({ ...prev, [r.idx]: text }))} className="w-16 text-right border rounded px-1 py-0.5 font-mono text-xs bg-white" style={{ borderColor: "var(--border)" }} />
                      </td>
                      <td className="py-1 px-2 text-right">
                        <DebouncedNumberInput value={r.amount} onCommit={(text) => setAmountOverrides((prev) => ({ ...prev, [r.idx]: text }))} className="w-20 text-right border rounded px-1 py-0.5 font-mono text-xs bg-white" style={{ borderColor: "var(--border)" }} />
                      </td>
                      <td className="py-1 px-2">
                        <select value={overrides[r.idx] !== void 0 ? overrides[r.idx] : r.matched?.id || ""} onChange={(e) => setOverrides((o) => ({ ...o, [r.idx]: e.target.value }))} className="text-xs border rounded px-1 py-0.5 bg-white" style={{ borderColor: r.matched ? "var(--border)" : "var(--danger)" }}>
                          <option value="">(未指定)</option>
                          {products.map((p) => <option key={p.id} value={p.id}>
                              {p.name}
                            </option>)}
                        </select>
                      </td>
                      <td className="py-1 px-2">
                        <button type="button" className="p-1 rounded hover:bg-black/5" onClick={() => setRemovedIndices((prev) => new Set(prev).add(r.idx))} title="この行を削除">
                          <Trash2 size={13} style={{ color: "var(--danger)" }} />
                        </button>
                      </td>
                    </tr>)}
              </tbody>
            </table>
          </div>
        </>}
    </div>;
});
function Ledger({ transactions, setTransactions, addTransactions, products, setProducts, consignees, inventory, goToShipping, shippingRequests, setShippingRequests, deliveryNotes, setDeliveryNotes, invoices, setInvoices, updateLinkedDeliveryNoteForBatch, updateLinkedInvoiceForBatch, updateLinkedShippingForBatch }) {
  const [modal, setModal] = useState(null);
  const [detailModal, setDetailModal] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [expandedBatches, setExpandedBatches] = useState(() => /* @__PURE__ */ new Set());
  const del = useDeleteConfirm();
  const consigneeById = Object.fromEntries(consignees.map((c) => [c.id, c]));
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const bulkRef = useRef(null);
  const [bulkCount, setBulkCount] = useState(0);
  const years = useMemo(() => {
    const s = /* @__PURE__ */ new Set([(/* @__PURE__ */ new Date()).getFullYear()]);
    for (const t of transactions) if (t.date) s.add(Number(t.date.slice(0, 4)));
    return Array.from(s).sort((a, b) => b - a);
  }, [transactions]);
  const selectYear = (y) => {
    setDateFrom(`${y}-01-01`);
    setDateTo(`${y}-12-31`);
  };
  const [shipPrompt, setShipPrompt] = useState(null);
  const expandNewBatches = (newTx) => {
    const ids = new Set(newTx.map((t) => t.batchId).filter(Boolean));
    if (ids.size) setExpandedBatches((prev) => /* @__PURE__ */ new Set([...prev, ...ids]));
  };
  const [savingTx, setSavingTx] = useState(false);
  const scrollToTopSoon = () => setTimeout(() => window.scrollTo(0, 0), 0);
  const syncCostFromPurchases = (txs) => {
    const updates = {};
    (txs || []).forEach((t) => {
      if (t && t.type === "\u4ED5\u5165" && Number(t.unitPrice) > 0 && t.productId) {
        const date = t.date || todayStr();
        const prevUpdate = updates[t.productId];
        if (!prevUpdate || date >= prevUpdate.date) updates[t.productId] = { date, amount: Number(t.unitPrice) };
      }
    });
    if (Object.keys(updates).length === 0) return;
    // 手入力の原価履歴(costHistory)があると、フラットな cost フィールドだけ更新しても
    // getCurrentCost からは見えなくなり「自動更新されているように見えて実は反映されない」
    // 事故につながるため、costHistory 側にも同じ日付のエントリとして反映する。
    setProducts?.((prev) => prev.map((p) => {
      const u = updates[p.id];
      if (!u) return p;
      const nextHistory = [...getCostHistory(p).filter((h) => h.date !== u.date), { date: u.date, amount: u.amount, note: "\u4ED5\u5165\u53D6\u5F15\u304B\u3089\u81EA\u52D5\u53CD\u6620" }].sort((a, b) => a.date.localeCompare(b.date));
      return { ...p, cost: u.amount, costHistory: nextHistory };
    }));
  };
  const save = async (formOrArray) => {
    if (formOrArray?.__batchEdit) {
      const { updates, creates, deleteIds, editBatchId, updateDeliveryNote, updateInvoice, updateShipping } = formOrArray;
      let next = transactions.map((t) => updates.find((u) => u.id === t.id) || t);
      if (deleteIds.length) next = next.filter((t) => !deleteIds.includes(t.id));
      if (creates.length) next = [...next, ...creates];
      setTransactions(next);
      syncCostFromPurchases([...updates, ...creates]);
      if (editBatchId) {
        if (updateDeliveryNote) updateLinkedDeliveryNoteForBatch?.(editBatchId, next);
        if (updateInvoice) updateLinkedInvoiceForBatch?.(editBatchId, next);
        if (updateShipping) updateLinkedShippingForBatch?.(editBatchId, next);
      }
      setModal(null);
      scrollToTopSoon();
      return;
    }
    if (Array.isArray(formOrArray)) {
      setSavingTx(true);
      const created = await addTransactions(formOrArray);
      setSavingTx(false);
      expandNewBatches(formOrArray);
      syncCostFromPurchases(formOrArray);
      if (created?.length) setShipPrompt(created);
      setModal(null);
      scrollToTopSoon();
      return;
    }
    const form = formOrArray;
    const payload = { ...form, qty: Number(form.qty) || 0, unitPrice: Number(form.unitPrice) || 0, amount: Number(form.amount) || 0 };
    if (modal === "new") {
      setSavingTx(true);
      const created = await addTransactions([{ ...payload, id: uid("T") }]);
      setSavingTx(false);
      syncCostFromPurchases([payload]);
      if (created?.length) setShipPrompt(created);
      setModal(null);
      scrollToTopSoon();
      return;
    }
    const next = transactions.map((t) => t.id === modal.id ? { ...payload, id: t.id } : t);
    setTransactions(next);
    syncCostFromPurchases([payload]);
    if (form.editBatchId) {
      if (form.updateDeliveryNote) updateLinkedDeliveryNoteForBatch?.(form.editBatchId, next);
      if (form.updateInvoice) updateLinkedInvoiceForBatch?.(form.editBatchId, next);
      if (form.updateShipping) updateLinkedShippingForBatch?.(form.editBatchId, next);
    }
    setModal(null);
    scrollToTopSoon();
  };
  const bulkAdd = async (newTx) => {
    setSavingTx(true);
    const created = await addTransactions(newTx);
    setSavingTx(false);
    expandNewBatches(newTx);
    if (created?.length) setShipPrompt(created);
    setModal(null);
    scrollToTopSoon();
  };
  // Deleting a transaction doesn't automatically remove any shipping request
  // or delivery note that was created from it — those keep their own copy
  // of the data, so they don't break, but they become orphaned (no source
  // transaction left) if left behind. Let the person choose to clean those
  // up too when deleting.
  const [linkedDeleteModal, setLinkedDeleteModal] = useState(null);
  const linkedFor = (batchId) => {
    if (!batchId) return { ship: 0, notes: 0, invoices: 0 };
    return {
      ship: (shippingRequests || []).filter((r) => r.sourceBatchId === batchId).length,
      notes: (deliveryNotes || []).filter((d) => d.sourceBatchId === batchId).length,
      invoices: (invoices || []).filter((i) => i.sourceBatchId === batchId).length,
    };
  };
  const cascadeDelete = (batchId) => {
    if (!batchId) return;
    setShippingRequests?.((prev) => prev.filter((r) => r.sourceBatchId !== batchId));
    setDeliveryNotes?.((prev) => prev.filter((d) => d.sourceBatchId !== batchId));
    setInvoices?.((prev) => prev.filter((i) => i.sourceBatchId !== batchId));
  };
  const remove = (id, alsoDeleteLinked) => {
    const tx = transactions.find((t) => t.id === id);
    if (alsoDeleteLinked && tx?.batchId) cascadeDelete(tx.batchId);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    del.cancel();
  };
  const removeBatch = (batchId, alsoDeleteLinked) => {
    if (alsoDeleteLinked) cascadeDelete(batchId);
    setTransactions((prev) => prev.filter((t) => t.batchId !== batchId));
    del.cancel();
  };
  const toggleBatch = (batchId) => {
    setExpandedBatches((prev) => {
      const next = new Set(prev);
      if (next.has(batchId)) next.delete(batchId);
      else next.add(batchId);
      return next;
    });
  };
  const filtered = [...transactions].filter((t) => !filterType || t.type === filterType).filter((t) => !filterLocation || t.fromLocation === filterLocation || t.toLocation === filterLocation).filter((t) => !query || kanaMatch(productById[t.productId]?.name || "", query) || kanaMatch(productById[t.productId]?.furigana || "", query)).filter((t) => !dateFrom || (t.date || "") >= dateFrom).filter((t) => !dateTo || (t.date || "") <= dateTo).sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.id > a.id ? 1 : -1));
  const displayItems = useMemo(() => {
    const batches = {};
    const standalone = [];
    for (const t of filtered) {
      if (t.batchId) (batches[t.batchId] ||= []).push(t);
      else standalone.push(t);
    }
    const items = [];
    for (const [batchId, batchItems] of Object.entries(batches)) {
      if (batchItems.length <= 1) {
        for (const t of batchItems) items.push({ kind: "single", date: t.date, tx: t, sortKey: t.id || "" });
        continue;
      }
      const dates = batchItems.map((i) => i.date || "").filter(Boolean).sort();
      const moveLegs = batchItems.filter((i) => i.type === "\u79FB\u52D5");
      const otherLegs = batchItems.filter((i) => i.type !== "\u79FB\u52D5");
      const isPairBatch = moveLegs.length > 0 && otherLegs.length > 0 && new Set(otherLegs.map((o) => o.type)).size === 1;
      if (isPairBatch && otherLegs.length === 1) {
        items.push({ kind: "pair-single", date: otherLegs[0].date, tx: otherLegs[0], batchItems, batchId, sortKey: batchId });
        continue;
      }
      const types = isPairBatch ? [otherLegs[0].type] : Array.from(new Set(batchItems.map((i) => i.type)));
      const visibleItems = isPairBatch ? otherLegs : batchItems;
      const hasEmptyLocation = batchItems.some((i) => {
        const t = TX_TYPE_MAP[i.type];
        if (!t) return false;
        if (t.sign === "move") return !i.fromLocation || !i.toLocation;
        if (t.sign === "in") return !i.toLocation;
        if (t.sign === "adjust") return !i.toLocation;
        if (t.sign === "out") return !i.fromLocation;
        return false;
      });
      let locationSummary;
      if (hasEmptyLocation) {
        locationSummary = { text: "\u672A\u8A2D\u5B9A\u3042\u308A", warn: true };
      } else if (isPairBatch) {
        const repSale = otherLegs[0];
        const fromName = consigneeById[repSale.fromLocation]?.name || "\u2014";
        const toName = consigneeById[repSale.toLocation]?.name || "\u2014";
        locationSummary = { text: `${fromName} \u2192 ${toName}`, warn: false };
      } else {
        const froms = Array.from(new Set(batchItems.map((i) => i.fromLocation || "")));
        const tos = Array.from(new Set(batchItems.map((i) => i.toLocation || "")));
        if (froms.length <= 1 && tos.length <= 1) {
          const fromName = froms[0] ? consigneeById[froms[0]]?.name || "\u2014" : "\u2014";
          const toName = tos[0] ? consigneeById[tos[0]]?.name || "\u2014" : "\u2014";
          locationSummary = { text: `${fromName} \u2192 ${toName}`, warn: false };
        } else {
          locationSummary = { text: "\u8907\u6570\u306E\u5834\u6240", warn: false };
        }
      }
      items.push({ kind: "batch", batchId, items: batchItems, visibleItems, date: dates[dates.length - 1] || "", dateRange: dates.length && dates[0] !== dates[dates.length - 1] ? `${dates[0]}\u301C${dates[dates.length - 1]}` : dates[0] || "", types, locationSummary, totalQty: visibleItems.reduce((s, i) => s + (Number(i.qty) || 0), 0), totalAmount: visibleItems.reduce((s, i) => s + (Number(i.amount) || 0), 0), sortKey: batchId });
    }
    for (const t of standalone) items.push({ kind: "single", date: t.date, tx: t, sortKey: t.id || "" });
    const timeKey = (id) => (id || "").split("-")[1] || "";
    return items.sort((a, b) => (b.date || "").localeCompare(a.date || "") || timeKey(b.sortKey).localeCompare(timeKey(a.sortKey)));
  }, [filtered, consigneeById]);
  const { pageItems: pagedItems, page: ledgerPage, setPage: setLedgerPage, pageSize: ledgerPageSize, setPageSize: setLedgerPageSize, totalPages: ledgerTotalPages, totalCount: ledgerTotalCount } = usePagination(displayItems);
  const exportCsv = () => {
    const rows = filtered.map((t) => ({ \u53D6\u5F15ID: t.id, \u65E5\u4ED8: t.date, \u7A2E\u5225: t.type, \u5834\u6240From: consigneeById[t.fromLocation]?.name || "", \u5834\u6240To: consigneeById[t.toLocation]?.name || "", \u5546\u54C1: productById[t.productId]?.name || "", \u6570\u91CF: t.qty, \u5358\u4FA1: t.unitPrice, \u91D1\u984D: t.amount, \u95A2\u9023ID: t.relatedId, \u5165\u529B\u8005: t.enteredBy, \u30E1\u30E2: t.memo }));
    const suffix = dateFrom || dateTo ? `${dateFrom || "\u5148\u982D"}\u301C${dateTo || "\u6700\u65B0"}` : todayStr();
    downloadText(`\u53D6\u5F15\u8A18\u9332_${suffix}.csv`, "\uFEFF" + toCsv(rows, Object.keys(rows[0] || { \u53D6\u5F15ID: "" })));
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow={`${transactions.length}\u4EF6\u306E\u8A18\u9332`} title="取引記録" action={<div className="flex gap-2">
            <Button variant="ghost" icon={Download} onClick={exportCsv} disabled={!filtered.length}>
              CSV出力
            </Button>
            <Button variant="ghost" icon={UploadCloud} onClick={() => setModal("bulk")}>
              まとめて追加(貼り付け)
            </Button>
            <Button variant="accent" icon={Plus} onClick={() => setModal("new")}>
              取引を記録
            </Button>
          </div>} />
      <div className="flex flex-wrap gap-2 items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="商品名で検索" list="zk-product-name-suggestions" className="px-3 py-2 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", background: "white" }} />
        <datalist id="zk-product-name-suggestions">
          {products.map((p) => <option key={p.id} value={p.name} />)}
        </datalist>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-3 py-2 rounded-md border text-sm bg-white" style={{ borderColor: "var(--border)" }}>
          <option value="">すべての種別</option>
          <TxTypeOptions />
        </select>
        <div className="w-44">
          <Combobox options={[{ value: "", label: "\u3059\u3079\u3066\u306E\u5834\u6240" }, ...consignees.map((c) => ({ value: c.id, label: c.name }))]} value={filterLocation} onChange={setFilterLocation} placeholder="場所で絞り込み…" />
        </div>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          期間
        </span>
        <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-2 py-2 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", background: "white" }} />
        <span style={{ color: "var(--text-muted)" }}>〜</span>
        <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-2 py-2 rounded-md border text-sm outline-none" style={{ borderColor: "var(--border)", background: "white" }} />
        <select onChange={(e) => {
    if (e.target.value) selectYear(e.target.value);
    e.target.value = "";
  }} defaultValue="" className="px-2 py-2 rounded-md border text-sm bg-white" style={{ borderColor: "var(--border)" }}>
          <option value="">年度で絞り込み…</option>
          {years.map((y) => <option key={y} value={y}>
              {y}年のみ
            </option>)}
        </select>
        {(dateFrom || dateTo) && <button className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={() => {
    setDateFrom("");
    setDateTo("");
  }}>
            期間指定を解除
          </button>}
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto zk-scrollbar max-h-[560px]">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="sticky top-0" style={{ background: "var(--paper)" }}>
              <tr className="text-left">
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  日付
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  種別
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  場所
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  商品
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                  数量
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                  金額
                </th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {pagedItems.map((item) => {
    if (item.kind === "single" || item.kind === "pair-single") {
      const t = item.tx;
      const type = TX_TYPE_MAP[t.type] || UNKNOWN_TX_TYPE;
      const isPair = item.kind === "pair-single";
      const onEdit = () => setModal(isPair ? { batchEdit: item.batchItems } : t);
      const onDelete = (alsoDeleteLinked) => isPair ? removeBatch(item.batchId, alsoDeleteLinked) : remove(t.id, alsoDeleteLinked);
      const deleteLinked = linkedFor(t.batchId);
      return <tr key={t.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                      <td className="py-2 px-3 font-mono text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                        {t.date}
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold" style={{ color: "var(--ink)" }}>
                          <type.icon size={15} style={{ color: type.color }} />
                          {type.shortLabel || t.type}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm font-medium whitespace-nowrap">
                        {consigneeById[t.fromLocation]?.name || "\u2014"} →{" "}
                        {consigneeById[t.toLocation]?.name || "\u2014"}
                      </td>
                      <td className="py-2 px-3 truncate max-w-[200px] text-xs" style={{ color: "var(--text-muted)" }}>
                        {productById[t.productId]?.name || "(\u524A\u9664\u6E08\u307F\u5546\u54C1)"}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatNum(t.qty)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {t.amount ? formatYen(t.amount) : "-"}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-1 justify-end">
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setDetailModal({ tx: t })} title="詳細を見る">
                              <Info size={14} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={onEdit}>
                              <Pencil size={14} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setLinkedDeleteModal({ linked: deleteLinked, onConfirm: onDelete })}>
                              <Trash2 size={14} style={{ color: "var(--danger)" }} />
                            </button>
                          </div>
                      </td>
                    </tr>;
    }
    const expanded = expandedBatches.has(item.batchId);
    return <React.Fragment key={item.batchId}>
                    <tr className="border-t" style={{ borderColor: "var(--border)", background: "var(--success-soft)" }}>
                      <td className="py-2 px-3 font-mono text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                        {item.dateRange}
                      </td>
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold" style={{ color: "var(--ink)" }}>
                          {item.types.length === 1 && TX_TYPE_MAP[item.types[0]] && (() => {
      const TIcon = TX_TYPE_MAP[item.types[0]].icon;
      return <TIcon size={15} style={{ color: TX_TYPE_MAP[item.types[0]].color }} />;
    })()}
                          {item.types.length === 1 ? TX_TYPE_MAP[item.types[0]]?.shortLabel || item.types[0] : "\u8907\u6570\u7A2E\u5225"}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-sm font-medium whitespace-nowrap" style={{ color: item.locationSummary.warn ? "var(--danger)" : "var(--text)" }}>
                        {item.locationSummary.warn && "\u26A0 "}
                        {item.locationSummary.text}
                      </td>
                      <td className="py-2 px-3">
                        <button type="button" className="inline-flex items-center gap-1 text-xs font-semibold underline" style={{ color: expanded ? "var(--accent)" : "var(--accent2)" }} onClick={() => toggleBatch(item.batchId)}>
                          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          まとめて記録({item.visibleItems.length}件)
                        </button>
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {formatNum(item.totalQty)}
                      </td>
                      <td className="py-2 px-3 text-right font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                        {item.totalAmount ? formatYen(item.totalAmount) : "-"}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-1 justify-end">
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setModal({ batchEdit: item.items })} title="この件全部を編集(取引を記録と同じ画面)">
                              <Pencil size={14} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setLinkedDeleteModal({ linked: linkedFor(item.batchId), baseMessage: `${item.items.length}\u4EF6\u307E\u3068\u3081\u3066\u524A\u9664\u3057\u307E\u3059\u304B\uFF1F`, onConfirm: (also) => removeBatch(item.batchId, also) })}>
                              <Trash2 size={14} style={{ color: "var(--danger)" }} />
                            </button>
                          </div>
                      </td>
                    </tr>
                    {expanded && item.visibleItems.map((t) => {
      const type = TX_TYPE_MAP[t.type] || UNKNOWN_TX_TYPE;
      return <tr key={t.id} className="border-t" style={{ borderColor: "var(--border)", background: "var(--success-soft)" }}>
                            <td className="py-1.5 px-3 pl-6 font-mono text-xs whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                              {t.date}
                            </td>
                            <td className="py-1.5 px-3">
                              <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium" style={{ color: "var(--ink)" }}>
                                <type.icon size={12} style={{ color: type.color }} />
                                {type.shortLabel || t.type}
                              </span>
                            </td>
                            <td className="py-1.5 px-3 text-xs font-medium whitespace-nowrap">
                              {consigneeById[t.fromLocation]?.name || "\u2014"} →{" "}
                              {consigneeById[t.toLocation]?.name || "\u2014"}
                            </td>
                            <td className="py-1.5 px-3 truncate max-w-[200px] text-xs" style={{ color: "var(--text-muted)" }}>
                              {productById[t.productId]?.name || "(\u524A\u9664\u6E08\u307F\u5546\u54C1)"}
                            </td>
                            <td className="py-1.5 px-3 text-right font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                              {formatNum(t.qty)}
                            </td>
                            <td className="py-1.5 px-3 text-right font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                              {t.amount ? formatYen(t.amount) : "-"}
                            </td>
                            <td className="py-1.5 px-3 text-right">
                              <button className="p-1 rounded hover:bg-black/5" onClick={() => setDetailModal({ tx: t })} title="詳細を見る">
                                <Info size={13} />
                              </button>
                            </td>
                          </tr>;
    })}
                  </React.Fragment>;
  })}
              {displayItems.length === 0 && <tr>
                  <td colSpan={8}>
                    <EmptyState icon={ArrowLeftRight} title="取引がありません" description="「取引を記録」から入庫・販売・移動などを記録してください" />
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <PaginationBar page={ledgerPage} setPage={setLedgerPage} pageSize={ledgerPageSize} setPageSize={setLedgerPageSize} totalPages={ledgerTotalPages} totalCount={ledgerTotalCount} />
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "new" ? "\u53D6\u5F15\u3092\u8A18\u9332" : modal === "bulk" ? "\u53D6\u5F15\u3092\u307E\u3068\u3081\u3066\u8A18\u9332" : modal?.batchEdit ? "\u53D6\u5F15\u3092\u7DE8\u96C6(\u307E\u3068\u3081\u3066\u8A18\u9332\u3057\u305F\u5206)" : "\u53D6\u5F15\u3092\u7DE8\u96C6"} wide footer={modal === "bulk" ? <>
              <Button variant="ghost" onClick={() => setModal(null)} disabled={savingTx}>
                キャンセル
              </Button>
              <Button variant="accent" icon={UploadCloud} onClick={() => bulkRef.current?.confirm()} disabled={bulkCount === 0 || savingTx}>
                {savingTx ? "記録中…" : `${bulkCount || ""}件をまとめて記録`}
              </Button>
            </> : null}>
        {modal === "bulk" ? <BulkAddTransactions ref={bulkRef} products={products} consignees={consignees} onAdd={bulkAdd} onCountChange={setBulkCount} /> : modal?.batchEdit ? <TransactionForm initialBatch={modal.batchEdit} products={products} consignees={consignees} inventory={inventory} onSave={save} onCancel={() => setModal(null)} saving={savingTx} deliveryNotes={deliveryNotes} invoices={invoices} shippingRequests={shippingRequests} /> : <TransactionForm initial={modal === "new" ? null : modal} products={products} consignees={consignees} inventory={inventory} onSave={save} onCancel={() => setModal(null)} saving={savingTx} deliveryNotes={deliveryNotes} invoices={invoices} shippingRequests={shippingRequests} />}
      </Modal>
      <Modal open={!!linkedDeleteModal} onClose={() => setLinkedDeleteModal(null)} title="紐づいたデータの削除">
        {linkedDeleteModal && <ConfirmDeleteWithLinked linked={linkedDeleteModal.linked} baseMessage={linkedDeleteModal.baseMessage} onConfirm={(also) => {
    linkedDeleteModal.onConfirm(also);
    setLinkedDeleteModal(null);
  }} onCancel={() => setLinkedDeleteModal(null)} />}
      </Modal>
      <Modal open={!!detailModal} onClose={() => setDetailModal(null)} title="取引の詳細">
        {detailModal && (() => {
    const t = detailModal.tx;
    const type = TX_TYPE_MAP[t.type] || UNKNOWN_TX_TYPE;
    const linkedNotes = t.batchId ? (deliveryNotes || []).filter((d) => d.sourceBatchId === t.batchId && !d.voided) : [];
    const linkedInvoicesForTx = t.batchId ? (invoices || []).filter((i) => i.sourceBatchId === t.batchId) : [];
    const linkedShippingForTx = t.batchId ? (shippingRequests || []).filter((r) => r.sourceBatchId === t.batchId) : [];
    const rows = [["日付", t.date], ["種別", <span className="inline-flex items-center gap-1.5" key="type">
              <type.icon size={14} style={{ color: type.color }} />
              {type.label || t.type}
            </span>], ["移動元", consigneeById[t.fromLocation]?.name || "\u2014"], ["移動先", consigneeById[t.toLocation]?.name || "\u2014"], ["商品", productById[t.productId]?.name || "(\u524A\u9664\u6E08\u307F\u5546\u54C1)"], ["数量", formatNum(t.qty)], ["単価", t.unitPrice ? formatYen(t.unitPrice) : "-"], ["金額", t.amount ? formatYen(t.amount) : "-"], ["イベント名", t.eventName || "-"], ["入力者", t.enteredBy || "-"], ["メモ", t.memo || "-"]];
    return <div className="space-y-4">
              <div className="rounded-md border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                <table className="w-full text-sm">
                  <tbody>
                    {rows.map(([label, value]) => <tr key={label} className="border-t first:border-t-0" style={{ borderColor: "var(--border)" }}>
                          <td className="py-2 px-3 w-28 shrink-0 align-top text-xs" style={{ color: "var(--text-muted)", background: "var(--paper)" }}>
                            {label}
                          </td>
                          <td className="py-2 px-3">
                            {value}
                          </td>
                        </tr>)}
                  </tbody>
                </table>
              </div>
              {(linkedNotes.length > 0 || linkedInvoicesForTx.length > 0 || linkedShippingForTx.length > 0) && <div className="space-y-1.5">
                  <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    紐づくデータ
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {linkedShippingForTx.map((r) => <span key={r.id} className="px-2 py-1 rounded-full inline-flex items-center gap-1" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
                        <Truck size={12} />
                        発送依頼
                      </span>)}
                    {linkedNotes.map((d) => <span key={d.id} className="px-2 py-1 rounded-full inline-flex items-center gap-1" style={{ background: "var(--success-soft)", color: "var(--success)" }}>
                        <FileText size={12} />
                        納品書 {d.number}
                      </span>)}
                    {linkedInvoicesForTx.map((i) => <span key={i.id} className="px-2 py-1 rounded-full inline-flex items-center gap-1" style={{ background: "var(--success-soft)", color: "var(--success)" }}>
                        <Receipt size={12} />
                        請求書 {i.number}
                      </span>)}
                  </div>
                </div>}
              <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                <Button variant="ghost" onClick={() => setDetailModal(null)}>
                  閉じる
                </Button>
                <Button variant="accent" icon={Pencil} onClick={() => {
      setDetailModal(null);
      setModal(t);
    }}>
                  編集する
                </Button>
              </div>
            </div>;
  })()}
      </Modal>
      <Modal open={!!shipPrompt} onClose={() => { setShipPrompt(null); scrollToTopSoon(); }} title="発送依頼を作成しました">
        {shipPrompt && <div className="space-y-3">
            <p className="text-sm">
              {shipPrompt.length === 1 ? "\u767A\u9001\u4F9D\u983C\u30921\u4EF6\u3001\u767A\u9001\u78BA\u8A8D\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3057\u307E\u3057\u305F\u3002" : `\u767A\u9001\u4F9D\u983C\u3092${shipPrompt.length}\u4EF6\u3001\u767A\u9001\u78BA\u8A8D\u30EA\u30B9\u30C8\u306B\u8FFD\u52A0\u3057\u307E\u3057\u305F\u3002`}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              続けて拠点・締切・サンプルを設定する場合は「調整する」へ進んでください。後から発送依頼・確認リストでも調整できます。
            </p>
            <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
              <Button variant="ghost" onClick={() => { setShipPrompt(null); scrollToTopSoon(); }}>
                閉じる
              </Button>
              <Button variant="accent" icon={Truck} onClick={() => {
    goToShipping?.(shipPrompt.length === 1 ? shipPrompt[0].id : null);
    setShipPrompt(null);
    scrollToTopSoon();
  }}>
                {shipPrompt.length === 1 ? "\u8ABF\u6574\u3059\u308B" : "\u767A\u9001\u78BA\u8A8D\u30EA\u30B9\u30C8\u3078"}
              </Button>
            </div>
          </div>}
      </Modal>
    </div>;
}
function InventoryStatus({ products, consignees, inventory, alerts, stockAlertLocationIds }) {
  const [genreFilter, setGenreFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const genres = Array.from(new Set(products.map((p) => p.genre).filter(Boolean)));
  const locations = consignees.filter((c) => c.status !== "\u9589\u5E97");
  const visibleProducts = products.filter((p) => !genreFilter || p.genre === genreFilter).filter((p) => p.status !== "\u8CA9\u58F2\u7D42\u4E86" || (inventory[p.id]?.__total || 0) !== 0);
  const genreOrderMap = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    products.forEach((p) => {
      const g = p.genre || "\u305D\u306E\u4ED6";
      if (!map.has(g)) map.set(g, map.size);
    });
    return map;
  }, [products]);
  const groupByGenre = (items) => {
    const groups = /* @__PURE__ */ new Map();
    items.forEach((item) => {
      const key = (item.product ? item.product.genre : item.genre) || "\u305D\u306E\u4ED6";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    });
    const entries = Array.from(groups.entries());
    entries.sort((a, b) => {
      if (a[0] === "\u305D\u306E\u4ED6") return 1;
      if (b[0] === "\u305D\u306E\u4ED6") return -1;
      return (genreOrderMap.get(a[0]) ?? 999) - (genreOrderMap.get(b[0]) ?? 999);
    });
    return entries;
  };
  const selectedLocation = locations.find((c) => c.id === locationFilter);
  const singleLocationRows = selectedLocation ? [...visibleProducts].map((p) => ({ product: p, qty: inventory[p.id]?.[selectedLocation.id] || 0 })).sort((a, b) => b.qty - a.qty) : [];
  const singleLocationGroups = groupByGenre(singleLocationRows);
  const wideTableGroups = groupByGenre(visibleProducts.map((p) => ({ product: p })));
  return <div className="space-y-4">
      <SectionTitle eyebrow="自動集計・直接編集不可" title="在庫状況" />

      {(alerts.zero.length > 0 || alerts.low.length > 0) && <Card className="p-4" style={{ borderColor: "var(--danger)" }}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} style={{ color: "var(--danger)" }} />
            <span className="font-medium text-sm" style={{ color: "var(--danger)" }}>
              在庫アラート：ゼロ在庫 {alerts.zero.length}件 / 少数在庫{" "}
              {alerts.low.length}件
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {alerts.zero.map((a) => <Badge key={a.product.id} tone="danger">
                {a.product.name}：ゼロ
              </Badge>)}
            {alerts.low.map((a) => <Badge key={a.product.id} tone="accent">
                {a.product.name}：残{a.total}
              </Badge>)}
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
            ※このアラートの対象拠点は「設定・連携」ページで変更できます(未選択の場合は「BOUKEN倉庫」の在庫のみが対象です)。
          </p>
        </Card>}

      <div className="flex gap-2 flex-wrap">
        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} className="px-3 py-2 rounded-md border text-sm bg-white" style={{ borderColor: "var(--border)" }}>
          <option value="">すべてのシリーズ</option>
          {genres.map((g) => <option key={g} value={g}>
              {g}
            </option>)}
        </select>
        <div className="w-52">
          <Combobox options={[{ value: "", label: "\u3059\u3079\u3066\u306E\u5834\u6240(\u6A2A\u4E26\u3073\u8868\u793A)" }, ...locations.map((c) => ({ value: c.id, label: `${c.name}\u3060\u3051\u8868\u793A` }))]} value={locationFilter} onChange={setLocationFilter} placeholder="場所を検索…" />
        </div>
      </div>

      {selectedLocation ? <Card className="overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
            <span className="font-medium text-sm">
              {selectedLocation.name} の在庫
            </span>
            <button className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={() => setLocationFilter("")}>
              横並び表示に戻す
            </button>
          </div>
          <div className="overflow-y-auto zk-scrollbar" style={{ maxHeight: 600 }}>
            <table className="w-full text-sm">
              <thead className="sticky top-0" style={{ background: "var(--paper)" }}>
                <tr className="text-left">
                  <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                    商品
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    この場所の在庫
                  </th>
                </tr>
              </thead>
              <tbody>
                {singleLocationGroups.map(([genre, rows]) => <React.Fragment key={genre}>
                    <tr>
                      <td colSpan={2} className="py-1.5 px-3 text-xs font-semibold" style={{ background: "var(--paper)", color: "var(--accent2)" }}>
                        {genre}
                        <span className="ml-1.5 font-normal" style={{ color: "var(--text-muted)" }}>
                          ({rows.length})
                        </span>
                      </td>
                    </tr>
                    {rows.map(({ product: p, qty }) => <tr key={p.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="py-1.5 px-3">{p.name}</td>
                        <td className="py-1.5 px-3 text-right font-mono" style={{ color: qty > 0 ? "var(--ink)" : "var(--text-muted)" }}>
                          {qty ? formatNum(qty) : "-"}
                        </td>
                      </tr>)}
                  </React.Fragment>)}
                {singleLocationRows.length === 0 && <tr>
                    <td colSpan={2}>
                      <EmptyState icon={Boxes} title="対象商品がありません" />
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </Card> : <Card className="overflow-hidden">
          <TopScrollSync className="max-h-[600px]" tableClassName="text-sm" tableStyle={{ tableLayout: "fixed", width: 160 + locations.length * 110 + 90 }} thead={<thead style={{ background: "var(--paper)" }}>
                <tr className="text-left">
                  <th className="py-2 px-3 font-medium sticky left-0" style={{ width: 160, boxSizing: "border-box", color: "var(--text-muted)", background: "var(--paper)", borderRight: "1px solid var(--border)" }}>
                    商品
                  </th>
                  {locations.map((c) => <th key={c.id} className="py-2 px-3 font-medium text-right" style={{ width: 110, boxSizing: "border-box", whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.3, color: "var(--text-muted)" }}>
                      {c.name}
                    </th>)}
                  <th className="py-2 px-3 font-medium text-right" style={{ width: 90, boxSizing: "border-box", color: "var(--ink)", borderLeft: "1px solid var(--border)" }}>
                    合計
                  </th>
                </tr>
              </thead>} tbody={<tbody>
                {wideTableGroups.map(([genre, rows]) => <React.Fragment key={genre}>
                    <tr>
                      <td className="py-1.5 px-3 text-xs font-semibold sticky left-0" style={{ width: 160, boxSizing: "border-box", background: "var(--accent-soft)", color: "var(--accent2)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)", borderRight: "1px solid var(--border)" }}>
                        {genre}
                        <span className="ml-1.5 font-normal" style={{ color: "var(--text-muted)" }}>
                          ({rows.length})
                        </span>
                      </td>
                      <td colSpan={locations.length + 1} style={{ background: "var(--accent-soft)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }} />
                    </tr>
                    {rows.map(({ product: p }, rowIdx) => {
      const row = inventory[p.id] || { __total: 0 };
      const alertQty = alertTargetQty(inventory, p.id, consignees, stockAlertLocationIds);
      const isZero = (p.status === "\u53D6\u6271\u4E2D" || p.status === "\u53D6\u6271\u4E0D\u53EF") && alertQty <= 0;
      const isLow = (p.status === "\u53D6\u6271\u4E2D" || p.status === "\u53D6\u6271\u4E0D\u53EF") && alertQty > 0 && alertQty <= (Number(p.reorderPoint) || 0);
      const rowBg = rowIdx % 2 ? "var(--paper)" : "var(--card)";
      return <tr key={p.id}>
                          <td className="py-1.5 px-3 sticky left-0" style={{ width: 160, boxSizing: "border-box", background: rowBg, borderTop: "1px solid var(--border)", borderRight: "1px solid var(--border)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.3 }}>
                            {p.name}
                            {isZero && <Badge tone="danger">ゼロ</Badge>}
                            {isLow && <Badge tone="accent">少</Badge>}
                          </td>
                          {locations.map((c) => <td key={c.id} className="py-1.5 px-3 text-right font-mono" style={{ width: 110, boxSizing: "border-box", color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
                              {row[c.id] ? formatNum(row[c.id]) : ""}
                            </td>)}
                          <td className="py-1.5 px-3 text-right font-mono font-semibold" style={{ width: 90, boxSizing: "border-box", color: isZero ? "var(--danger)" : "var(--ink)", borderTop: "1px solid var(--border)", borderLeft: "1px solid var(--border)" }}>
                            {formatNum(row.__total)}
                          </td>
                        </tr>;
    })}
                  </React.Fragment>)}
              </tbody>} />
        </Card>}
    </div>;
}
function SalesSummary({ transactions, products, consignees }) {
  const monthsAvailable = useMemo(() => {
    const s = /* @__PURE__ */ new Set([monthKey(todayStr())]);
    for (const t of transactions) if (isRevenueTx(t) && t.date) s.add(monthKey(t.date));
    return Array.from(s).sort().reverse();
  }, [transactions]);
  const [month, setMonth] = useState(monthsAvailable[0] || monthKey(todayStr()));
  const fy = fiscalYearOf(month + "-01");
  const productRows = useMemo(() => computeMonthlyProductSales(transactions, products, month), [transactions, products, month]);
  const consigneeRows = useMemo(() => computeMonthlyConsigneeSales(transactions, consignees, month), [transactions, consignees, month]);
  const yearProductRows = useMemo(() => computeAnnualProductSales(transactions, products, fy), [transactions, products, fy]);
  const yearConsigneeRows = useMemo(() => computeAnnualConsigneeSales(transactions, consignees, fy), [transactions, consignees, fy]);
  const monthQty = productRows.reduce((s, r) => s + r.qty, 0);
  const monthAmount = productRows.reduce((s, r) => s + r.amount, 0);
  const yearQty = yearProductRows.reduce((s, r) => s + r.qty, 0);
  const yearAmount = yearProductRows.reduce((s, r) => s + r.amount, 0);
  const eventRows = useMemo(() => computeEventSales(transactions), [transactions]);
  const exportProductCsv = () => {
    const rows = productRows.map((r) => ({ \u5546\u54C1\u540D: r.product.name, シリーズ: r.product.genre || "", \u8CA9\u58F2\u6570: r.qty, \u58F2\u4E0A\u91D1\u984D: r.amount }));
    downloadText(`\u5546\u54C1\u5225\u8CA9\u58F2\u96C6\u8A08_${month}.csv`, "\uFEFF" + toCsv(rows, ["\u5546\u54C1\u540D", "シリーズ", "\u8CA9\u58F2\u6570", "\u58F2\u4E0A\u91D1\u984D"]));
  };
  const exportConsigneeCsv = () => {
    const rows = consigneeRows.map((r) => ({ \u59D4\u8A17\u5148\u540D: r.consignee.name, \u8CA9\u58F2\u6570: r.qty, \u58F2\u4E0A\u91D1\u984D: r.amount }));
    downloadText(`\u59D4\u8A17\u5148\u5225\u58F2\u4E0A\u96C6\u8A08_${month}.csv`, "\uFEFF" + toCsv(rows, ["\u59D4\u8A17\u5148\u540D", "\u8CA9\u58F2\u6570", "\u58F2\u4E0A\u91D1\u984D"]));
  };
  const exportYearProductCsv = () => {
    const rows = yearProductRows.map((r) => ({ \u5546\u54C1\u540D: r.product.name, シリーズ: r.product.genre || "", \u8CA9\u58F2\u6570: r.qty, \u58F2\u4E0A\u91D1\u984D: r.amount }));
    downloadText(`\u5546\u54C1\u5225\u8CA9\u58F2\u96C6\u8A08_${fy}\u5E74\u5EA6.csv`, "\uFEFF" + toCsv(rows, ["\u5546\u54C1\u540D", "シリーズ", "\u8CA9\u58F2\u6570", "\u58F2\u4E0A\u91D1\u984D"]));
  };
  const exportYearConsigneeCsv = () => {
    const rows = yearConsigneeRows.map((r) => ({ \u59D4\u8A17\u5148\u540D: r.consignee.name, \u8CA9\u58F2\u6570: r.qty, \u58F2\u4E0A\u91D1\u984D: r.amount }));
    downloadText(`\u59D4\u8A17\u5148\u5225\u58F2\u4E0A\u96C6\u8A08_${fy}\u5E74\u5EA6.csv`, "\uFEFF" + toCsv(rows, ["\u59D4\u8A17\u5148\u540D", "\u8CA9\u58F2\u6570", "\u58F2\u4E0A\u91D1\u984D"]));
  };
  return <div className="space-y-6 max-w-4xl mx-auto">
      <SectionTitle eyebrow="自動集計・「販売」取引から算出・年度は2月〜翌1月" title="販売集計" action={<MonthNav month={month} setMonth={setMonth} monthsAvailable={monthsAvailable} />} />

      <div className="flex flex-wrap gap-3">
        <StatCard label={`${month} \u306E\u8CA9\u58F2\u6570`} value={formatNum(monthQty)} icon={Boxes} />
        <StatCard label={`${month} \u306E\u58F2\u4E0A`} value={formatYen(monthAmount)} icon={Wallet} tone="accent" />
        <StatCard label={`${fy}\u5E74\u5EA6 \u7D2F\u8A08\u8CA9\u58F2\u6570`} value={formatNum(yearQty)} icon={Boxes} />
        <StatCard label={`${fy}\u5E74\u5EA6 \u7D2F\u8A08\u58F2\u4E0A`} value={formatYen(yearAmount)} icon={TrendingUp} tone="accent" />
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-sm">
            商品別 販売数・売上({month})
          </span>
          <Button variant="ghost" size="sm" icon={Download} onClick={exportProductCsv} disabled={!productRows.length}>
            CSV出力
          </Button>
        </div>
        {productRows.length === 0 ? <EmptyState icon={Package} title="この月の販売記録がありません" /> : <div className="overflow-x-auto zk-scrollbar max-h-96">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0" style={{ background: "var(--paper)" }}>
                <tr className="text-left">
                  <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                    商品名
                  </th>
                  <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                    シリーズ
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    販売数
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    売上金額
                  </th>
                </tr>
              </thead>
              <tbody>
                {productRows.map((r) => <tr key={r.product.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2 px-3 font-medium">{r.product.name}</td>
                    <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>
                      {r.product.genre || "-"}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {formatNum(r.qty)}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {formatYen(r.amount)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-sm">
            委託先別 販売数・売上({month})
          </span>
          <Button variant="ghost" size="sm" icon={Download} onClick={exportConsigneeCsv} disabled={!consigneeRows.length}>
            CSV出力
          </Button>
        </div>
        {consigneeRows.length === 0 ? <EmptyState icon={Building2} title="この月の販売記録がありません" /> : <div className="overflow-x-auto zk-scrollbar max-h-96">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0" style={{ background: "var(--paper)" }}>
                <tr className="text-left">
                  <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                    委託先名
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    販売数
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    売上金額
                  </th>
                </tr>
              </thead>
              <tbody>
                {consigneeRows.map((r) => <tr key={r.consignee.id} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2 px-3 font-medium">
                      {r.consignee.name}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {formatNum(r.qty)}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {formatYen(r.amount)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">イベント別 売上(全期間)</span>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          種別「イベント」に記録した際の「イベント名」ごとの累計です。取引記録でイベント名を入力しておくと、ここに自動で集計されます。
        </p>
        {eventRows.length === 0 ? <EmptyState icon={Store} title="イベントの記録がありません" description="取引記録で種別「イベント」を使うとここに集計されます" /> : <div className="overflow-x-auto zk-scrollbar max-h-72">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="sticky top-0" style={{ background: "var(--paper)" }}>
                <tr className="text-left">
                  <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                    イベント名
                  </th>
                  <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                    期間
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    販売数
                  </th>
                  <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                    売上金額
                  </th>
                </tr>
              </thead>
              <tbody>
                {eventRows.map((r) => <tr key={r.name} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="py-2 px-3 font-medium">{r.name}</td>
                    <td className="py-2 px-3 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
                      {r.firstDate === r.lastDate ? r.firstDate : `${r.firstDate}\u301C${r.lastDate}`}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {formatNum(r.qty)}
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      {formatYen(r.amount)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">
            {fy}年度 累計(2月〜翌1月・全期間参考用)
          </span>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          上の月別表とは別に、年度全体の累計をいつでもCSV出力できます。
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" icon={Download} onClick={exportYearProductCsv} disabled={!yearProductRows.length}>
            商品別・年度累計をCSV出力
          </Button>
          <Button variant="ghost" size="sm" icon={Download} onClick={exportYearConsigneeCsv} disabled={!yearConsigneeRows.length}>
            委託先別・年度累計をCSV出力
          </Button>
        </div>
      </Card>
    </div>;
}
const EMPTY_RECIPIENT = { name: "", type: "\u793E\u54E1", zip: "", address: "", phone: "" };
const RECIPIENT_BULK_FIELDS = [{ key: "name", label: "\u540D\u524D *", required: true, guess: ["\u540D\u524D", "\u6C0F\u540D", "name"] }, { key: "type", label: "\u7A2E\u5225", guess: ["\u7A2E\u5225", "type"], default: "\u793E\u54E1" }, { key: "zip", label: "\u90F5\u4FBF\u756A\u53F7", guess: ["\u90F5\u4FBF\u756A\u53F7", "\u90F5\u4FBF", "zip"] }, { key: "address", label: "\u4F4F\u6240 *", required: true, guess: ["\u4F4F\u6240", "address"] }, { key: "phone", label: "\u96FB\u8A71\u756A\u53F7", guess: ["\u96FB\u8A71\u756A\u53F7", "\u96FB\u8A71", "phone"] }];
function RecipientMaster({ recipients, setRecipients }) {
  const [modal, setModal] = useState(null);
  const del = useDeleteConfirm();
  const bulkRef = useRef(null);
  const [bulkCount, setBulkCount] = useState(0);
  const bulkAdd = (newRecipients) => {
    setRecipients((prev) => [...prev, ...newRecipients.map((r) => ({ ...r, id: uid("RCP") }))]);
    setModal(null);
  };
  const TYPE_RANK = { "\u793E\u54E1": 0, "\u5916\u6CE8": 1, "\u305D\u306E\u4ED6": 2 };
  const sortedRecipients = [...recipients].sort((a, b) => (TYPE_RANK[a.type] ?? 9) - (TYPE_RANK[b.type] ?? 9));
  const save = (form) => {
    if (modal === "new") {
      setRecipients((prev) => [...prev, { ...form, id: uid("RCP") }]);
    } else {
      setRecipients((prev) => prev.map((r) => r.id === modal.id ? { ...form, id: r.id } : r));
    }
    setModal(null);
  };
  const remove = (id) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
    del.cancel();
  };
  const exportCsv = () => {
    const rows = recipients.map((r) => ({ \u540D\u524D: r.name, \u7A2E\u5225: r.type, \u90F5\u4FBF\u756A\u53F7: r.zip || "", \u4F4F\u6240: r.address, \u96FB\u8A71\u756A\u53F7: r.phone || "" }));
    downloadText(`\u767A\u9001\u5148\u30DE\u30B9\u30BF_${todayStr()}.csv`, "\uFEFF" + toCsv(rows, ["\u540D\u524D", "\u7A2E\u5225", "\u90F5\u4FBF\u756A\u53F7", "\u4F4F\u6240", "\u96FB\u8A71\u756A\u53F7"]));
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow={`${recipients.length}件`} title="発送先マスタ(社員・外注など)" action={<div className="flex gap-2">
            <Button variant="ghost" icon={Download} onClick={exportCsv} disabled={!recipients.length}>
              CSV出力
            </Button>
            <Button variant="ghost" icon={UploadCloud} onClick={() => setModal("bulk")}>
              まとめて追加
            </Button>
            <Button variant="accent" icon={Plus} onClick={() => setModal("new")}>
              発送先を追加
            </Button>
          </div>} />
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        委託先マスタとは別に、サンプル発送などで使う社員・外注さんの宛先を登録しておけます。Googleスプレッドシート連携で他アプリとも共有できるよう、商品マスタ・委託先マスタと同じ仕組みで保存されています。
      </p>
      <Card className="overflow-hidden" style={{ borderWidth: 2 }}>
        <div className="overflow-x-auto zk-scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  名前
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  種別
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  住所
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  電話番号
                </th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {sortedRecipients.map((r, idx) => {
    const prevType = idx > 0 ? sortedRecipients[idx - 1].type : null;
    const showHeader = r.type !== prevType;
    return <React.Fragment key={r.id}>
                    {showHeader && <tr>
                        <td colSpan={5} className="px-3 py-1.5 text-xs font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent2)", borderTop: "2px solid var(--accent)", borderBottom: "2px solid var(--accent)" }}>
                          {r.type}
                        </td>
                      </tr>}
                    <tr className="border-t" style={{ borderColor: "var(--border)", background: idx % 2 ? "var(--paper)" : "var(--card)" }}>
                      <td className="py-2 px-3 font-medium" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                        {r.name}
                      </td>
                      <td className="py-2 px-3">
                        <Badge tone={r.type === "\u793E\u54E1" ? "success" : r.type === "\u5916\u6CE8" ? "accent" : "default"}>
                          {r.type}
                        </Badge>
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)", whiteSpace: "normal", wordBreak: "break-word" }}>
                        {r.zip && <span style={{ color: "var(--text-muted)" }}>〒{r.zip} </span>}
                        {r.address}
                      </td>
                      <td className="py-2 px-3" style={{ color: "var(--text-muted)" }}>
                        {r.phone || "-"}
                      </td>
                      <td className="py-2 px-3">
                        {del.isPending(r.id) ? <ConfirmBar message="削除しますか？" onConfirm={() => remove(r.id)} onCancel={del.cancel} /> : <div className="flex gap-1 justify-end">
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setModal(r)}>
                              <Pencil size={14} />
                            </button>
                            <button className="p-1.5 rounded hover:bg-black/5" onClick={() => del.ask(r.id)}>
                              <Trash2 size={14} style={{ color: "var(--danger)" }} />
                            </button>
                          </div>}
                      </td>
                    </tr>
                  </React.Fragment>;
  })}
              {recipients.length === 0 && <tr>
                  <td colSpan={5}>
                    <EmptyState icon={MapPin} title="発送先がまだ登録されていません" description="社員・外注さんなど、よく発送する宛先を登録しておくと選ぶだけで使えます" />
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "new" ? "\u767A\u9001\u5148\u3092\u8FFD\u52A0" : modal === "bulk" ? "\u767A\u9001\u5148\u3092\u307E\u3068\u3081\u3066\u8FFD\u52A0" : "\u767A\u9001\u5148\u3092\u7DE8\u96C6"} wide={modal === "bulk"} footer={modal === "bulk" ? <>
              <Button variant="ghost" onClick={() => setModal(null)}>
                キャンセル
              </Button>
              <Button variant="accent" icon={UploadCloud} onClick={() => bulkRef.current?.confirm()} disabled={bulkCount === 0}>
                {bulkCount}\u4EF6\u3092\u8FFD\u52A0
              </Button>
            </> : null}>
        {modal === "bulk" ? <BulkPasteImporter ref={bulkRef} fields={RECIPIENT_BULK_FIELDS} previewKeys={["name", "type", "address", "phone"]} placeholder={"\u540D\u524D\t\u7A2E\u5225\t\u90F5\u4FBF\u756A\u53F7\t\u4F4F\u6240\t\u96FB\u8A71\u756A\u53F7\n\u5C71\u7530\u592A\u90CE\t\u793E\u54E1\t150-0001\t\u6771\u4EAC\u90FD\u6E0B\u8C37\u533A...\t090-1234-5678"} onAdd={bulkAdd} onCountChange={setBulkCount} /> : <RecipientForm initial={modal === "new" ? null : modal} onSave={save} onCancel={() => setModal(null)} />}
      </Modal>
    </div>;
}
function RecipientForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_RECIPIENT);
  const [error, setError] = useState("");
  const [zipLoading, setZipLoading] = useState(false);
  const [zipError, setZipError] = useState("");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const lookupZip = async (zipRaw) => {
    const digits = (zipRaw || "").replace(/[^0-9]/g, "");
    if (digits.length !== 7) return;
    setZipLoading(true);
    setZipError("");
    try {
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
      const json = await res.json();
      const r = json.results?.[0];
      if (r) {
        const prefix = `${r.address1}${r.address2}${r.address3}`;
        setForm((f) => ({ ...f, address: f.address.startsWith(prefix) ? f.address : prefix + f.address }));
      } else {
        setZipError("\u8A72\u5F53\u3059\u308B\u4F4F\u6240\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F");
      }
    } catch {
      setZipError("\u691C\u7D22\u306B\u5931\u6557\u3057\u307E\u3057\u305F(\u30CD\u30C3\u30C8\u30EF\u30FC\u30AF\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044)");
    }
    setZipLoading(false);
  };
  const handleSubmit = () => {
    if (!form.name.trim() || !form.address.trim()) {
      setError("\u540D\u524D\u3068\u4F4F\u6240\u306F\u5FC5\u9808\u3067\u3059");
      return;
    }
    onSave(form);
  };
  return <div className="space-y-3">
      {error && <p className="text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>}
      <Input label="名前 *" value={form.name} onChange={set("name")} placeholder="例: 山田太郎" />
      <Select label="種別" value={form.type} onChange={set("type")}>
        <option>社員</option>
        <option>外注</option>
        <option>その他</option>
      </Select>
      <div>
        <Input label="郵便番号" value={form.zip || ""} onChange={(e) => {
      set("zip")(e);
      lookupZip(e.target.value);
    }} placeholder="例: 150-0001" />
        {zipLoading && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            住所を検索中…
          </p>}
        {zipError && <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>
            {zipError}
          </p>}
        {!zipLoading && !zipError && <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            7桁入力すると住所を自動で補完します(番地・建物名は手入力してください)
          </p>}
      </div>
      <Input label="住所 *" value={form.address} onChange={set("address")} />
      <Input label="電話番号(任意)" value={form.phone} onChange={(e) => set("phone")({ target: { value: normalizePhone(e.target.value) } })} />
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check}>
          保存
        </Button>
      </div>
    </div>;
}
function InventoryValuation({ products, transactions, consignees }) {
  const today = todayStr();
  const [valuationDate, setValuationDate] = useState(today);
  const valuationInventory = useMemo(() => {
    const filteredTx = transactions.filter((t) => t.date && t.date <= valuationDate);
    return computeInventory(filteredTx, products, consignees);
  }, [valuationDate, transactions, products, consignees]);
  const rows = useMemo(() => {
    const selfIds = new Set(consignees.filter((c) => c.contractType === "\u81EA\u793E").map((c) => c.id));
    const consignIds = new Set(consignees.filter((c) => c.contractType === "\u59D4\u8A17").map((c) => c.id));
    return products.map((p) => {
      const row = valuationInventory[p.id] || {};
      const qty = row.__total || 0;
      const selfQty = Object.entries(row).reduce((s, [k, v]) => selfIds.has(k) ? s + v : s, 0);
      const consignQty = Object.entries(row).reduce((s, [k, v]) => consignIds.has(k) ? s + v : s, 0);
      const cost = getCostAsOf(p, valuationDate);
      return { product: p, qty, selfQty, consignQty, cost, subtotal: qty * cost, selfSubtotal: selfQty * cost, consignSubtotal: consignQty * cost };
    }).filter((r) => r.qty !== 0).sort((a, b) => b.subtotal - a.subtotal);
  }, [products, valuationInventory, valuationDate, consignees]);
  const total = rows.reduce((s, r) => s + r.subtotal, 0);
  const selfTotal = rows.reduce((s, r) => s + r.selfSubtotal, 0);
  const consignTotal = rows.reduce((s, r) => s + r.consignSubtotal, 0);
  const noCostCount = rows.filter((r) => r.cost === 0).length;
  const exportCsv = () => {
    const csvRows = rows.map((r) => ({ 商品名: r.product.name, シリーズ: r.product.genre || "", 数量: r.qty, 自社分: r.selfQty, 委託分: r.consignQty, 原価: r.cost, 小計: r.subtotal }));
    downloadText(`棚卸資産明細_${valuationDate}.csv`, "\uFEFF" + toCsv(csvRows, ["商品名", "シリーズ", "数量", "自社分", "委託分", "原価", "小計"]));
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow="決算・確定申告用" title="棚卸資産明細" action={<Button variant="ghost" icon={Download} onClick={exportCsv} disabled={!rows.length}>
            CSV出力
          </Button>} />
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            時点指定
          </label>
          <input type="date" value={valuationDate} onChange={(e) => setValuationDate(e.target.value)} max={today} className="rounded-md border px-2 py-1 text-sm outline-none" style={{ borderColor: "var(--border)" }} />
          {valuationDate !== today && <Button variant="ghost" size="sm" onClick={() => setValuationDate(today)}>
              今日に戻す
            </Button>}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            よく使う日付:
          </span>
          <button type="button" onClick={() => setValuationDate(today)} className="px-2 py-1 rounded-md text-xs font-medium" style={valuationDate === today ? { background: "var(--accent-soft)", color: "var(--ink)" } : { color: "var(--text-muted)", border: "1px solid var(--border)" }}>
            今日
          </button>
          {[0, 1, 2, 3].map((yearsAgo) => {
      const y = Number(today.slice(0, 4)) - yearsAgo;
      const d = `${y}-01-31`;
      if (d > today) return null;
      return <button key={d} type="button" onClick={() => setValuationDate(d)} className="px-2 py-1 rounded-md text-xs font-medium" style={valuationDate === d ? { background: "var(--accent-soft)", color: "var(--ink)" } : { color: "var(--text-muted)", border: "1px solid var(--border)" }}>
                {y}/1/31
              </button>;
    })}
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {valuationDate}までの取引記録を積み上げて、その時点の在庫数を再現しています。原価は、指定日以前に登録されている履歴の中で一番新しい値を使っています（最終仕入原価法の考え方）。委託先に預けている在庫は含みますが、買取に出した在庫は発送時点で除外されます。
        </p>
        {noCostCount > 0 && <div className="text-xs px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
            原価未登録の商品が{noCostCount}件あります（0円として計算されています）。正確な金額にするには商品マスタで原価を入力してください。
          </div>}
      </Card>
      <Card className="overflow-hidden" style={{ borderWidth: 2, width: "100%" }}>
        <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">合計棚卸資産額</span>
            <span className="text-xl font-bold" style={{ color: "var(--accent2)" }}>
              {formatYen(total)}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
            <span>
              自社確保分:{" "}
              <strong style={{ color: "var(--ink)" }}>{formatYen(selfTotal)}</strong>
            </span>
            <span>
              委託分:{" "}
              <strong style={{ color: "var(--ink)" }}>{formatYen(consignTotal)}</strong>
            </span>
          </div>
        </div>
        <TopScrollSync tableClassName="text-sm" tableStyle={{ tableLayout: "fixed", width: "100%", minWidth: 620 }} thead={<thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3 font-medium sticky left-0" style={{ width: 200, boxSizing: "border-box", color: "var(--text-muted)", background: "var(--paper)", borderRight: "1px solid var(--border)" }}>
                  商品名
                </th>
                <th className="py-2 px-3 font-medium" style={{ width: 100, boxSizing: "border-box", color: "var(--accent2)" }}>
                  シリーズ
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 80, boxSizing: "border-box", color: "var(--text-muted)" }}>
                  数量
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 90, boxSizing: "border-box", color: "var(--text-muted)" }}>
                  原価
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 150, boxSizing: "border-box", color: "var(--text-muted)" }}>
                  小計
                </th>
                <th className="py-2 px-3" />
              </tr>
            </thead>} tbody={<tbody>
              {rows.map((r, idx) => <tr key={r.product.id} style={{ background: idx % 2 ? "var(--paper)" : "var(--card)" }}>
                  <td className="py-2 px-3 font-medium sticky left-0" style={{ width: 200, boxSizing: "border-box", background: idx % 2 ? "var(--paper)" : "var(--card)", borderTop: "1px solid var(--border)", borderRight: "1px solid var(--border)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.3 }}>
                    {r.product.name}
                  </td>
                  <td className="py-2 px-3" style={{ boxSizing: "border-box", borderTop: "1px solid var(--border)" }}>
                    {r.product.genre ? <Badge tone="accent">{r.product.genre}</Badge> : "-"}
                  </td>
                  <td className="py-2 px-3 text-right font-mono" style={{ boxSizing: "border-box", borderTop: "1px solid var(--border)" }}>
                    {formatNum(r.qty)}
                  </td>
                  <td className="py-2 px-3 text-right font-mono" style={{ boxSizing: "border-box", color: r.cost === 0 ? "var(--danger)" : "var(--ink)", borderTop: "1px solid var(--border)" }}>
                    {r.cost ? formatYen(r.cost) : "未登録"}
                  </td>
                  <td className="py-2 px-3 text-right font-mono font-semibold" style={{ boxSizing: "border-box", borderTop: "1px solid var(--border)" }}>
                    {formatYen(r.subtotal)}
                  </td>
                  <td style={{ borderTop: "1px solid var(--border)" }} />
                </tr>)}
              {rows.length === 0 && <tr>
                  <td colSpan={6}>
                    <EmptyState icon={ClipboardList} title="在庫がありません" description="指定した日付時点で在庫がない商品しかありません" />
                  </td>
                </tr>}
            </tbody>} />
      </Card>
    </div>;
}
function Receivables({ consignees, transactions, adjustments, setAdjustments, monthlyChecks }) {
  const [month, setMonth] = useState(monthKey(todayStr()));
  const estimates = useMemo(() => computeSalesEstimate(consignees, transactions, month, adjustments), [consignees, transactions, month, adjustments]);
  const totalEstimated = estimates.reduce((s, r) => s + r.estimatedPayout, 0);
  const fy = fiscalYearOf(month + "-01");
  const yearTotalEstimated = useMemo(() => computeSalesEstimateFiscalYearTotal(consignees, transactions, adjustments, fy), [consignees, transactions, adjustments, fy]);
  const monthsAvailable = useMemo(() => {
    const s = /* @__PURE__ */ new Set([monthKey(todayStr())]);
    for (const t of transactions) if (isRevenueTx(t) && t.date) s.add(monthKey(t.date));
    return Array.from(s).sort().reverse();
  }, [transactions]);
  const updateAdjustment = (consigneeId, value) => {
    setAdjustments((prev) => {
      const idx = prev.findIndex((a) => a.consigneeId === consigneeId && a.month === month);
      if (idx === -1) return [...prev, { id: uid("ADJ"), consigneeId, month, amount: value }];
      const next = [...prev];
      next[idx] = { ...next[idx], amount: value };
      return next;
    });
  };
  const billableConsignees = consignees.filter((c) => c.status !== "\u9589\u5E97" && (c.contractType === "\u59D4\u8A17" || c.contractType === "\u8CB7\u53D6"));
  const [detailConsigneeId, setDetailConsigneeId] = useState("");
  const detailConsignee = billableConsignees.find((c) => c.id === detailConsigneeId);
  const monthlyTotals = useMemo(() => detailConsignee ? computeConsigneeMonthlyTotals(detailConsignee, transactions, fy) : [], [detailConsignee, transactions, fy]);
  const skipSet = useMemo(() => {
    if (!detailConsignee) return /* @__PURE__ */ new Set();
    return new Set(monthlyChecks.filter((m) => m.consigneeId === detailConsignee.id && m.kind === "sales" && m.state === "skip").map((m) => m.month));
  }, [monthlyChecks, detailConsignee]);
  return <div className="space-y-4 max-w-4xl mx-auto">
      <SectionTitle eyebrow="自動集計" title="売掛管理" action={<MonthNav month={month} setMonth={setMonth} monthsAvailable={monthsAvailable} />} />
      <div className="flex gap-3 flex-wrap">
        <StatCard label={`${month} \u4E88\u60F3\u5165\u91D1\u984D \u5408\u8A08`} value={formatYen(totalEstimated)} icon={Receipt} />
        <StatCard label={`${fy}\u5E74\u5EA6 \u7D2F\u8A08\u4E88\u60F3\u5165\u91D1\u984D`} value={formatYen(yearTotalEstimated)} icon={TrendingUp} tone="accent" />
      </div>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        「その月の売上」は選んだ月に記録された取引記録から自動計算した見込み額です(税抜き計算のズレなどで実際とは数円〜数百円ずれることがあります)。「調整額」と「予想入金額」はどちらからでも入力できます(振込手数料やSTORESの倉庫代など、引かれる金額が分かっている場合は「調整額」にマイナスの数字を、実際に振り込まれる金額そのものが分かっている場合は「予想入金額」に直接入力してください。どちらかを直すと、もう片方も自動で計算し直されます)。調整額は月ごとに別々に記録されます。入金の実績管理・消込は行いません(他のシステムをご利用ください)。
      </p>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto zk-scrollbar">
          <table className="w-full text-sm min-w-[640px]" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3 font-medium sticky left-0" style={{ width: 140, boxSizing: "border-box", color: "var(--text-muted)", background: "var(--paper)", borderRight: "1px solid var(--border)" }}>
                  委託先
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 150, color: "var(--text-muted)", whiteSpace: "normal", lineHeight: 1.3 }}>
                  {month}の売上
                  <br />
                  (手取りベース)
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 120, color: "var(--text-muted)" }}>
                  調整額
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ width: 130, color: "var(--text-muted)" }}>
                  予想入金額
                </th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((r, idx) => <tr key={r.consignee.id} style={{ background: idx % 2 ? "var(--paper)" : "var(--card)" }}>
                  <td className="py-2 px-3 font-medium sticky left-0" style={{ width: 140, boxSizing: "border-box", background: idx % 2 ? "var(--paper)" : "var(--card)", borderTop: "1px solid var(--border)", borderRight: "1px solid var(--border)", whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.3 }}>
                    {r.consignee.name}
                  </td>
                  <td className="py-2 px-3 text-right font-mono" style={{ borderTop: "1px solid var(--border)" }}>
                    {formatYen(r.cumulativeSales)}
                  </td>
                  <td className="py-2 px-3 text-right" style={{ borderTop: "1px solid var(--border)" }}>
                    <DebouncedNumberInput value={r.adjustment} onCommit={(text) => updateAdjustment(r.consignee.id, text)} className="w-full text-right rounded-md border px-2 py-1 text-sm font-mono outline-none" style={{ borderColor: "var(--border)" }} placeholder="例: -500" />
                  </td>
                  <td className="py-2 px-3 text-right" style={{ borderTop: "1px solid var(--border)" }}>
                    <DebouncedNumberInput value={r.estimatedPayout} onCommit={(text) => updateAdjustment(r.consignee.id, (Number(text) || 0) - r.cumulativeSales)} className="w-full text-right rounded-md border px-2 py-1 text-sm font-mono font-semibold outline-none" style={{ borderColor: "var(--border)" }} />
                  </td>
                </tr>)}
              {estimates.length === 0 && <tr>
                  <td colSpan={4}>
                    <EmptyState icon={Receipt} title="対象データがありません" description={`${month}\u306E\u8CA9\u58F2\u53D6\u5F15\u304C\u8A18\u9332\u3055\u308C\u308B\u3068\u81EA\u52D5\u7684\u306B\u96C6\u8A08\u3055\u308C\u307E\u3059`} />
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <span className="font-medium text-sm">
            委託先の年間月次推移(請求金額の確認用)
          </span>
          <div className="w-56">
            <Combobox options={billableConsignees.map((c) => ({ value: c.id, label: c.name }))} value={detailConsigneeId} onChange={setDetailConsigneeId} placeholder="委託先を選んで表示…" />
          </div>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          「次月合算」の月には印が付き、その翌月には「◯月分を含む合算額」という表示が出ます。翌月に記録した金額が実際に前月分を含んでいるか、金額の大きさで確認してください(スキップした月自体の金額は0のままなので、内訳の自動分解はできません)。
        </p>
        {!detailConsignee ? <div className="text-sm py-4 text-center" style={{ color: "var(--text-muted)" }}>
            委託先を選択してください
          </div> : <div className="overflow-x-auto zk-scrollbar">
            <table className="text-sm">
              <thead>
                <tr className="text-left">
                  {monthlyTotals.map((mt) => <th key={mt.month} className="py-1.5 px-3 font-medium whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                      {mt.label}
                    </th>)}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t" style={{ borderColor: "var(--border)" }}>
                  {monthlyTotals.map((mt, i) => {
    const prevSkipped = i > 0 && skipSet.has(monthlyTotals[i - 1].month);
    return <td key={mt.month} className="py-1.5 px-3 whitespace-nowrap" style={{ background: skipSet.has(mt.month) ? "var(--accent-soft)" : prevSkipped ? "var(--success-soft)" : "transparent" }}>
                        <div className="font-mono text-right">
                          {formatYen(mt.amount)}
                        </div>
                        {skipSet.has(mt.month) && <Badge tone="accent">次月合算</Badge>}
                        {prevSkipped && <div className="text-xs text-right mt-0.5" style={{ color: "var(--success)" }}>
                            {monthlyTotals[i - 1].label}分を含む合算額
                          </div>}
                      </td>;
  })}
                </tr>
              </tbody>
            </table>
          </div>}
      </Card>
    </div>;
}
function MonthlyChecklist({ consignees, monthlyChecks, setMonthlyChecks }) {
  const [month, setMonth] = useState(monthKey(todayStr()));
  const [showDone, setShowDone] = useState(true);
  const monthsAvailable = useMemo(() => {
    const s = /* @__PURE__ */ new Set([monthKey(todayStr())]);
    for (const m of monthlyChecks) if (m.month) s.add(m.month);
    return Array.from(s).sort().reverse();
  }, [monthlyChecks]);
  const salesTargets = consignees.filter((c) => c.contractType === "\u59D4\u8A17" && c.status === "\u7A3C\u50CD\u4E2D" && c.cadence !== "spot");
  const invoiceTargets = consignees.filter((c) => c.contractType === "\u8CB7\u53D6" && c.status === "\u7A3C\u50CD\u4E2D" && c.cadence !== "spot");
  const findCheck = (consigneeId, kind) => monthlyChecks.find((m) => m.consigneeId === consigneeId && m.month === month && m.kind === kind);
  const setState = (consigneeId, kind, state) => {
    setMonthlyChecks((prev) => {
      const idx = prev.findIndex((m) => m.consigneeId === consigneeId && m.month === month && m.kind === kind);
      const record = { id: uid("CHK"), consigneeId, month, kind, state, doneAt: (/* @__PURE__ */ new Date()).toISOString() };
      if (idx === -1) return [...prev, record];
      const next = [...prev];
      next[idx] = { ...next[idx], state, doneAt: (/* @__PURE__ */ new Date()).toISOString() };
      return next;
    });
  };
  const clearState = (consigneeId, kind) => {
    setMonthlyChecks((prev) => prev.filter((m) => !(m.consigneeId === consigneeId && m.month === month && m.kind === kind)));
  };
  const ChecklistSection = ({ title, description, kind, targets }) => {
    const stateOf = (c) => findCheck(c.id, kind)?.state || null;
    const pending = targets.filter((c) => !stateOf(c));
    const done = targets.filter((c) => stateOf(c) === "done");
    const skipped = targets.filter((c) => stateOf(c) === "skip");
    const resolvedCount = done.length + skipped.length;
    return <Card className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-sm">{title}</span>
          <Badge tone={pending.length === 0 ? "success" : "accent"}>
            {resolvedCount}/{targets.length} 対応済み
          </Badge>
        </div>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
        {targets.length === 0 ? <div className="text-sm py-3 text-center" style={{ color: "var(--text-muted)" }}>
            対象の委託先がありません
          </div> : pending.length === 0 ? <div className="text-sm py-3 text-center" style={{ color: "var(--success)" }}>
            この月は全て対応済みです ✓
          </div> : <div className="space-y-1.5">
            {pending.map((c) => <div key={c.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-black/[0.03]">
                <input type="checkbox" checked={false} onChange={() => setState(c.id, kind, "done")} />
                <span className="text-sm flex-1">{c.name}</span>
                <button type="button" className="text-xs underline whitespace-nowrap" style={{ color: "var(--accent2)" }} onClick={() => setState(c.id, kind, "skip")}>
                  {kind === "sales" ? "\u4ECA\u6708\u306F\u30B9\u30AD\u30C3\u30D7(\u6B21\u6708\u5408\u7B97)" : "\u4ECA\u6708\u306F\u306A\u3057"}
                </button>
              </div>)}
          </div>}
        {skipped.length > 0 && <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              {kind === "sales" ? "\u6B21\u6708\u5408\u7B97\u4E88\u5B9A(\u3053\u306E\u6708\u306F\u5831\u544A\u306A\u3057)" : "\u5BFE\u8C61\u5916(\u4ECA\u6708\u306F\u8ACB\u6C42\u306A\u3057)"}
            </div>
            {skipped.map((c) => <div key={c.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md" style={{ background: "var(--paper)" }}>
                <Badge tone="info">
                  {kind === "sales" ? "\u6B21\u6708\u5408\u7B97" : "\u4ECA\u6708\u306F\u306A\u3057"}
                </Badge>
                <span className="text-sm flex-1">{c.name}</span>
                <button type="button" className="text-xs underline" style={{ color: "var(--text-muted)" }} onClick={() => clearState(c.id, kind)}>
                  取り消す
                </button>
              </div>)}
          </div>}
        {showDone && done.length > 0 && <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: "var(--border)" }}>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              完了済み
            </div>
            {done.map((c) => {
      const chk = findCheck(c.id, kind);
      return <label key={c.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-black/[0.03]">
                  <input type="checkbox" checked={true} onChange={() => clearState(c.id, kind)} />
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {c.name}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
                    {chk?.doneAt?.slice(0, 10)}
                  </span>
                </label>;
    })}
          </div>}
      </Card>;
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow="入力・請求もれ防止" title="月次チェック" action={<MonthNav month={month} setMonth={setMonth} monthsAvailable={monthsAvailable} />} />
      <label className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
        <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
        完了済みも表示する(履歴確認)
      </label>
      <div className="grid md:grid-cols-2 gap-4">
        <ChecklistSection title="委託先の売上入力チェック" description="この月の売上報告をもらって取引記録に入力したら、チェックしてください。今月は報告なし(次月合算)の場合はその旨も記録できます。" kind="sales" targets={salesTargets} />
        <ChecklistSection title="買取の請求チェック" description="この月分の請求書を送付・確認したら、チェックしてください。今月は請求が発生しない場合は「今月はなし」を選べます。" kind="invoice" targets={invoiceTargets} />
      </div>
    </div>;
}
function emptyManualShipping() {
  return { isIndividual: false, consigneeId: "", locationId: "", date: todayStr(), deadline: "", items: [{ productId: "", qty: 1, sampleQty: 0 }], recipientName: "", recipientAddress: "", recipientPhone: "", itemsText: "", memo: "" };
}
function ShippingRequests({ shippingRequests, setShippingRequests, appendShippingRequestsSafe, consignees, products, focusId, onFocusConsumed, onCreateDeliveryNote, deliveryNotes, setDeliveryNotes, onCreateInvoice, invoices, setInvoices, coverLetters, setCoverLetters, appendCoverLettersSafe, settings, recipients, goTo }) {
  const [showDone, setShowDone] = useState(true);
  const [modal, setModal] = useState(null);
  const [emailConfirmReq, setEmailConfirmReq] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => /* @__PURE__ */ new Set());
  const toggleExpand = (id) => setExpandedIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const consigneeById = Object.fromEntries(consignees.map((c) => [c.id, c]));
  const del = useDeleteConfirm();
  const pending = shippingRequests.filter((r) => r.status !== "done");
  const done = shippingRequests.filter((r) => r.status === "done").sort((a, b) => (b.completedAt || "").localeCompare(a.completedAt || ""));
  const { pageItems: pendingPage, page: pendPage, setPage: setPendPage, pageSize: pendPageSize, setPageSize: setPendPageSize, totalPages: pendTotalPages, totalCount: pendTotalCount } = usePagination(pending, 10);
  const { pageItems: donePage, page: doneP, setPage: setDoneP, pageSize: donePageSize, setPageSize: setDonePageSize, totalPages: doneTotalPages, totalCount: doneTotalCount } = usePagination(done, 10);
  useEffect(() => {
    if (!focusId) return;
    const target = shippingRequests.find((r) => r.id === focusId);
    if (target) setModal(target);
    onFocusConsumed?.();
  }, [focusId, shippingRequests, onFocusConsumed]);
  const sendShipEmail = async (req) => {
    if (!settings?.appsScriptUrl) return;
    const consignee = consigneeById[req.consigneeId];
    const loc = !req.isIndividual ? consignee?.locations?.find((l) => l.id === req.locationId) : null;
    const email = loc?.email || "";
    if (!email) return;
    const itemLines = (req.items || []).map((it) => {
      const p = productById[it.productId];
      return `\u30FB${p?.name || "(\u4E0D\u660E)"} ${it.qty}\u500B`;
    }).join("\n");
    const subject = `\u3010\u767A\u9001\u5B8C\u4E86\u306E\u3054\u6848\u5185\u3011${consignee?.name || ""}\u69D8`;
    const body = `${consignee?.name || ""} \u69D8

\u304A\u4E16\u8A71\u306B\u306A\u3063\u3066\u304A\u308A\u307E\u3059\u3002\u4EE5\u4E0B\u306E\u5546\u54C1\u3092\u767A\u9001\u3044\u305F\u3057\u307E\u3057\u305F\u306E\u3067\u3054\u6848\u5185\u3044\u305F\u3057\u307E\u3059\u3002

${itemLines}

\u3088\u308D\u3057\u304F\u304A\u9858\u3044\u3044\u305F\u3057\u307E\u3059\u3002`;
    try {
      await fetch(settings.appsScriptUrl, { method: "POST", mode: "no-cors", body: JSON.stringify({ type: "send-email", to: email, subject, body }) });
    } catch {
    }
  };
  const finishComplete = (id, sendEmail) => setShippingRequests((prev) => prev.map((r) => {
    if (r.id !== id) return r;
    const updated = { ...r, status: "done", completedAt: (/* @__PURE__ */ new Date()).toISOString() };
    if (sendEmail && !r.emailSentAt) {
      updated.emailSentAt = (/* @__PURE__ */ new Date()).toISOString();
      sendShipEmail(updated);
    }
    return updated;
  }));
  const complete = (id) => {
    const r = shippingRequests.find((x) => x.id === id);
    const consignee = r ? consigneeById[r.consigneeId] : null;
    const loc = r && !r.isIndividual ? consignee?.locations?.find((l) => l.id === r.locationId) : null;
    const canEmail = !!settings?.appsScriptUrl && !!loc?.email && !r?.emailSentAt;
    if (canEmail) {
      setEmailConfirmReq({ id, consigneeName: consignee?.name || "", email: loc.email });
    } else {
      finishComplete(id, false);
    }
  };
  const reopen = (id) => setShippingRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: "pending", completedAt: "" } : r));
  const remove = (id) => {
    setShippingRequests((prev) => prev.filter((r) => r.id !== id));
    del.cancel();
  };
  const [viewingDoc, setViewingDoc] = useState(null);
  const issueDelivery = (req) => {
    const note = onCreateDeliveryNote?.(req);
    if (note) {
      setShippingRequests((prev) => prev.map((r) => r.id === req.id ? { ...r, deliveryNoteId: note.id } : r));
      setViewingDoc({ kind: "delivery", doc: note });
    }
  };
  const issueInvoice = (req) => {
    const inv = onCreateInvoice?.(req);
    if (inv) {
      setShippingRequests((prev) => prev.map((r) => r.id === req.id ? { ...r, invoiceId: inv.id } : r));
      setViewingDoc({ kind: "invoice", doc: inv });
    }
  };
  const [coverLetterDraft, setCoverLetterDraft] = useState(null);
  const [coverLetterViewId, setCoverLetterViewId] = useState(null);
  const openCoverLetterDraft = (req) => setCoverLetterDraft({ req, message: DEFAULT_COVER_LETTER_MESSAGE, itemsText: req.itemsText || "" });
  const openCoverLetterEdit = (letter) => setCoverLetterDraft({ editingId: letter.id, req: { recipientName: letter.recipientName, recipientAddress: letter.recipientAddress, id: letter.sourceRequestId }, message: letter.message, itemsText: letter.itemsText });
  const [savingCoverLetter, setSavingCoverLetter] = useState(false);
  const saveCoverLetter = async () => {
    if (!coverLetterDraft) return;
    if (coverLetterDraft.editingId) {
      setCoverLetters((prev) => prev.map((l) => l.id === coverLetterDraft.editingId ? { ...l, itemsText: coverLetterDraft.itemsText, message: coverLetterDraft.message } : l));
      setCoverLetterDraft(null);
      setCoverLetterViewId(coverLetterDraft.editingId);
      return;
    }
    const letter = { id: uid("CL"), date: todayStr(), recipientName: coverLetterDraft.req.recipientName || "", recipientAddress: coverLetterDraft.req.recipientAddress || "", itemsText: coverLetterDraft.itemsText, message: coverLetterDraft.message, sourceRequestId: coverLetterDraft.req.id };
    setSavingCoverLetter(true);
    let ok = true;
    try {
      if (appendCoverLettersSafe) ok = await appendCoverLettersSafe([letter]);
      else setCoverLetters((prev) => [...prev, letter]);
      if (ok !== false) setShippingRequests((prev) => prev.map((r) => r.id === coverLetterDraft.req.id ? { ...r, coverLetterId: letter.id } : r));
    } finally {
      setSavingCoverLetter(false);
    }
    if (ok === false) return;
    setCoverLetterDraft(null);
    setCoverLetterViewId(letter.id);
  };
  const viewingCoverLetter = coverLetters?.find((l) => l.id === coverLetterViewId);
  const [savingManual, setSavingManual] = useState(false);
  const saveManual = async (form) => {
    const req = form.isIndividual ? { id: uid("SHIP"), isIndividual: true, recipientName: form.recipientName.trim(), recipientAddress: form.recipientAddress.trim(), recipientPhone: form.recipientPhone.trim(), itemsText: form.itemsText.trim(), deadline: form.deadline, date: form.date, items: [], status: "pending", completedAt: "", memo: form.memo, manual: true } : { id: uid("SHIP"), isIndividual: false, consigneeId: form.consigneeId, locationId: form.locationId, deadline: form.deadline, date: form.date, items: form.items.filter((i) => i.productId).map((i) => ({ productId: i.productId, qty: Number(i.qty) || 0, sampleQty: Number(i.sampleQty) || 0 })), status: "pending", completedAt: "", memo: form.memo, manual: true };
    setSavingManual(true);
    let ok = true;
    try {
      if (appendShippingRequestsSafe) ok = await appendShippingRequestsSafe([req]);
      else setShippingRequests((prev) => [...prev, req]);
    } finally {
      setSavingManual(false);
    }
    if (ok !== false) setModal(null);
  };
  const saveEdit = (form) => {
    setShippingRequests((prev) => prev.map((r) => {
      if (r.id !== form.id) return r;
      if (r.isIndividual) {
        return { ...r, deadline: form.deadline, memo: form.memo, assignee: form.assignee, requester: form.requester, recipientName: form.recipientName, recipientAddress: form.recipientAddress, recipientPhone: form.recipientPhone, itemsText: form.itemsText };
      }
      return { ...r, locationId: form.locationId, deadline: form.deadline, memo: form.memo, assignee: form.assignee, requester: form.requester, items: r.items.map((it, i) => ({ ...it, sampleQty: Number(form.items[i]?.sampleQty) || 0 })) };
    }));
    setModal(null);
  };
  const Row = ({ r }) => {
    const consignee = consigneeById[r.consigneeId];
    const locs = consignee?.locations || [];
    const loc = locs.find((l) => l.id === r.locationId);
    const overdue = r.status !== "done" && r.deadline && r.deadline < todayStr();
    const done2 = r.status === "done";
    const expanded = expandedIds.has(r.id);
    const sampleCount = r.isIndividual ? 0 : r.items.reduce((s, it) => s + (Number(it.sampleQty) || 0), 0);
    const displayName = r.isIndividual ? r.recipientName || "(\u5B9B\u5148\u672A\u8A2D\u5B9A)" : consignee?.name || "(\u524A\u9664\u6E08\u307F\u59D4\u8A17\u5148)";
    return <Card className="p-3" style={done2 ? { background: "var(--paper)", opacity: 0.75 } : void 0}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button type="button" className="flex items-center gap-2 flex-wrap text-left flex-1 min-w-0" onClick={() => toggleExpand(r.id)}>
            {expanded ? <ChevronUp size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} /> : <ChevronDown size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />}
            <span className="font-medium" style={{ color: done2 ? "var(--text-muted)" : "var(--text)" }}>
              {displayName}
            </span>
            {r.isIndividual ? <Badge tone="info">個人</Badge> : <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                商品{r.items.length}件
                {sampleCount > 0 ? `\u30FB\u30B5\u30F3\u30D7\u30EB${sampleCount}\u500B` : ""}
              </span>}
            {r.manual && <Badge tone="accent">手動追加</Badge>}
            {done2 && <Badge tone="success">完了</Badge>}
            {done2 && (r.emailSentAt ? <Badge tone="info">確認メール送信済み</Badge> : loc?.email ? null : done2 && !r.isIndividual && <Badge tone="default">メール未登録</Badge>)}
            {overdue && <Badge tone="danger">締切超過</Badge>}
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {r.date}
              {r.deadline ? `\u30FB\u7DE0\u5207${r.deadline}` : ""}
              {r.assignee ? `\u30FB\u62C5\u5F53${r.assignee}` : ""}
              {r.requester ? `\u30FB\u4F9D\u983C${r.requester}` : ""}
              {done2 && r.completedAt ? `\u30FB\u5B8C\u4E86${localDateFromISO(r.completedAt)}` : ""}
            </span>
          </button>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:flex-wrap sm:w-auto sm:shrink-0">
            {del.isPending(r.id) ? <ConfirmBar message="削除しますか？" onConfirm={() => remove(r.id)} onCancel={del.cancel} /> : <>
                {!r.isIndividual && (r.deliveryNoteId ? <Button variant="ghost" size="sm" icon={FileText} onClick={() => {
    const note = deliveryNotes?.find((d) => d.id === r.deliveryNoteId);
    if (note) setViewingDoc({ kind: "delivery", doc: note });
  }}>
                      納品書を見る
                    </Button> : <Button variant="ghost" size="sm" icon={FileText} onClick={() => issueDelivery(r)}>
                      納品書を発行
                    </Button>)}
                {!r.isIndividual && (consignee?.contractType === "\u8CB7\u53D6" || consignee?.contractType === "\u59D4\u8A17") && (r.invoiceId ? <Button variant="ghost" size="sm" icon={Receipt} onClick={() => {
    const inv = invoices?.find((i) => i.id === r.invoiceId);
    if (inv) setViewingDoc({ kind: "invoice", doc: inv });
  }}>
                      請求書を見る
                    </Button> : <Button variant="ghost" size="sm" icon={Receipt} onClick={() => issueInvoice(r)}>
                      請求書を発行
                    </Button>)}
                {r.isIndividual && (r.coverLetterId ? <Button variant="ghost" size="sm" icon={FileText} onClick={() => setCoverLetterViewId(r.coverLetterId)}>
                      送付状を見る
                    </Button> : <Button variant="ghost" size="sm" icon={FileText} onClick={() => openCoverLetterDraft(r)}>
                      送付状を発行
                    </Button>)}
                <Button variant="ghost" size="sm" icon={Pencil} onClick={() => setModal(r)}>
                  調整する
                </Button>
                {done2 ? <Button variant="ghost" size="sm" onClick={() => reopen(r.id)}>
                    未対応に戻す
                  </Button> : <Button variant="success" size="sm" icon={Check} onClick={() => complete(r.id)}>
                    発送完了
                  </Button>}
                <Button variant="ghost" size="sm" icon={Trash2} onClick={() => del.ask(r.id)}>
                  削除
                </Button>
              </>}
          </div>
        </div>

        {expanded && <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            {r.isIndividual ? <div className="mb-3 text-sm p-2 rounded-md" style={{ background: "var(--paper)" }}>
                <div className="font-medium text-xs" style={{ color: "var(--text-muted)" }}>
                  発送先(個人)
                </div>
                <div>{r.recipientAddress || "-"}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  宛名: {r.recipientName || "-"} / TEL:{" "}
                  {r.recipientPhone || "-"}
                </div>
                <div className="mt-2 whitespace-pre-wrap text-sm">
                  {r.itemsText || "(\u767A\u9001\u7269\u672A\u5165\u529B)"}
                </div>
              </div> : <>
                {locs.length > 0 && !r.locationId ? <div className="mb-2 text-xs px-2 py-1.5 rounded-md" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                    発送先の拠点が未選択です。「調整する」から選んでください。
                  </div> : loc ? <div className="mb-3 text-sm p-2 rounded-md" style={{ background: "var(--paper)" }}>
                    <div className="font-medium text-xs" style={{ color: "var(--text-muted)" }}>
                      発送先住所({loc.label || "\u62E0\u70B9"})
                    </div>
                    <div>
                      {loc.address || "-"}
                      {loc.building ? ` ${loc.building}` : ""}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      担当: {loc.contactPerson ? withHonorific(loc.contactPerson) : "-"} / TEL: {loc.phone || "-"}
                    </div>
                  </div> : locs.length === 0 ? <div className="mb-2 text-xs" style={{ color: "var(--danger)" }}>
                    この委託先には拠点(住所)が登録されていません。委託先マスタから登録してください。
                  </div> : null}

                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="py-1 font-medium text-xs" style={{ color: "var(--text-muted)" }}>
                        商品
                      </th>
                      <th className="py-1 font-medium text-xs text-right" style={{ color: "var(--text-muted)" }}>
                        数量
                      </th>
                      <th className="py-1 pl-3 font-medium text-xs text-right" style={{ color: "var(--text-muted)" }}>
                        サンプル
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.items.map((it, i) => <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                        <td className="py-1">
                          {productById[it.productId]?.name || "(\u524A\u9664\u6E08\u307F\u5546\u54C1)"}
                        </td>
                        <td className="py-1 text-right font-mono w-16">
                          {formatNum(it.qty)}個
                        </td>
                        <td className="py-1 pl-3 text-right w-16 font-mono" style={{ color: it.sampleQty ? "var(--ink)" : "var(--text-muted)" }}>
                          {it.sampleQty || 0}個
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </>}
            {r.memo && <div className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                メモ: {r.memo}
              </div>}
          </div>}
      </Card>;
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow="委託・買取・ECの出荷分を自動でリストアップ" title="発送依頼・確認リスト" action={<Button variant="accent" icon={Plus} onClick={() => setModal("new")}>
            手動で依頼を追加
          </Button>} />
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        取引記録で「委託・移動」「買取」「EC」を記録すると、自動でここに発送依頼が追加されます。不足分の追送など、取引記録を経由しない発送は「手動で依頼を追加」から作成してください。各依頼の「調整する」から、拠点・締切・サンプルを編集できます。
      </p>
      <label className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
        <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
        完了済みも表示する
      </label>

      <div className="space-y-3">
        {pending.length === 0 ? <EmptyState icon={ArrowLeftRight} title="未対応の発送依頼はありません" description="取引記録で移動・買取・ECを記録すると、ここに自動で追加されます" /> : pendingPage.map((r) => <Row key={r.id} r={r} />)}
      </div>
      {pending.length > 0 && <PaginationBar page={pendPage} setPage={setPendPage} pageSize={pendPageSize} setPageSize={setPendPageSize} totalPages={pendTotalPages} totalCount={pendTotalCount} pageSizeOptions={[10, 30]} />}
      {showDone && <>
          <div className="space-y-3">
            {donePage.map((r) => <Row key={r.id} r={r} />)}
          </div>
          <PaginationBar page={doneP} setPage={setDoneP} pageSize={donePageSize} setPageSize={setDonePageSize} totalPages={doneTotalPages} totalCount={doneTotalCount} pageSizeOptions={[10, 30]} />
        </>}

      <Modal open={!!emailConfirmReq} onClose={() => setEmailConfirmReq(null)} title="発送完了">
        {emailConfirmReq && <div className="space-y-4">
            <p className="text-sm">
              {emailConfirmReq.consigneeName}様（{emailConfirmReq.email}）に、発送完了のご案内メールを送りますか？
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              このメールはこの発送依頼につき一度だけ送信されます。
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
              <Button variant="ghost" onClick={() => {
      finishComplete(emailConfirmReq.id, false);
      setEmailConfirmReq(null);
    }}>
                送らずに完了
              </Button>
              <Button variant="accent" onClick={() => {
      finishComplete(emailConfirmReq.id, true);
      setEmailConfirmReq(null);
    }}>
                メールを送って完了
              </Button>
            </div>
          </div>}
      </Modal>

      <Modal open={modal === "new"} onClose={() => setModal(null)} title="発送依頼を手動で追加" wide>
        <ManualShippingForm consignees={consignees} products={products} onSave={saveManual} onCancel={() => setModal(null)} saving={savingManual} recipients={recipients} goTo={goTo} />
      </Modal>
      <Modal open={!!modal && modal !== "new"} onClose={() => setModal(null)} title="発送依頼を調整" wide>
        {modal && modal !== "new" && <ShippingRequestEditForm request={modal} consignees={consignees} products={products} onSave={saveEdit} onCancel={() => setModal(null)} />}
      </Modal>
      <Modal open={!!viewingDoc} onClose={() => setViewingDoc(null)} title={viewingDoc ? `${viewingDoc.kind === "delivery" ? "\u7D0D\u54C1\u66F8" : "\u8ACB\u6C42\u66F8"} ${viewingDoc.doc.number || ""}` : ""} wide>
        {viewingDoc && <DocumentPrintView kind={viewingDoc.kind} doc={viewingDoc.doc} consignee={consignees.find((c) => c.id === viewingDoc.doc.consigneeId)} products={products} company={settings?.company} onPrinted={(chosenDate) => {
    if (viewingDoc.kind === "delivery") setDeliveryNotes?.((prev) => prev.map((d) => d.id === viewingDoc.doc.id ? { ...d, date: chosenDate } : d));
    else setInvoices?.((prev) => prev.map((i) => i.id === viewingDoc.doc.id ? { ...i, date: chosenDate } : i));
  }} />}
      </Modal>
      <Modal open={!!coverLetterDraft} onClose={() => setCoverLetterDraft(null)} title={coverLetterDraft?.editingId ? "\u9001\u4ED8\u72B6\u3092\u7DE8\u96C6" : "\u9001\u4ED8\u72B6\u3092\u4F5C\u6210"} wide>
        {coverLetterDraft && <div className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">
                {coverLetterDraft.req.recipientName || "(\u5B9B\u5148\u672A\u8A2D\u5B9A)"}
              </span>{" "}
              様
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {coverLetterDraft.req.recipientAddress}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                本文(自由に編集できます)
              </div>
              <textarea value={coverLetterDraft.message} onChange={(e) => setCoverLetterDraft((d) => ({ ...d, message: e.target.value }))} className="w-full h-56 rounded-md border p-3 text-sm outline-none" style={{ borderColor: "var(--border)" }} />
            </div>
            <div>
              <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                同封物(発送依頼から引き継ぎ・編集可)
              </div>
              <textarea value={coverLetterDraft.itemsText} onChange={(e) => setCoverLetterDraft((d) => ({ ...d, itemsText: e.target.value }))} className="w-full h-16 rounded-md border p-2 text-sm outline-none" style={{ borderColor: "var(--border)" }} />
            </div>
            <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
              <Button variant="ghost" onClick={() => setCoverLetterDraft(null)} disabled={savingCoverLetter}>
                キャンセル
              </Button>
              <Button variant="accent" icon={Check} onClick={saveCoverLetter} disabled={savingCoverLetter}>
                {savingCoverLetter ? "\u4FDD\u5B58\u4E2D\u2026" : coverLetterDraft?.editingId ? "\u66F4\u65B0\u3059\u308B" : "\u4F5C\u6210\u3057\u3066\u78BA\u8A8D\u3059\u308B"}
              </Button>
            </div>
          </div>}
      </Modal>
      <Modal open={!!viewingCoverLetter} onClose={() => setCoverLetterViewId(null)} title="送付状" wide footer={viewingCoverLetter ? <>
              <Button variant="ghost" onClick={() => setCoverLetterViewId(null)}>
                閉じる
              </Button>
              <Button variant="accent" icon={Pencil} onClick={() => {
    openCoverLetterEdit(viewingCoverLetter);
    setCoverLetterViewId(null);
  }}>
                編集する
              </Button>
            </> : null}>
        {viewingCoverLetter && <CoverLetterPrintView letter={viewingCoverLetter} company={settings?.company} />}
      </Modal>
    </div>;
}
function ShippingRequestEditForm({ request, consignees, products, onSave, onCancel }) {
  const [locationId, setLocationId] = useState(request.locationId || "");
  const [deadline, setDeadline] = useState(request.deadline || "");
  const [memo, setMemo] = useState(request.memo || "");
  const [assignee, setAssignee] = useState(request.assignee || "");
  const [requester, setRequester] = useState(request.requester || "");
  const [sampleQtys, setSampleQtys] = useState(request.items.map((it) => it.sampleQty || 0));
  const [recipientName, setRecipientName] = useState(request.recipientName || "");
  const [recipientAddress, setRecipientAddress] = useState(request.recipientAddress || "");
  const [recipientPhone, setRecipientPhone] = useState(request.recipientPhone || "");
  const [itemsText, setItemsText] = useState(request.itemsText || "");
  const consignee = consignees.find((c) => c.id === request.consigneeId);
  const locs = consignee?.locations || [];
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const setSample = (i, val) => setSampleQtys((prev) => {
    const next = [...prev];
    next[i] = Number(val) || 0;
    return next;
  });
  const handleSubmit = () => {
    if (request.isIndividual) {
      onSave({ id: request.id, deadline, memo, assignee, requester, recipientName, recipientAddress, recipientPhone, itemsText });
    } else {
      onSave({ id: request.id, locationId, deadline, memo, assignee, requester, items: request.items.map((it, i) => ({ sampleQty: sampleQtys[i] })) });
    }
  };
  if (request.isIndividual) {
    return <div className="space-y-3">
        <Badge tone="info">個人への発送</Badge>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="宛先名" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
          <Input label="電話番号(任意)" value={recipientPhone} onChange={(e) => setRecipientPhone(normalizePhone(e.target.value))} />
        </div>
        <Input label="住所" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} />
        <Input label="締切日(任意)" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <Input label="担当者(任意)" value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="発送を担当する人の名前" className="max-w-xs" />
        <Input label="依頼者(任意)" value={requester} onChange={(e) => setRequester(e.target.value)} placeholder="発送を依頼した人の名前" className="max-w-xs" />
        <div>
          <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
            発送物
          </div>
          <textarea value={itemsText} onChange={(e) => setItemsText(e.target.value)} className="w-full h-20 rounded-md border p-2 text-sm outline-none" style={{ borderColor: "var(--border)" }} />
        </div>
        <Input label="メモ" value={memo} onChange={(e) => setMemo(e.target.value)} />
        <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
          <Button variant="ghost" onClick={onCancel}>
            キャンセル
          </Button>
          <Button variant="accent" onClick={handleSubmit} icon={Check}>
            保存する
          </Button>
        </div>
      </div>;
  }
  return <div className="space-y-3">
      <div className="text-sm font-medium">
        {consignee?.name || "(\u524A\u9664\u6E08\u307F\u59D4\u8A17\u5148)"}
      </div>
      {locs.length > 0 ? <Select label="発送先の拠点" value={locationId} onChange={(e) => setLocationId(e.target.value)}>
          <option value="">選択してください</option>
          {locs.map((l) => <option key={l.id} value={l.id}>
              {l.label || "(\u540D\u79F0\u672A\u8A2D\u5B9A)"}
              {l.address ? ` - ${l.address}` : ""}
            </option>)}
        </Select> : <p className="text-xs" style={{ color: "var(--danger)" }}>
          この委託先には拠点(住所)が登録されていません。委託先マスタから登録してください。
        </p>}
      <Input label="締切日(任意)" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <Input label="担当者(任意)" value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="発送を担当する人の名前" className="max-w-xs" />
        <Input label="依頼者(任意)" value={requester} onChange={(e) => setRequester(e.target.value)} placeholder="発送を依頼した人の名前" className="max-w-xs" />
      <div>
        <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
          発送物・サンプル(0=なし)
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="py-1 font-medium text-xs" style={{ color: "var(--text-muted)" }}>
                商品
              </th>
              <th className="py-1 font-medium text-xs text-right" style={{ color: "var(--text-muted)" }}>
                数量
              </th>
              <th className="py-1 pl-3 font-medium text-xs text-right" style={{ color: "var(--text-muted)" }}>
                サンプル
              </th>
            </tr>
          </thead>
          <tbody>
            {request.items.map((it, i) => <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                <td className="py-1.5">
                  {productById[it.productId]?.name || "(\u524A\u9664\u6E08\u307F\u5546\u54C1)"}
                </td>
                <td className="py-1.5 text-right font-mono w-16">
                  {formatNum(it.qty)}個
                </td>
                <td className="py-1.5 pl-3 text-right w-20">
                  <input type="number" value={sampleQtys[i]} onChange={(e) => setSample(i, e.target.value)} className="w-16 text-sm rounded border px-2 py-1 text-right font-mono" style={{ borderColor: "var(--border)" }} />
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <Input label="メモ" value={memo} onChange={(e) => setMemo(e.target.value)} />
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check}>
          保存する
        </Button>
      </div>
    </div>;
}
function ManualShippingForm({ consignees, products, onSave, onCancel, saving, recipients = [], goTo }) {
  const [form, setForm] = useState(emptyManualShipping());
  const [error, setError] = useState("");
  const [selectedRecipientId, setSelectedRecipientId] = useState("");
  const activeConsignees = consignees.filter((c) => c.status !== "\u9589\u5E97" && c.status !== "\u4F11\u6B62");
  const consignee = consignees.find((c) => c.id === form.consigneeId);
  const locs = consignee?.locations || [];
  const setItem = (i, key, val) => setForm((f) => {
    const items = [...f.items];
    items[i] = { ...items[i], [key]: val };
    return { ...f, items };
  });
  const addItem = () => setForm((f) => ({ ...f, items: [...f.items, { productId: "", qty: 1, sampleQty: 0 }] }));
  const removeItem = (i) => setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));
  const handleSubmit = () => {
    if (form.isIndividual) {
      if (!form.recipientName.trim()) {
        setError("\u5B9B\u5148\u540D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");
        return;
      }
      if (!form.recipientAddress.trim()) {
        setError("\u4F4F\u6240\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");
        return;
      }
      if (!form.itemsText.trim()) {
        setError("\u767A\u9001\u7269\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044");
        return;
      }
    } else {
      if (!form.consigneeId) {
        setError("\u767A\u9001\u5148\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");
        return;
      }
      if (!form.items.some((i) => i.productId)) {
        setError("\u767A\u9001\u7269\u30921\u4EF6\u4EE5\u4E0A\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");
        return;
      }
    }
    setError("");
    onSave(form);
  };
  return <div className="space-y-3">
      {error && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
          {error}
        </div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button type="button" onClick={() => setForm((f) => ({ ...f, isIndividual: false }))} className="px-3 py-2 rounded-lg text-sm font-medium border-2" style={{ borderColor: !form.isIndividual ? "var(--accent)" : "var(--border)", background: !form.isIndividual ? "var(--accent-soft)" : "white", color: !form.isIndividual ? "#8A5E10" : "var(--text)" }}>
          委託先へ発送
        </button>
        <button type="button" onClick={() => setForm((f) => ({ ...f, isIndividual: true }))} className="px-3 py-2 rounded-lg text-sm font-medium border-2" style={{ borderColor: form.isIndividual ? "var(--accent)" : "var(--border)", background: form.isIndividual ? "var(--accent-soft)" : "white", color: form.isIndividual ? "#8A5E10" : "var(--text)" }}>
          個人へ発送（サンプル・不足品など）
        </button>
      </div>

      {form.isIndividual ? <>
          {recipients.length > 0 && <Combobox label="発送先マスタから選ぶ(任意)" options={recipients.map((r) => ({ value: r.id, label: r.name, sublabel: r.type }))} value={selectedRecipientId} onChange={(v) => {
      setSelectedRecipientId(v);
      const r = recipients.find((x) => x.id === v);
      if (r) setForm((f) => ({ ...f, recipientName: r.name, recipientAddress: r.address, recipientPhone: r.phone || "" }));
    }} placeholder="名前で検索…" />}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="宛先名 *" value={form.recipientName} onChange={(e) => setForm((f) => ({ ...f, recipientName: e.target.value }))} placeholder="例: ◯◯様" />
            <Input label="電話番号（任意）" value={form.recipientPhone} onChange={(e) => setForm((f) => ({ ...f, recipientPhone: normalizePhone(e.target.value) }))} />
          </div>
          <Input label="住所 *" value={form.recipientAddress} onChange={(e) => setForm((f) => ({ ...f, recipientAddress: e.target.value }))} />
          {goTo && <p className="text-xs -mt-1" style={{ color: "var(--text-muted)" }}>
              新しい宛先を登録・編集したい場合は{" "}
              <button type="button" onClick={() => goTo("recipients")} className="underline" style={{ color: "var(--accent2)" }}>
                発送先マスタ
              </button>{" "}
              から行ってください。
            </p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="依頼日" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
            <Input label="締切日（任意）" type="date" value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))} />
          </div>
          <div>
            <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              発送物 *
            </div>
            <textarea value={form.itemsText} onChange={(e) => setForm((f) => ({ ...f, itemsText: e.target.value }))} placeholder="例: 〇〇キット 不足パーツ「△△」× 2個" className="w-full h-20 rounded-md border p-2 text-sm outline-none" style={{ borderColor: "var(--border)" }} />
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              商品マスタの品目ではなく自由記述です。在庫やサンプル管理の対象にはなりません。
            </p>
          </div>
        </> : <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Combobox label="発送先 *" options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={form.consigneeId} onChange={(v) => setForm((f) => ({ ...f, consigneeId: v, locationId: "" }))} placeholder="委託先を検索…" />
            <Input label="依頼日" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} />
          </div>
          <Input label="締切日（任意）" type="date" value={form.deadline} onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))} />
          {locs.length > 0 && <Select label="拠点" value={form.locationId} onChange={(e) => setForm((f) => ({ ...f, locationId: e.target.value }))}>
              <option value="">選択してください</option>
              {locs.map((l) => <option key={l.id} value={l.id}>
                  {l.label || "\uFF08\u540D\u79F0\u672A\u8A2D\u5B9A\uFF09"}
                </option>)}
            </Select>}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                発送物（サンプルは0=なし）
              </span>
              <button type="button" className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={addItem}>
                + 商品を追加
              </button>
            </div>
            <div className="space-y-2">
              {form.items.map((it, i) => <div key={i} className="flex gap-2 items-center flex-wrap">
                  <div className="flex-1 min-w-[140px]">
                    <Combobox options={products.map((p) => ({ value: p.id, label: p.name, sublabel: p.genre }))} value={it.productId} onChange={(v) => setItem(i, "productId", v)} placeholder="商品を検索…" />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      数量
                    </span>
                    <input type="number" value={it.qty} onChange={(e) => setItem(i, "qty", Number(e.target.value) || 0)} className="w-16 text-sm rounded border px-2 py-2 text-right font-mono" style={{ borderColor: "var(--border)" }} />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                      サンプル
                    </span>
                    <input type="number" value={it.sampleQty || 0} onChange={(e) => setItem(i, "sampleQty", Number(e.target.value) || 0)} className="w-16 text-sm rounded border px-2 py-2 text-right font-mono" style={{ borderColor: "var(--border)" }} />
                  </div>
                  <button type="button" className="p-1.5 rounded hover:bg-black/5" onClick={() => removeItem(i)}>
                    <Trash2 size={14} style={{ color: "var(--danger)" }} />
                  </button>
                </div>)}
            </div>
          </div>
        </>}
      <Input label="メモ" value={form.memo} onChange={(e) => setForm((f) => ({ ...f, memo: e.target.value }))} placeholder="例: 不足分の追送" />
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel} disabled={saving}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check} disabled={saving}>
          {saving ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4F9D\u983C\u3092\u8FFD\u52A0"}
        </Button>
      </div>
    </div>;
}
function DocumentPrintView({ kind, doc, consignee, products, company, onPrinted }) {
  const co = { ...DEFAULT_COMPANY_INFO, ...company || {} };
  const productById = Object.fromEntries(products.map((p) => [p.id, p]));
  const isInvoice = kind === "invoice";
  const [showDatePrompt, setShowDatePrompt] = useState(false);
  const [printDate, setPrintDate] = useState(doc.date || todayStr());
  useEffect(() => {
    const original = document.title;
    const addressee = `${consignee?.company ? consignee.company + "\u3000" : ""}${consignee?.name || ""}\u5FA1\u4E2D`;
    document.title = `${addressee}_${doc.title}_${isInvoice ? "\u8ACB\u6C42\u66F8" : "\u7D0D\u54C1\u66F8"}`;
    return () => {
      document.title = original;
    };
  }, [doc.id, doc.title, consignee, isInvoice]);
  return <div>
      <div className="flex justify-end gap-2 mb-3 zk-no-print">
        {showDatePrompt ? <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)" }}>
            <span className="text-sm" style={{ color: "var(--ink)" }}>
              日付
            </span>
            <input type="date" value={printDate} onChange={(e) => setPrintDate(e.target.value)} className="rounded-md border px-2 py-1.5 text-sm outline-none bg-white" style={{ borderColor: "var(--border)" }} />
            <Button variant="ghost" size="sm" onClick={() => setShowDatePrompt(false)}>
              キャンセル
            </Button>
            <Button variant="accent" size="sm" icon={Printer} onClick={() => {
    onPrinted?.(printDate);
    setShowDatePrompt(false);
    window.print();
  }}>
              この内容で印刷する
            </Button>
          </div> : <Button variant="accent" icon={Printer} onClick={() => {
    setPrintDate(doc.date || todayStr());
    setShowDatePrompt(true);
  }}>
            印刷する(PDF保存も可)
          </Button>}
      </div>
      <div className="zk-print-doc" style={{ background: "white", color: "#111", padding: 24, fontSize: 13 }}>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 24 }}>
          {isInvoice ? "\u8ACB\u6C42\u66F8" : "\u7D0D\u54C1\u66F8"}
        </h2>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-2" style={{ marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>
              {consignee?.company || consignee?.name || ""} 御中
            </div>
            {consignee?.company && consignee.company !== consignee.name && <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                ({consignee.name})
              </div>}
          </div>
          <table style={{ fontSize: 12 }}>
            <tbody>
              <tr>
                <td style={{ paddingRight: 12, color: "#666", whiteSpace: "nowrap" }}>
                  {isInvoice ? "\u8ACB\u6C42\u65E5" : "\u7D0D\u54C1\u65E5"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{doc.date}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: 12, color: "#666", whiteSpace: "nowrap" }}>
                  {isInvoice ? "\u8ACB\u6C42\u66F8\u756A\u53F7" : "\u7D0D\u54C1\u66F8\u756A\u53F7"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{doc.number}</td>
              </tr>
              <tr>
                <td style={{ paddingRight: 12, color: "#666", whiteSpace: "nowrap" }}>登録番号</td>
                <td style={{ whiteSpace: "nowrap" }}>{co.registrationNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ textAlign: "right", marginBottom: 16, fontSize: 12 }}>
          <div style={{ fontWeight: 600 }}>{co.name}</div>
          <div>{co.postalCode}</div>
          <div>{co.address}</div>
          <div>
            TEL: {co.tel}　MAIL: {co.mail}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          {isInvoice ? "\u4E0B\u8A18\u306E\u901A\u308A\u3054\u8ACB\u6C42\u7533\u3057\u4E0A\u3052\u307E\u3059\u3002" : "\u4E0B\u8A18\u306E\u901A\u308A\u7D0D\u54C1\u81F4\u3057\u307E\u3059\u3002"}
        </div>
        <div style={{ marginBottom: 4 }}>件名　{doc.title}</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
          {isInvoice ? "\u8ACB\u6C42\u91D1\u984D" : "\u5408\u8A08\u91D1\u984D"}　{formatYen(doc.total)}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, marginBottom: 16 }}>
          <thead>
            <tr style={{ background: "#eee" }}>
              <th style={{ border: "1px solid #ccc", padding: 6, textAlign: "left" }}>
                摘要
              </th>
              <th style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                数量
              </th>
              <th style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                単価
              </th>
              <th style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                明細金額
              </th>
            </tr>
          </thead>
          <tbody>
            {doc.items.map((it, i) => <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: 6 }}>
                  {productById[it.productId]?.name || "(\u524A\u9664\u6E08\u307F\u5546\u54C1)"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                  {formatNum(it.qty)}個
                </td>
                <td style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                  {formatNum(it.unitPrice)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                  {formatNum(it.amount)}
                </td>
              </tr>)}
          </tbody>
        </table>
        <div className="flex justify-between items-start">
          <div style={{ fontSize: 11, color: "#666", maxWidth: 320 }}>
            {isInvoice && <>
                <div>入金期日</div>
                <div style={{ marginTop: 8 }}>振込先</div>
                <div>
                  {co.bankName}　{co.bankBranch}　{co.bankAccountType}口座{" "}
                  {co.bankAccountNumber}
                </div>
                <div>口座名義　{co.bankAccountHolder}</div>
              </>}
            <div style={{ marginTop: 12, border: "1px solid #ccc", padding: 8, minHeight: 40 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>備考</div>
              {doc.memo}
            </div>
          </div>
          <table style={{ fontSize: 12, minWidth: 220 }}>
            <tbody>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: 6 }}>小計</td>
                <td style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                  {formatYen(doc.subtotal)}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: 6 }}>消費税</td>
                <td style={{ border: "1px solid #ccc", padding: 6, textAlign: "right" }}>
                  {formatYen(doc.tax)}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: 6, fontWeight: 700 }}>
                  合計
                </td>
                <td style={{ border: "1px solid #ccc", padding: 6, textAlign: "right", fontWeight: 700 }}>
                  {formatYen(doc.total)}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ccc", padding: 6 }} colSpan={2}>
                  内訳　10%対象(税抜) {formatYen(doc.subtotal)}
                  <br />
                  10%消費税 {formatYen(doc.tax)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}
function CoverLetterPrintView({ letter, company }) {
  const co = { ...DEFAULT_COMPANY_INFO, ...company || {} };
  useEffect(() => {
    const original = document.title;
    document.title = `${letter.recipientName || ""}\u69D8_\u9001\u4ED8\u72B6_${letter.date}`;
    return () => {
      document.title = original;
    };
  }, [letter.id, letter.recipientName, letter.date]);
  return <div>
      <div className="flex justify-end gap-2 mb-3 zk-no-print">
        <Button variant="accent" icon={Printer} onClick={() => window.print()}>
          印刷する(PDF保存も可)
        </Button>
      </div>
      <div className="zk-print-doc" style={{ background: "white", color: "#111", padding: 32, fontSize: 14, lineHeight: 1.9 }}>
        <div style={{ textAlign: "right", fontSize: 12, marginBottom: 24 }}>
          {letter.date}
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 32 }}>
          {letter.recipientName || ""} 様
        </div>
        <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, marginBottom: 32 }}>
          送付状
        </h2>
        <div style={{ whiteSpace: "pre-wrap", marginBottom: 32 }}>
          {letter.message}
        </div>
        {letter.itemsText && <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 24 }}>
            <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 12, color: "#666" }}>
              同封物
            </div>
            <div style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {letter.itemsText}
            </div>
          </div>}
        <div style={{ textAlign: "right", marginTop: 40, fontSize: 12, color: "#444" }}>
          <div style={{ fontWeight: 600 }}>{co.name}</div>
          <div>{co.postalCode}</div>
          <div>{co.address}</div>
          <div>
            TEL: {co.tel}　MAIL: {co.mail}
          </div>
        </div>
      </div>
    </div>;
}
function ManualDeliveryNoteForm({ consignees, products, onSave, onCancel, saving }) {
  const [consigneeId, setConsigneeId] = useState("");
  const [memo, setMemo] = useState("");
  const [items, setItems] = useState([{ productId: "", qty: 1, unitPrice: 0 }]);
  const [error, setError] = useState("");
  const activeConsignees = consignees.filter((c) => c.status !== "\u9589\u5E97" && c.status !== "\u4F11\u6B62");
  const consignee = consignees.find((c) => c.id === consigneeId);
  const setItem = (i, key, val) => setItems((prev) => {
    const next = [...prev];
    next[i] = { ...next[i], [key]: val };
    if (key === "productId") {
      const product = products.find((p) => p.id === val);
      const feeRate = Number(consignee?.feeRate) || 0;
      next[i].unitPrice = Math.round((Number(product?.price) || 0) * (1 - feeRate));
    }
    return next;
  });
  const addItem = () => setItems((prev) => [...prev, { productId: "", qty: 1, unitPrice: 0 }]);
  const removeItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));
  const handleSubmit = () => {
    if (!consigneeId) {
      setError("\u5B9B\u5148\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");
      return;
    }
    const validItems = items.filter((i) => i.productId);
    if (!validItems.length) {
      setError("\u5546\u54C1\u30921\u4EF6\u4EE5\u4E0A\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");
      return;
    }
    setError("");
    onSave({ consigneeId, memo, items: validItems.map((i) => ({ productId: i.productId, qty: Number(i.qty) || 0, unitPrice: Number(i.unitPrice) || 0, amount: (Number(i.qty) || 0) * (Number(i.unitPrice) || 0) })) });
  };
  return <div className="space-y-3">
      {error && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
          {error}
        </div>}
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        取引記録とは連動しません。在庫は減りません(不足分の追送など、在庫を動かさずに書類だけ発行したい場合に使ってください)。
      </p>
      <Combobox label="宛先 *" options={activeConsignees.map((c) => ({ value: c.id, label: c.name, sublabel: c.furigana }))} value={consigneeId} onChange={setConsigneeId} placeholder="委託先を検索…" />
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
            商品
          </span>
          <button type="button" className="text-xs underline" style={{ color: "var(--accent2)" }} onClick={addItem}>
            + 商品を追加
          </button>
        </div>
        <div className="space-y-2">
          {items.map((it, i) => <div key={i} className="flex gap-2 items-center flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <Combobox options={products.map((p) => ({ value: p.id, label: p.name, sublabel: p.genre }))} value={it.productId} onChange={(v) => setItem(i, "productId", v)} placeholder="商品を検索…" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  数量
                </span>
                <input type="number" value={it.qty} onChange={(e) => setItem(i, "qty", Number(e.target.value) || 0)} className="w-16 text-sm rounded border px-2 py-2 text-right font-mono" style={{ borderColor: "var(--border)" }} />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  単価
                </span>
                <input type="number" value={it.unitPrice} onChange={(e) => setItem(i, "unitPrice", Number(e.target.value) || 0)} className="w-20 text-sm rounded border px-2 py-2 text-right font-mono" style={{ borderColor: "var(--border)" }} />
              </div>
              <button type="button" className="p-1.5 rounded hover:bg-black/5" onClick={() => removeItem(i)}>
                <Trash2 size={14} style={{ color: "var(--danger)" }} />
              </button>
            </div>)}
        </div>
      </div>
      <Input label="メモ(任意)" value={memo} onChange={(e) => setMemo(e.target.value)} />
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel} disabled={saving}>
          キャンセル
        </Button>
        <Button variant="accent" icon={Check} onClick={handleSubmit} disabled={saving}>
          {saving ? "\u4F5C\u6210\u4E2D\u2026" : "\u4F5C\u6210\u3059\u308B"}
        </Button>
      </div>
    </div>;
}
function DeliveryNotesPage({ deliveryNotes, setDeliveryNotes, setShippingRequests, consignees, products, settings, focusId, onFocusConsumed, onCreateManual }) {
  const [viewId, setViewId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [savingManual, setSavingManual] = useState(false);
  const consigneeById = Object.fromEntries(consignees.map((c) => [c.id, c]));
  const filtered = [...deliveryNotes].sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.number || "").localeCompare(a.number || ""));
  const { pageItems: sorted, page: dnPage, setPage: setDnPage, pageSize: dnPageSize, setPageSize: setDnPageSize, totalPages: dnTotalPages, totalCount: dnTotalCount } = usePagination(filtered);
  const viewing = deliveryNotes.find((d) => d.id === viewId);
  useEffect(() => {
    if (!focusId) return;
    setViewId(focusId);
    onFocusConsumed?.();
  }, [focusId, onFocusConsumed]);
  const saveManualNote = async (form) => {
    setSavingManual(true);
    const newNote = await onCreateManual?.(form);
    setSavingManual(false);
    if (newNote) {
      setShowCreate(false);
      setViewId(newNote.id);
    }
  };
  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
  const doDelete = (id) => {
    setDeliveryNotes((prev) => prev.filter((d) => d.id !== id));
    // Clear the reference on the shipping request this came from, so its
    // "納品書を発行" button becomes available again (this is how you get a
    // deleted delivery note back — its source transaction is untouched).
    setShippingRequests?.((prev) => prev.map((r) => r.deliveryNoteId === id ? { ...r, deliveryNoteId: null } : r));
    setConfirmingDeleteId(null);
    if (viewId === id) setViewId(null);
  };
  return <div className="space-y-4 max-w-4xl mx-auto">
      <SectionTitle eyebrow="取引記録の登録時に「納品書を作成する」を選ぶと自動作成されます" title="納品書一覧" action={<Button variant="accent" icon={Plus} onClick={() => setShowCreate(true)}>
            納品書を新規作成
          </Button>} />
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        取引記録を修正した場合は、その編集画面から紐づく納品書を最新の内容に更新できます。在庫を動かさずに納品書だけ発行したい場合(不足分の追送など)は「納品書を新規作成」を使ってください。
      </p>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto zk-scrollbar">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  番号
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  日付
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  委託先
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                  合計
                </th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((d) => <tr key={d.id} className="border-t" style={{ borderColor: "var(--border)", opacity: d.voided ? 0.5 : 1 }}>
                  <td className="py-2 px-3 font-mono text-xs" style={{ textDecoration: d.voided ? "line-through" : "none" }}>
                    {d.number}
                  </td>
                  <td className="py-2 px-3 font-mono text-xs whitespace-nowrap">{d.date}</td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    {consigneeById[d.consigneeId]?.name || "\u2014"}{" "}
                    {d.voided && <Badge tone="default">取消</Badge>}
                  </td>
                  <td className="py-2 px-3 text-right font-mono" style={{ textDecoration: d.voided ? "line-through" : "none" }}>
                    {formatYen(d.total)}
                  </td>
                  <td className="py-2 px-3 text-right">
                    {confirmingDeleteId === d.id ? <ConfirmBar message="削除しますか？" confirmLabel="はい" onConfirm={() => doDelete(d.id)} onCancel={() => setConfirmingDeleteId(null)} /> : <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" icon={FileText} onClick={() => setViewId(d.id)}>
                          表示
                        </Button>
                        <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setConfirmingDeleteId(d.id)}>
                          <Trash2 size={14} style={{ color: "var(--danger)" }} />
                        </button>
                      </div>}
                  </td>
                </tr>)}
              {sorted.length === 0 && <tr>
                  <td colSpan={5}>
                    <EmptyState icon={FileText} title="納品書はまだありません" />
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <PaginationBar page={dnPage} setPage={setDnPage} pageSize={dnPageSize} setPageSize={setDnPageSize} totalPages={dnTotalPages} totalCount={dnTotalCount} />
      <Modal open={!!viewing} onClose={() => setViewId(null)} title={`\u7D0D\u54C1\u66F8 ${viewing?.number || ""}${viewing?.voided ? "(\u53D6\u6D88)" : ""}`} wide>
        {viewing && <>
            {viewing.voided && <div className="text-sm px-3 py-2 rounded-md mb-3" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
                この納品書は取消済みです。正しい内容は再発行された新しい番号の納品書をご確認ください。
              </div>}
            <DocumentPrintView kind="delivery" doc={viewing} consignee={consigneeById[viewing.consigneeId]} products={products} company={settings.company} onPrinted={(chosenDate) => setDeliveryNotes((prev) => prev.map((d) => d.id === viewing.id ? { ...d, date: chosenDate } : d))} />
          </>}
      </Modal>
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="納品書を新規作成" wide>
        <ManualDeliveryNoteForm consignees={consignees} products={products} onSave={saveManualNote} onCancel={() => setShowCreate(false)} saving={savingManual} />
      </Modal>
    </div>;
}
function InvoicesPage({ invoices, setInvoices, setShippingRequests, consignees, products, transactions, settings, issueInvoiceNumber, focusId, onFocusConsumed }) {
  const [viewId, setViewId] = useState(null);
  useEffect(() => {
    if (!focusId) return;
    setViewId(focusId);
    onFocusConsumed?.();
  }, [focusId, onFocusConsumed]);
  const [month, setMonth] = useState(monthKey(todayStr()));
  const [monthTo, setMonthTo] = useState("");
  const [consigneeId, setConsigneeId] = useState("");
  const [error, setError] = useState("");
  const [selectedIds, setSelectedIds] = useState(() => /* @__PURE__ */ new Set());
  const toggleSelect = (id) => setSelectedIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  const selectedInvoices = invoices.filter((i) => selectedIds.has(i.id));
  const selectedConsigneeIds = new Set(selectedInvoices.map((i) => i.consigneeId));
  const canMerge = selectedInvoices.length >= 2 && selectedConsigneeIds.size === 1;
  const [mergePreview, setMergePreview] = useState(null);
  const previewMerge = () => {
    if (!canMerge) return;
    const [firstConsigneeId] = selectedConsigneeIds;
    const consignee = consignees.find((c) => c.id === firstConsigneeId);
    // Merge item lists, summing quantities/amounts for the same product across the selected invoices.
    const byProduct = {};
    for (const inv of selectedInvoices) {
      for (const it of inv.items) {
        const key = byProduct[it.productId] ||= { qty: 0, amount: 0 };
        key.qty += Number(it.qty) || 0;
        key.amount += Number(it.amount) || 0;
      }
    }
    const items = Object.entries(byProduct).map(([productId, v]) => ({ productId, qty: v.qty, unitPrice: v.qty ? Math.round(v.amount / v.qty) : 0, amount: v.amount })).sort((a, b) => b.amount - a.amount);
    const total = items.reduce((s, i) => s + i.amount, 0);
    const months = [...new Set(selectedInvoices.map((i) => i.month))].sort();
    const monthLabel = months.length === 1 ? months[0] : months.join("\u30FB");
    setMergePreview({ consigneeId: firstConsigneeId, title: `${consignee?.name || ""}\u69D8 \u5408\u7B97\u767A\u6CE8\u5206(${monthLabel})`, month: monthLabel, monthFrom: months[0], monthTo: months[months.length - 1], items, total, memo: `\u5408\u7B97\u5143: ${selectedInvoices.map((i) => i.number).join("\u3001")}`, sourceIds: selectedInvoices.map((i) => i.id) });
  };
  const confirmMerge = () => {
    if (!mergePreview) return;
    const number = issueInvoiceNumber();
    const merged = { id: uid("INV"), number, date: todayStr(), consigneeId: mergePreview.consigneeId, title: mergePreview.title, month: mergePreview.month, monthFrom: mergePreview.monthFrom, monthTo: mergePreview.monthTo, items: mergePreview.items, ...splitTaxIncluded(mergePreview.total), memo: mergePreview.memo, mergedFrom: mergePreview.sourceIds };
    setInvoices((prev) => [...prev.filter((i) => !mergePreview.sourceIds.includes(i.id)), merged]);
    setMergePreview(null);
    setSelectedIds(/* @__PURE__ */ new Set());
    setViewId(merged.id);
  };
  const consigneeById = Object.fromEntries(consignees.map((c) => [c.id, c]));
  const billable = consignees.filter((c) => c.status !== "\u9589\u5E97" && (c.contractType === "\u59D4\u8A17" || c.contractType === "\u8CB7\u53D6"));
  const statusOf = (inv) => inv.status || (inv.sent ? "sent" : "pending");
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");
  const allSorted = [...invoices].sort((a, b) => (b.date || "").localeCompare(a.date || "") || (b.number || "").localeCompare(a.number || ""));
  const tabFiltered = allSorted.filter((inv) => activeTab === "sent" ? statusOf(inv) === "sent" : statusOf(inv) !== "sent");
  const q = searchQuery.trim();
  const filtered = q ? tabFiltered.filter((inv) => inv.number?.includes(q) || (consigneeById[inv.consigneeId]?.name || "").includes(q) || inv.month?.includes(q)) : tabFiltered;
  const { pageItems: sorted, page: invPage, setPage: setInvPage, pageSize: invPageSize, setPageSize: setInvPageSize, totalPages: invTotalPages, totalCount: invTotalCount } = usePagination(filtered);
  const sentCount = allSorted.filter((inv) => statusOf(inv) === "sent").length;
  const activeCount = allSorted.length - sentCount;
  const viewing = invoices.find((i) => i.id === viewId);
  const create = () => {
    if (!consigneeId) {
      setError("\u59D4\u8A17\u5148\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");
      return;
    }
    const effectiveTo = monthTo && monthTo >= month ? monthTo : month;
    // Overlap check (not just exact match) — a new range like 2026-01〜2026-03
    // would otherwise slip past an existing 2026-02 invoice unnoticed.
    const overlapping = invoices.find((i) => i.consigneeId === consigneeId && (i.monthFrom || i.month) <= effectiveTo && (i.monthTo || i.month) >= month);
    if (overlapping) {
      setError(`\u3053\u306E\u59D4\u8A17\u5148\u306E ${overlapping.month} \u306E\u8ACB\u6C42\u66F8\u3068\u671F\u9593\u304C\u91CD\u306A\u3063\u3066\u3044\u307E\u3059(\u4E0B\u306E\u4E00\u89A7\u304B\u3089\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044)`);
      return;
    }
    const consignee = consignees.find((c) => c.id === consigneeId);
    const number = issueInvoiceNumber();
    const [, m] = month.split("-");
    const [, mTo] = effectiveTo.split("-");
    const title = effectiveTo === month ? `${consignee.name}\u69D8 ${Number(m)}\u6708\u767A\u6CE8\u5206` : `${consignee.name}\u69D8 ${Number(m)}\u6708\u301C${Number(mTo)}\u6708\u767A\u6CE8\u5206`;
    const inv = buildInvoiceFromTransactions(consignee, transactions, products, month, effectiveTo, number, title);
    if (inv.items.length === 0) {
      setError("\u3053\u306E\u59D4\u8A17\u5148\u30FB\u3053\u306E\u671F\u9593\u306E\u58F2\u4E0A\u8A18\u9332\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093");
      return;
    }
    setInvoices((prev) => [...prev, inv]);
    setError("");
    setViewId(inv.id);
  };
  const exportFreeeCsv = (inv) => {
    const consignee = consigneeById[inv.consigneeId];
    const productById = Object.fromEntries(products.map((p) => [p.id, p]));
    const header = ["\u884C\u5F62\u5F0F", "\u767A\u884C\u65E5", "\u756A\u53F7", "\u4EF6\u540D", "\u5099\u8003", "\u6D88\u8CBB\u7A0E\u306E\u8868\u793A\u65B9\u6CD5", "\u6D88\u8CBB\u7A0E\u7AEF\u6570\u306E\u8A08\u7B97\u65B9\u6CD5", "\u53D6\u5F15\u5148\u540D\u79F0", "\u53D6\u5F15\u5148\u656C\u79F0"];
    const rows = [header, ["\u672C\u6587", inv.date, inv.number, inv.title, inv.memo || "", "\u5185\u7A0E", "\u56DB\u6368\u4E94\u5165", consignee?.company || consignee?.name || "", "\u5FA1\u4E2D"]];
    const lineHeader = ["\u884C\u306E\u7A2E\u985E", "\u6458\u8981", "\u5358\u4FA1", "\u6570\u91CF", "\u5358\u4F4D", "\u7A0E\u7387"];
    rows.push(lineHeader);
    for (const it of inv.items) {
      rows.push(["\u901A\u5E38", productById[it.productId]?.name || "", it.unitPrice, it.qty, "\u500B", "10%"]);
    }
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    downloadText(`freee_\u8ACB\u6C42\u66F8_${inv.number}.csv`, "\uFEFF" + csv);
  };
  // Status: "pending" (\u9001\u4ED8\u5F85\u3061) | "sent" (\u9001\u4ED8\u6E08\u307F) | "deferred" (\u6B21\u6708\u4EE5\u964D\u306B\u6301\u3061\u8D8A\u3057).
  // Old records only have a boolean `sent` field — treat that as the source
  // of truth for those, and the newer `status` field for everything else.
  const setInvoiceStatus = (id, status) => setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status, sent: status === "sent", sentAt: status === "sent" ? todayStr() : "" } : i));
  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
  const doDelete = (id) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    setShippingRequests?.((prev) => prev.map((r) => r.invoiceId === id ? { ...r, invoiceId: null } : r));
    setConfirmingDeleteId(null);
    if (viewId === id) setViewId(null);
  };
  return <div className="space-y-4 max-w-4xl mx-auto">
      <SectionTitle eyebrow="委託・買取の売上を月ごとにまとめて請求書を作成(複数の発送も自動で合算)" title="請求書一覧" />
      <Card className="p-4 space-y-3">
        <div className="text-sm font-medium">新しく請求書を作成</div>
        {error && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--danger-soft)", color: "var(--danger)" }}>
            {error}
          </div>}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-3xl">
          <Combobox label="委託先" options={billable.map((c) => ({ value: c.id, label: c.name }))} value={consigneeId} onChange={setConsigneeId} placeholder="委託先を検索…" />
          <Input label="対象月(開始)" type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
          <Input label="対象月(終了・省略可)" type="month" value={monthTo} onChange={(e) => setMonthTo(e.target.value)} />
          <div className="flex items-end">
            <Button variant="accent" icon={Plus} onClick={create}>
              請求書を作成
            </Button>
          </div>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          終了月を入力すると、開始月〜終了月の範囲をまとめて1枚の請求書にできます(3ヶ月ごとの請求など)。通常は終了月を空欄のままで1ヶ月分になります。
        </p>
      </Card>
      {selectedIds.size > 0 && <div className="flex items-center gap-3 px-3 py-2 rounded-md flex-wrap" style={{ background: "var(--accent-soft)" }}>
          <span className="text-sm font-medium">{selectedIds.size}件選択中</span>
          {!canMerge && selectedIds.size >= 2 && <span className="text-xs" style={{ color: "var(--danger)" }}>
              異なる委託先の請求書は合算できません
            </span>}
          <Button variant="accent" size="sm" icon={Receipt} onClick={previewMerge} disabled={!canMerge}>
            選択した{selectedIds.size}件を合算
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedIds(/* @__PURE__ */ new Set())}>
            選択解除
          </Button>
        </div>}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: "var(--paper)" }}>
          <button type="button" onClick={() => setActiveTab("active")} className="px-3 py-1.5 rounded-md text-sm font-medium transition" style={activeTab === "active" ? { background: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" } : { color: "var(--text-muted)" }}>
            未処理 ({activeCount})
          </button>
          <button type="button" onClick={() => setActiveTab("sent")} className="px-3 py-1.5 rounded-md text-sm font-medium transition" style={activeTab === "sent" ? { background: "white", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" } : { color: "var(--text-muted)" }}>
            送付済み ({sentCount})
          </button>
        </div>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="番号・委託先・対象月で検索…" className="px-3 py-2 rounded-md border text-sm outline-none max-w-xs w-full" style={{ borderColor: "var(--border)", background: "white" }} />
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto zk-scrollbar">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr style={{ background: "var(--paper)" }} className="text-left">
                <th className="py-2 px-3" />
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  番号
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  対象月
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  委託先
                </th>
                <th className="py-2 px-3 font-medium text-right" style={{ color: "var(--text-muted)" }}>
                  合計
                </th>
                <th className="py-2 px-3 font-medium" style={{ color: "var(--text-muted)" }}>
                  ステータス
                </th>
                <th className="py-2 px-3" />
              </tr>
            </thead>
            <tbody>
              {sorted.map((inv) => { const status = statusOf(inv); const rowStyle = status === "deferred" ? { borderColor: "var(--border)", background: "#FFF3CD" } : status === "sent" ? { borderColor: "var(--border)", background: "var(--paper)", opacity: 0.7 } : { borderColor: "var(--border)", background: "transparent" }; return <tr key={inv.id} className="border-t" style={rowStyle}>
                  <td className="py-2 px-3">
                    {status !== "sent" && <input type="checkbox" checked={selectedIds.has(inv.id)} onChange={() => toggleSelect(inv.id)} style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />}
                  </td>
                  <td className="py-2 px-3 font-mono text-xs whitespace-nowrap">{inv.number}</td>
                  <td className="py-2 px-3 font-mono text-xs whitespace-nowrap">{inv.month}</td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    {consigneeById[inv.consigneeId]?.name || "\u2014"}
                  </td>
                  <td className="py-2 px-3 text-right font-mono">
                    {formatYen(inv.total)}
                  </td>
                  <td className="py-2 px-3">
                    {status === "pending" ? <div className="flex gap-1 flex-wrap">
                        <Button variant="ghost" size="sm" onClick={() => setInvoiceStatus(inv.id, "sent")}>
                          送付済みにする
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setInvoiceStatus(inv.id, "deferred")}>
                          次月以降に持ち越す
                        </Button>
                      </div> : <div className="flex items-center gap-2">
                        {status === "sent" ? <Badge tone="success">送付済み{inv.sentAt ? `(${inv.sentAt})` : ""}</Badge> : <Badge tone="danger">次月以降に持ち越し</Badge>}
                        <button type="button" className="text-xs underline" style={{ color: "var(--text-muted)" }} onClick={() => setInvoiceStatus(inv.id, "pending")}>
                          戻す
                        </button>
                      </div>}
                  </td>
                  <td className="py-2 px-3 text-right">
                    {confirmingDeleteId === inv.id ? <ConfirmBar message="削除しますか？" confirmLabel="はい" onConfirm={() => doDelete(inv.id)} onCancel={() => setConfirmingDeleteId(null)} /> : <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" icon={FileText} onClick={() => setViewId(inv.id)}>
                          表示
                        </Button>
                        <Button variant="ghost" size="sm" icon={Download} onClick={() => exportFreeeCsv(inv)}>
                          freee用CSV
                        </Button>
                        <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setConfirmingDeleteId(inv.id)}>
                          <Trash2 size={14} style={{ color: "var(--danger)" }} />
                        </button>
                      </div>}
                  </td>
                </tr>; })}
              {sorted.length === 0 && <tr>
                  <td colSpan={6}>
                    <EmptyState icon={FileText} title="請求書はまだありません" />
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </Card>
      <PaginationBar page={invPage} setPage={setInvPage} pageSize={invPageSize} setPageSize={setInvPageSize} totalPages={invTotalPages} totalCount={invTotalCount} />
      <Modal open={!!viewing} onClose={() => setViewId(null)} title={`\u8ACB\u6C42\u66F8 ${viewing?.number || ""}`} wide>
        {viewing && <DocumentPrintView kind="invoice" doc={viewing} consignee={consigneeById[viewing.consigneeId]} products={products} company={settings.company} onPrinted={(chosenDate) => setInvoices((prev) => prev.map((i) => i.id === viewing.id ? { ...i, date: chosenDate } : i))} />}
      </Modal>
      <Modal open={!!mergePreview} onClose={() => setMergePreview(null)} title="合算のプレビュー" wide footer={<>
            <Button variant="ghost" onClick={() => setMergePreview(null)}>
              キャンセル
            </Button>
            <Button variant="accent" icon={Check} onClick={confirmMerge}>
              この内容で反映する
            </Button>
          </>}>
        {mergePreview && <>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              番号はまだ発行されていません。「この内容で反映する」を押すと、番号が発行され、元の{mergePreview.sourceIds.length}件は削除されます。
            </p>
            <DocumentPrintView kind="invoice" doc={{ ...mergePreview, number: "(\u767A\u884C\u5F8C\u306B\u6C7A\u5B9A)", date: todayStr(), ...splitTaxIncluded(mergePreview.total) }} consignee={consigneeById[mergePreview.consigneeId]} products={products} company={settings.company} />
          </>}
      </Modal>
    </div>;
}
const APPS_SCRIPT_CODE = `/**
 * \u5728\u5EAB\u7BA1\u7406\u30A2\u30D7\u30EA \u21C4 Google\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8 \u9023\u643A\u30B9\u30AF\u30EA\u30D7\u30C8
 * \u4F7F\u3044\u65B9:
 * 1. \u9023\u643A\u3055\u305B\u305F\u3044Google\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u3092\u958B\u304F
 * 2. \u62E1\u5F35\u6A5F\u80FD > Apps Script \u3092\u958B\u304F
 * 3. \u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u30B3\u30FC\u30C9\u3092\u5168\u90E8\u6D88\u3057\u3066\u3001\u3053\u306E\u30B3\u30FC\u30C9\u3092\u8CBC\u308A\u4ED8\u3051\u308B
 * 4. \u4E0A\u90E8\u306E\u300C\u30C7\u30D7\u30ED\u30A4\u300D>\u300C\u65B0\u3057\u3044\u30C7\u30D7\u30ED\u30A4\u300D\u3092\u9078\u629E
 * 5. \u7A2E\u985E\u306E\u9078\u629E\u3067\u300C\u30A6\u30A7\u30D6\u30A2\u30D7\u30EA\u300D\u3092\u9078\u3076
 * 6. \u300C\u30A2\u30AF\u30BB\u30B9\u3067\u304D\u308B\u30E6\u30FC\u30B6\u30FC\u300D\u3092\u300C\u5168\u54E1\u300D\u306B\u8A2D\u5B9A\u3057\u3066\u30C7\u30D7\u30ED\u30A4
 * 7. \u767A\u884C\u3055\u308C\u305F\u300C\u30A6\u30A7\u30D6\u30A2\u30D7\u30EA\u306EURL\u300D\u3092\u30A2\u30D7\u30EA\u306E\u8A2D\u5B9A\u753B\u9762\u306B\u8CBC\u308A\u4ED8\u3051\u308B
 * 8. (\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u81EA\u52D5\u53D6\u5F97\u3092\u4F7F\u3046\u5834\u5408) \u4E0A\u90E8\u306E\u95A2\u6570\u9078\u629E\u3067createDailyImportTrigger\u3092\u9078\u3073\u300C\u5B9F\u884C\u300D\u3092\u4E00\u5EA6\u62BC\u3059(\u6BCE\u671D6\u6642\u306B\u81EA\u52D5\u5B9F\u884C\u3055\u308C\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3059)
 */

const SHEETS = {
  products: "\u5546\u54C1\u30DE\u30B9\u30BF",
  consignees: "\u59D4\u8A17\u5148\u30DE\u30B9\u30BF",
  recipients: "\u767A\u9001\u5148\u30DE\u30B9\u30BF",
  transactions: "\u53D6\u5F15\u8A18\u9332",
  adjustments: "\u58F2\u639B\u8ABF\u6574\u984D",
  monthlyChecks: "\u6708\u6B21\u30C1\u30A7\u30C3\u30AF",
  shippingRequests: "\u767A\u9001\u78BA\u8A8D\u30EA\u30B9\u30C8",
  productSalesSummary: "\u5546\u54C1\u5225\u8CA9\u58F2\u96C6\u8A08",
  consigneeSalesSummary: "\u59D4\u8A17\u5148\u5225\u58F2\u4E0A\u96C6\u8A08",
};

function getOrCreateSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

function writeArrayToSheet_(sheetName, arr) {
  const sh = getOrCreateSheet_(sheetName);
  sh.clearContents();
  if (!arr || !arr.length) return;
  const headers = Object.keys(arr[0]);
  const rows = arr.map((obj) => headers.map((h) => (obj[h] === undefined ? "" : obj[h])));
  sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
}

function readSheetAsArray_(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getDataRange().getValues();
  const headers = values[0];
  return values.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, i) => (obj[h] = row[i]));
    return obj;
  });
}

function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.type === "full-sync") {
    writeArrayToSheet_(SHEETS.products, body.data.products);
    writeArrayToSheet_(SHEETS.consignees, body.data.consignees);
    writeArrayToSheet_(SHEETS.recipients, body.data.recipients);
    writeArrayToSheet_(SHEETS.transactions, body.data.transactions);
    writeArrayToSheet_(SHEETS.adjustments, body.data.adjustments);
    writeArrayToSheet_(SHEETS.monthlyChecks, body.data.monthlyChecks);
    writeArrayToSheet_(SHEETS.shippingRequests, body.data.shippingRequests);
    writeArrayToSheet_(SHEETS.productSalesSummary, body.data.productSalesSummary);
    writeArrayToSheet_(SHEETS.consigneeSalesSummary, body.data.consigneeSalesSummary);
    (body.data.consigneeMonthlySheets || []).forEach(function (s) {
      writeArrayToSheet_(s.sheetName, s.rows);
    });
    return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
  }
  if (body.type === "send-email") {
    try {
      MailApp.sendEmail({ to: body.to, subject: body.subject, body: body.body });
      return ContentService.createTextOutput(JSON.stringify({ status: "ok" })).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: String(err) })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "unknown type" })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const data = {
    products: readSheetAsArray_(SHEETS.products),
    consignees: readSheetAsArray_(SHEETS.consignees),
    recipients: readSheetAsArray_(SHEETS.recipients),
    transactions: readSheetAsArray_(SHEETS.transactions),
    adjustments: readSheetAsArray_(SHEETS.adjustments),
    monthlyChecks: readSheetAsArray_(SHEETS.monthlyChecks),
    shippingRequests: readSheetAsArray_(SHEETS.shippingRequests),
    externalImports: readSheetAsArray_("\u5916\u90E8\u53D6\u8FBC_\u59D4\u8A17\u5148\u58F2\u4E0A"),
  };
  return ContentService.createTextOutput(JSON.stringify({ status: "ok", data })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * \u3010\u5DE1\u56DE\u53D6\u8FBC\u3011\u59D4\u8A17\u5148\u30DE\u30B9\u30BF\u306E\u300C\u58F2\u4E0A\u5831\u544A\u306E\u53D7\u3051\u53D6\u308A\u65B9\u300D\u304C\u300C\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u3092\u81EA\u52D5\u53D6\u5F97\u300D\u306E\u59D4\u8A17\u5148\u3092\u5DE1\u56DE\u3057\u3001
 * \u5404\u3005\u306E\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u306E\u5185\u5BB9\u3092\u305D\u306E\u307E\u307E\u300C\u5916\u90E8\u53D6\u8FBC_\u59D4\u8A17\u5148\u58F2\u4E0A\u300D\u30B7\u30FC\u30C8\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3059\u3002
 * \u6CE8\u610F: \u5F62\u5F0F\u3092\u7D71\u4E00\u3059\u308B\u524D\u306E\u6BB5\u968E\u306A\u306E\u3067\u3001\u307E\u305A\u306F\u300C\u751F\u30C7\u30FC\u30BF\u3092\u96C6\u3081\u308B\u300D\u3060\u3051\u3092\u81EA\u52D5\u5316\u3057\u3066\u3044\u307E\u3059\u3002
 * \u4E88\u3081\u5404\u59D4\u8A17\u5148\u306E\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u3092\u3001\u3053\u306EApps Script\u3092\u5B9F\u884C\u3059\u308BGoogle\u30A2\u30AB\u30A6\u30F3\u30C8\u306B\u5171\u6709(\u9591\u89A7\u53EF)\u3057\u3066\u304A\u3044\u3066\u304F\u3060\u3055\u3044\u3002
 */
function importFromConsigneeSheets() {
  const consignees = readSheetAsArray_(SHEETS.consignees);
  const targets = consignees.filter(function (c) {
    return c.reportMethod === "sheet" && c.sourceSheetUrl;
  });
  const resultSheetName = "\u5916\u90E8\u53D6\u8FBC_\u59D4\u8A17\u5148\u58F2\u4E0A";
  const sh = getOrCreateSheet_(resultSheetName);
  sh.clearContents();
  sh.getRange(1, 1, 1, 5).setValues([["\u53D6\u8FBC\u65E5\u6642", "\u59D4\u8A17\u5148\u540D", "\u30B7\u30FC\u30C8\u540D", "\u884C\u756A\u53F7", "\u5185\u5BB9(JSON)"]]);
  let outRow = 2;
  const errors = [];
  targets.forEach(function (c) {
    try {
      const src = SpreadsheetApp.openByUrl(c.sourceSheetUrl);
      const sheets = src.getSheets();
      sheets.forEach(function (s) {
        const values = s.getDataRange().getValues();
        if (values.length < 2) return;
        const headers = values[0];
        const now = new Date();
        for (let i = 1; i < values.length; i++) {
          const obj = {};
          headers.forEach(function (h, idx) {
            obj[h] = values[i][idx];
          });
          sh.getRange(outRow, 1, 1, 5).setValues([[now, c.name, s.getName(), i + 1, JSON.stringify(obj)]]);
          outRow++;
        }
      });
    } catch (err) {
      errors.push(c.name + ": " + err.message);
    }
  });
  if (errors.length) {
    const errSh = getOrCreateSheet_("\u5916\u90E8\u53D6\u8FBC_\u30A8\u30E9\u30FC");
    errSh.clearContents();
    errSh.getRange(1, 1, 1, 2).setValues([["\u65E5\u6642", "\u30A8\u30E9\u30FC\u5185\u5BB9"]]);
    errors.forEach(function (msg, i) {
      errSh.getRange(i + 2, 1, 1, 2).setValues([[new Date(), msg]]);
    });
  }
}

/**
 * \u3010\u521D\u56DE\u306E\u307F\u5B9F\u884C\u3011\u3053\u306E\u95A2\u6570\u3092\u4E00\u5EA6\u5B9F\u884C\u3059\u308B\u3068\u3001\u6BCE\u65E5\u6C7A\u307E\u3063\u305F\u6642\u9593\u306Bimport FromConsigneeSheets\u3092
 * \u81EA\u52D5\u5B9F\u884C\u3059\u308B\u30C8\u30EA\u30AC\u30FC\u304C\u767B\u9332\u3055\u308C\u307E\u3059\u3002(\u30A8\u30C7\u30A3\u30BF\u4E0A\u90E8\u306E\u95A2\u6570\u9078\u629E\u304B\u3089\u3053\u306E\u95A2\u6570\u3092\u9078\u3093\u3067\u300C\u5B9F\u884C\u300D\u3057\u3066\u304F\u3060\u3055\u3044)
 */
function createDailyImportTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "importFromConsigneeSheets") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("importFromConsigneeSheets").timeBased().everyDays(1).atHour(6).create();
}
`;
const FAQ_ITEMS = [{ q: "「移動」と「買取」で発送する時、何が違う？", a: "「移動（委託・自社）」は、商品の所有権はBOUKEN WORKSに残したまま、場所だけ移動させる記録です。委託先に送っても在庫評価額にはカウントされ続けます。一方「買取（倉庫から発送）」は、発送した瞬間に所有権が買取先に移るという考え方なので、発送と同時に在庫から完全に除外されます（買取先の場所には在庫として残りません）。委託先へ送る際は必ずどちらの契約形態かを確認してから選んでください。", category: "取引記録" }, { q: "在庫の数が実際とズレていたら？", a: "取引記録で「棚卸調整」という種別を使います。場所と商品を選び、実際の数と帳簿上の数の差分を入力して「増加/減少」を選んでください。直接数字を上書きするのではなく、差分を記録する方式なので、いつ・どれだけ・なぜ調整したかの履歴が残ります。メモ欄に理由を書いておくと安心です。", category: "取引記録" }, { q: "委託先の手数料率を直したら、過去の取引記録はどうなる？", a: "自動では変わりません。直したい取引を開いて保存し直すと、その取引に限って新しい料率を適用するか選べます（オレンジ色のバナーが出て、チェックすると金額欄も自動再計算されます）。数量や日付だけ直したい時はチェック不要です。", category: "委託先マスタ" }, { q: "商品を「販売終了」にすると？", a: "在庫アラート（在庫ゼロ・少数）の対象から完全に外れ、商品マスタ一覧の一番下にまとめて表示されます。完全に取扱いをやめる商品用です。", category: "商品マスタ" }, { q: "「取扱不可」と「販売終了」の違いは？", a: "「取扱不可」は委託先への新規ご案内を止めるだけで、STORESやイベントなど自社チャネルでは引き続き販売したい場合に使います（在庫アラートの対象には入ります）。「販売終了」は完全にやめる場合です。", category: "商品マスタ" }, { q: "ダッシュボードの「在庫評価額」は何？", a: "全商品の「在庫数×原価」の合計で、※現在時点のスナップショットです（年度別や決算日時点を自動では遡ることはできません）。委託先に預けている在庫も含みますが、買取に出した在庫は含まれません（発送時点で所有権が移るため）。決算・確定申告に使う場合は、必ず顧問税理士にチェック方法（総平均法など）を確認してください。", category: "ダッシュボード" }, { q: "発送を記録する時、「請求書を作成する」が出ないことがある", a: "そういう仕様です。「移動（委託・自社）」は単なる場所移動で売上ではないため、請求書の項目自体が出ません。「買取」と「委託売上（売上報告）」の時は実際に売上が立つので、請求書の作成も選べます。", category: "発送依頼・確認リスト" }, { q: "新商品を委託先に卸す時の手順は？", a: "必ず「発送前に商品マスタへ商品を登録」してから発送（移動）を記録してください。発送時点で商品マスタに登録されていれば在庫は自動反映されます。逆に発送後に登録すると、後日委託先の売上報告を取り込む際の商品名マッチングに失敗するので注意してください。", category: "商品マスタ" }, { q: "委託先のスプレッドシートから自動で売上を取り込んでくれるって本当？", a: "本当です。委託先マスタで「売上報告の受け取り方」を「スプレッドシートを自動取得」にしてURLを登録しておけば、毎日自動で巡回してもらえます。取り込んだ生データは設定画面から確認できますが、取引記録への反映は一括自動ではしていません（委託先ごとにフォーマットが違うため）。TSVをコピーして「取引記録」の「貼り付けで一括登録」に貼り付けてください。", category: "委託先マスタ" }, { q: "CSV出力とGoogleスプレッドシート連携は何が違う？", a: "CSV出力は「今すぐ手元にデータを持ち出したい時」用の単発の機能です。一方Googleスプレッドシート連携（設定画面の「送信/取得」）は、バックアップ・共有用の今後継続的な仕組みです。", category: "設定・連携" }, { q: "Googleログインの画面が出て困っている", a: "設定画面の「GoogleクライアントID」が空欄の間はログイン画面は一切出ません。出ている場合は設定済みなので、許可されたメールアドレスでGoogleログインしてください。", category: "設定・連携" }, { q: "仕入れの時、原価を入れ忘れたらどうなる？", a: "原価(単価)が空欄・0円のまま保存しようとすると、入力画面に警告が出ます。その状態で保存しても、商品マスタの原価は上書きされず、今までの値がそのまま残ります(0円で誤って上書きされる事故は起きません)。後で気づいたら、その取引記録を開いて原価を入力し直せば、その時点で商品マスタにも反映されます。", category: "取引記録" }, { q: "増刷して原価が変わった時はどう記録すればいい？", a: "増刷分を「仕入」取引として記録し、その時の単価欄に新しい原価を入力してください。保存すると自動的に商品マスタの原価が最新の値に更新されます(最終仕入原価法という、BOUKEN WORKSが実際に使っている評価方法に合わせた仕組みです)。過去の取引記録はそのまま残るので、いつ・いくらだったかの履歴としても確認できます。", category: "取引記録" }, { q: "発送完了メールは自動で送られる？何度も送られたりしない？", a: "発送依頼・確認リストで「完了」を押すと、委託先にメールアドレスが登録されていれば送信するか確認画面が出ます(Apps ScriptのURL設定が必要です)。一度送信すると記録が残るので、「完了」を取り消して再度完了にしても、同じ依頼で二重に送られることはありません。", category: "発送依頼・確認リスト" }, { q: "棚卸資産明細で過去の日付を指定すると何が変わる？", a: "指定した日付までの取引記録だけを積み上げ直して、その時点の在庫数を再現します。原価は今の商品マスタに登録されている値(最新の原価)を使うので、決算日以降に原価が変わっている場合は多少ズレる可能性がありますが、BOUKEN WORKSの運用(原価変更は年1回程度)であれば実務上問題ない精度です。", category: "棚卸資産明細" }, { q: "在庫アラートはどこの在庫を見て判定してる？", a: "「設定・連携」ページの「在庫アラートの対象拠点」で選んだ拠点の在庫を見て判定しています。何も選んでいない場合は自動でBOUKEN倉庫のみが対象になり、複数選ぶとそれらの合計在庫数で判定します（対象外の拠点の在庫は含まれません）。対象拠点の在庫が発注点を下回ると「少」、ゼロになると「ゼロ」のアラートが出ます。", category: "在庫状況" }, { q: "シリーズ（ジャンル）の並び順を変えたい時は？", a: "あいうえお順ではなく、商品マスタ内で商品が最初に登録された順番で並びます。並び順を変えたい場合は、そのシリーズの最初の商品をドラッグで前後に動かしてください。ジャンル未設定の商品は「その他」として常に一番下にまとまります。", category: "商品マスタ" }, { q: "委託先マスタの「担当社員」欄って何のための項目？", a: "委託先の窓口担当者(先方の人)とは別に、社内でその委託先を主に担当している社員の名前を記録しておく欄です。今は自由入力ですが、将来的に社員マスタができたらプルダウン選択式に切り替える予定です。", category: "委託先マスタ" }, { q: "商品マスタ・委託先マスタ・発送先マスタは、それぞれ個別にスプレッドシートへ送れる？", a: "できません。「送信」「取得」ボタンは「設定・連携」ページにしかなく、押すと商品マスタ・委託先マスタ・発送先マスタ・取引記録など全部のデータがまとめて1回で同期されます。特定のマスタだけを送る・取得することはできません。また同期は自動ではなく手動です（データを直しただけでは何も起きず、「送信」を押した時だけスプレッドシートに反映されます）。アプリ側とスプレッドシート側を同時に編集すると、後から操作した方で上書きされるので、どちらか一方向で更新するようにしてください。", category: "設定・連携" }, { q: "すでに在庫がある商品に、後から追加費用（シール貼り直しなど）がかかったら原価はどう直す？", a: "今の原価をそのまま書き換えるのではなく、「今残っている在庫数」で追加費用を均してから書き換えます。\n\n新しい原価 = (今の原価 × 今残っている在庫数 + 追加費用の総額) ÷ 今残っている在庫数\n\nポイントは「割る数」に、仕入れた時の総数ではなく、今実際に手元に残っている在庫数（すでに売れた分は除く）を使うことです。すでに売れて手元にない分にまで追加費用を配分してしまうと、在庫評価額が不正確になります。\n\n書き換えるのは商品マスタの原価欄のみで、過去の取引記録は変更不要です（このアプリは商品ごとの利益計算をしておらず、原価は棚卸資産明細の計算にのみ使われるため、過去の売上・手数料計算には影響しません）。\n\n決算をまたぐ場合は、「棚卸資産明細」を抜き出す前に原価を直しておく必要があります（抜き出した後に直しても、その資料には反映されません）。すでに決算を提出済みの場合は、過去の数字は直さず、今の原価を上げるだけでよく、今期の費用として自然に反映されます。", category: "商品マスタ" }];
const FAQ_CATEGORIES = ["ダッシュボード", "取引記録", "発送依頼・確認リスト", "月次チェック", "販売集計", "売掛管理", "在庫状況", "棚卸資産明細", "納品書一覧", "請求書一覧", "商品マスタ", "委託先マスタ", "設定・連携", "その他"];
function FAQPage({ customFaq, setCustomFaq, faqOverrides, setFaqOverrides }) {
  const [openKey, setOpenKey] = useState("builtin-0");
  const [modal, setModal] = useState(null);
  const del = useDeleteConfirm();
  const builtinItems = FAQ_ITEMS.map((item, i) => {
    const key = `builtin-${i}`;
    const ov = faqOverrides?.[key];
    if (ov?.hidden) return null;
    return { q: ov?.q ?? item.q, a: ov?.a ?? item.a, category: ov?.category ?? item.category ?? "その他", key, builtin: true, edited: !!ov };
  }).filter(Boolean);
  const allItems = [...builtinItems, ...(customFaq || []).map((item) => ({ ...item, category: item.category || "その他", key: item.id, builtin: false }))];
  const grouped = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    allItems.forEach((item) => {
      const cat = item.category || "その他";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(item);
    });
    return FAQ_CATEGORIES.map((cat) => [cat, map.get(cat) || []]).filter(([, items]) => items.length > 0);
  }, [allItems]);
  const save = (form) => {
    if (modal === "new") {
      setCustomFaq((prev) => [...prev, { id: uid("FAQ"), q: form.q, a: form.a, category: form.category }]);
    } else if (modal.builtin) {
      setFaqOverrides((prev) => ({ ...prev, [modal.key]: { q: form.q, a: form.a, category: form.category } }));
    } else {
      setCustomFaq((prev) => prev.map((f) => f.id === modal.id ? { ...f, q: form.q, a: form.a, category: form.category } : f));
    }
    setModal(null);
  };
  const remove = (item) => {
    if (item.builtin) {
      setFaqOverrides((prev) => ({ ...prev, [item.key]: { hidden: true } }));
    } else {
      setCustomFaq((prev) => prev.filter((f) => f.id !== item.id));
    }
    del.cancel();
  };
  const restoreBuiltin = (key) => setFaqOverrides((prev) => {
    const next = { ...prev };
    delete next[key];
    return next;
  });
  return <div className="space-y-5 max-w-3xl">
      <SectionTitle eyebrow="よくある質問" title="FAQ" action={<Button variant="accent" icon={Plus} onClick={() => setModal("new")}>
            質問を追加
          </Button>} />
      {grouped.map(([cat, items]) => <div key={cat} className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--accent2)" }}>
            {cat}
          </div>
          {items.map((item) => <Card key={item.key} className="overflow-hidden">
              <div className="w-full flex items-center gap-2 px-4 py-3">
                <button type="button" className="flex-1 flex items-center justify-between gap-2 text-left" onClick={() => setOpenKey((o) => o === item.key ? null : item.key)}>
                  <span className="font-medium text-sm">
                    {item.q}
                    {!item.builtin && <span className="ml-1.5 text-[10px] font-normal px-1.5 py-0.5 rounded-full" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
                        自分で追加
                      </span>}
                    {item.builtin && item.edited && <span className="ml-1.5 text-[10px] font-normal px-1.5 py-0.5 rounded-full" style={{ background: "#E2E7E8", color: "var(--accent2)" }}>
                        編集済み
                      </span>}
                  </span>
                  {openKey === item.key ? <ChevronDown size={16} style={{ flexShrink: 0 }} /> : <ChevronRight size={16} style={{ flexShrink: 0 }} />}
                </button>
                <div className="flex gap-1 shrink-0">
                  {item.builtin && item.edited && <button className="p-1.5 rounded hover:bg-black/5" title="元の内容に戻す" onClick={() => restoreBuiltin(item.key)}>
                      <RefreshCw size={14} style={{ color: "var(--text-muted)" }} />
                    </button>}
                  <button className="p-1.5 rounded hover:bg-black/5" onClick={() => setModal(item)}>
                    <Pencil size={14} />
                  </button>
                  <button className="p-1.5 rounded hover:bg-black/5" onClick={() => del.ask(item.key)}>
                    <Trash2 size={14} style={{ color: "var(--danger)" }} />
                  </button>
                </div>
              </div>
              {del.isPending(item.key) && <div className="px-4 pb-3">
                  <ConfirmBar message={item.builtin ? "この質問を一覧から非表示にしますか？(あとで元に戻せます)" : "この質問を削除しますか？"} confirmLabel={item.builtin ? "非表示にする" : "削除する"} onConfirm={() => remove(item)} onCancel={del.cancel} />
                </div>}
              {openKey === item.key && <div className="px-4 pb-4 text-sm whitespace-pre-wrap" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                  {item.a}
                </div>}
            </Card>)}
        </div>)}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "new" ? "質問を追加" : "質問を編集"}>
        <FAQForm initial={modal === "new" ? null : modal} onSave={save} onCancel={() => setModal(null)} />
      </Modal>
    </div>;
}
function FAQForm({ initial, onSave, onCancel }) {
  const [q, setQ] = useState(initial?.q || "");
  const [a, setA] = useState(initial?.a || "");
  const [category, setCategory] = useState(initial?.category || "その他");
  const [error, setError] = useState("");
  const handleSubmit = () => {
    if (!q.trim() || !a.trim()) {
      setError("質問と回答の両方を入力してください");
      return;
    }
    onSave({ q: q.trim(), a: a.trim(), category });
  };
  return <div className="space-y-3">
      {error && <p className="text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>}
      <Input label="質問" value={q} onChange={(e) => setQ(e.target.value)} placeholder="例: 委託先が急に休止になったら?" />
      <Select label="ジャンル(メニューの項目に合わせてください)" value={category} onChange={(e) => setCategory(e.target.value)}>
        {FAQ_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </Select>
      <label className="block text-sm">
        <div className="mb-1 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          回答
        </div>
        <textarea value={a} onChange={(e) => setA(e.target.value)} rows={5} className="w-full rounded-md border px-3 py-2 text-sm outline-none" style={{ borderColor: "var(--border)" }} />
      </label>
      <div className="flex justify-end gap-2 pt-3 mt-1 border-t" style={{ borderColor: "var(--border)" }}>
        <Button variant="ghost" onClick={onCancel}>
          キャンセル
        </Button>
        <Button variant="accent" onClick={handleSubmit} icon={Check}>
          保存
        </Button>
      </div>
    </div>;
}
function Settings({ settings, setSettings, fullState, onPullApply, onClearMonthlyChecks, onClearShippingRequests, consignees }) {
  const [url, setUrl] = useState(settings.appsScriptUrl || "");
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [confirmingClearChecks, setConfirmingClearChecks] = useState(false);
  const [confirmingClearShipping, setConfirmingClearShipping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [company, setCompany] = useState({ ...DEFAULT_COMPANY_INFO, ...settings.company || {} });
  const [companySaved, setCompanySaved] = useState(false);
  const setCompanyField = (k) => (e) => setCompany((c) => ({ ...c, [k]: e.target.value }));
  const stockAlertLocationIds = settings.stockAlertLocationIds || [];
  const alertableConsignees = (consignees || []).filter((c) => c.status !== "休止" && c.status !== "閉店");
  const toggleStockAlertLocation = (id) => {
    setSettings((s) => {
      const cur = s.stockAlertLocationIds || [];
      const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
      return { ...s, stockAlertLocationIds: next };
    });
  };
  const saveCompany = () => {
    setSettings((s) => ({ ...s, company }));
    setCompanySaved(true);
    setTimeout(() => setCompanySaved(false), 2e3);
  };
  const saveUrl = () => {
    setSettings((s) => ({ ...s, appsScriptUrl: url }));
    setStatus({ type: "ok", message: "URL\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F" });
  };
  const push = async () => {
    if (!url) {
      setStatus({ type: "error", message: "\u5148\u306BURL\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044" });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      await fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ type: "full-sync", data: fullState }) });
      setStatus({ type: "ok", message: "\u9001\u4FE1\u30EA\u30AF\u30A8\u30B9\u30C8\u3092\u9001\u308A\u307E\u3057\u305F\u3002\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u5074\u306B\u30B7\u30FC\u30C8\u304C\u5897\u3048\u3066\u3044\u308B\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044(\u30D6\u30E9\u30A6\u30B6\u306E\u5236\u9650\u3067\u6210\u529F/\u5931\u6557\u306E\u8FD4\u4E8B\u306F\u53D7\u3051\u53D6\u308C\u307E\u305B\u3093)\u3002" });
    } catch {
      setStatus({ type: "error", message: "\u9001\u4FE1\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF08URL\u304C\u6B63\u3057\u3044\u304B\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\uFF09\u3002\u4E0B\u306E\u624B\u9806\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002" });
    }
    setBusy(false);
  };
  const pull = async () => {
    if (!url) {
      setStatus({ type: "error", message: "\u5148\u306BURL\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044" });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.status === "ok") {
        onPullApply(json.data);
        setStatus({ type: "ok", message: "\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u304B\u3089\u8AAD\u307F\u8FBC\u307F\u307E\u3057\u305F" });
      } else {
        setStatus({ type: "error", message: "\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F" });
      }
    } catch {
      setStatus({ type: "error", message: "\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF08CORS\u307E\u305F\u306FURL\u30A8\u30E9\u30FC\uFF09\u3002\u4E0B\u306E\u624B\u9806\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002" });
    }
    setBusy(false);
  };
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
    } catch {
    }
  };
  const [externalImports, setExternalImports] = useState(null);
  const [externalImportsStatus, setExternalImportsStatus] = useState(null);
  const [externalImportsBusy, setExternalImportsBusy] = useState(false);
  const [expandedConsignee, setExpandedConsignee] = useState(null);
  const [copiedConsignee, setCopiedConsignee] = useState(null);
  const fetchExternalImports = async () => {
    if (!url) {
      setExternalImportsStatus({ type: "error", message: "\u5148\u306BURL\u3092\u4FDD\u5B58\u3057\u3066\u304F\u3060\u3055\u3044" });
      return;
    }
    setExternalImportsBusy(true);
    setExternalImportsStatus(null);
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (json.status === "ok") {
        setExternalImports(json.data.externalImports || []);
        setExternalImportsStatus({ type: "ok", message: `${(json.data.externalImports || []).length}\u4EF6\u53D6\u5F97\u3057\u307E\u3057\u305F` });
      } else {
        setExternalImportsStatus({ type: "error", message: "\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F" });
      }
    } catch {
      setExternalImportsStatus({ type: "error", message: "\u53D6\u5F97\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\uFF08CORS\u307E\u305F\u306FURL\u30A8\u30E9\u30FC\uFF09\u3002" });
    }
    setExternalImportsBusy(false);
  };
  const externalImportGroups = useMemo(() => {
    if (!externalImports) return [];
    const byConsignee = {};
    externalImports.forEach((row) => {
      const name = row["\u59D4\u8A17\u5148\u540D"] || "(\u4E0D\u660E)";
      if (!byConsignee[name]) byConsignee[name] = [];
      let parsed = null;
      try {
        parsed = JSON.parse(row["\u5185\u5BB9(JSON)"] || "{}");
      } catch {
      }
      byConsignee[name].push({ ...row, parsed: parsed || {} });
    });
    return Object.entries(byConsignee).map(([name, rows]) => ({ name, rows, latest: rows.reduce((max, r) => r["\u53D6\u8FBC\u65E5\u6642"] > max ? r["\u53D6\u8FBC\u65E5\u6642"] : max, "") }));
  }, [externalImports]);
  const copyGroupAsTsv = async (group) => {
    const headerSet = /* @__PURE__ */ new Set();
    group.rows.forEach((r) => Object.keys(r.parsed).forEach((k) => headerSet.add(k)));
    const headers = [...headerSet];
    const lines = [headers.join("\t"), ...group.rows.map((r) => headers.map((h) => String(r.parsed[h] ?? "")).join("\t"))];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopiedConsignee(group.name);
      setTimeout(() => setCopiedConsignee(null), 2e3);
    } catch {
    }
  };
  const [googleClientId, setGoogleClientId] = useState(settings.googleClientId || "");
  const [allowedDomain, setAllowedDomain] = useState(settings.allowedDomain || "");
  const [loginSettingsSaved, setLoginSettingsSaved] = useState(false);
  const saveLoginSettings = () => {
    setSettings((s) => ({ ...s, googleClientId: googleClientId.trim(), allowedDomain: allowedDomain.trim() }));
    setLoginSettingsSaved(true);
    setTimeout(() => setLoginSettingsSaved(false), 2e3);
  };
  return <div className="space-y-4">
      <SectionTitle eyebrow="ログイン" title="設定・連携" />

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">
            Googleログイン
          </span>
          {loginSettingsSaved && <span className="text-xs" style={{ color: "var(--success)" }}>
              保存しました
            </span>}
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Google Cloud ConsoleでOAuthクライアントIDを発行したら、ここに貼り付けてください。設定すると次回起動時からログイン画面が表示されます。空欄のままならログイン不要で従来通り使えます。
        </p>
        <Input label="Google クライアント ID" value={googleClientId} onChange={(e) => setGoogleClientId(e.target.value)} placeholder="xxxxxxxxxx.apps.googleusercontent.com" />
        <Input label="許可するメールドメイン" value={allowedDomain} onChange={(e) => setAllowedDomain(e.target.value)} placeholder="bouken-works.co.jp" />
        <Button variant="ghost" size="sm" onClick={saveLoginSettings}>
          保存
        </Button>
      </Card>

      <Card className="p-4 space-y-3">
        <span className="font-medium text-sm">
          在庫アラートの対象拠点
        </span>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          ダッシュボード・商品マスタ・在庫状況ページの在庫アラート(ゼロ/少数)を判定する対象拠点を選べます。何も選ばない場合は、これまで通り「BOUKEN倉庫」のみが自動で対象になります(休止・閉店中の拠点は一覧から除いています)。
        </p>
        <div className="flex flex-wrap gap-2">
          {alertableConsignees.map((c) => {
            const active = stockAlertLocationIds.includes(c.id);
            return <button key={c.id} type="button" onClick={() => toggleStockAlertLocation(c.id)} className="px-3 py-1.5 rounded-full text-xs font-medium transition" style={active ? { background: "var(--accent)", color: "white" } : { background: "var(--paper)", color: "var(--text)", border: "1px solid var(--border)" }}>
                {c.name}
              </button>;
          })}
        </div>
      </Card>

      <div className="text-xs font-mono uppercase tracking-widest pt-2" style={{ color: "var(--accent2)" }}>
        Google スプレッドシート連携
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">
            会社情報(納品書・請求書に印字されます)
          </span>
          {companySaved && <span className="text-xs" style={{ color: "var(--success)" }}>
              保存しました
            </span>}
        </div>
        <Input label="会社名" value={company.name || ""} onChange={setCompanyField("name")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="郵便番号" value={company.postalCode || ""} onChange={setCompanyField("postalCode")} />
          <Input label="TEL" value={company.tel || ""} onChange={setCompanyField("tel")} />
        </div>
        <Input label="住所" value={company.address || ""} onChange={setCompanyField("address")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="MAIL" value={company.mail || ""} onChange={setCompanyField("mail")} />
          <Input label="登録番号(インボイス)" value={company.registrationNumber || ""} onChange={setCompanyField("registrationNumber")} />
        </div>
        <div className="text-xs font-medium pt-2" style={{ color: "var(--text-muted)" }}>
          振込先(請求書のみ表示)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="銀行名" value={company.bankName || ""} onChange={setCompanyField("bankName")} />
          <Input label="支店名" value={company.bankBranch || ""} onChange={setCompanyField("bankBranch")} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="口座種別" value={company.bankAccountType || ""} onChange={setCompanyField("bankAccountType")} />
          <Input label="口座番号" value={company.bankAccountNumber || ""} onChange={setCompanyField("bankAccountNumber")} />
        </div>
        <Input label="口座名義" value={company.bankAccountHolder || ""} onChange={setCompanyField("bankAccountHolder")} />
        <Button variant="accent" onClick={saveCompany}>
          会社情報を保存
        </Button>
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Link2 size={16} style={{ color: "var(--accent2)" }} />
          <span className="font-medium text-sm">
            Apps Script Web アプリ URL
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Googleスプレッドシート側にApps
          Scriptを設定すると、このアプリのデータをスプレッドシートへ送信したり、スプレッドシートの内容を取り込んだりできます。
        </p>
        <div className="flex gap-2">
          <Input placeholder="https://script.google.com/macros/s/xxxxx/exec" value={url} onChange={(e) => setUrl(e.target.value)} className="flex-1" />
          <Button variant="ghost" onClick={saveUrl}>
            URLを保存
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="accent" icon={UploadCloud} onClick={push} disabled={busy}>
            今すぐスプレッドシートへ送信
          </Button>
          <Button variant="ghost" icon={RefreshCw} onClick={pull} disabled={busy}>
            スプレッドシートから取得
          </Button>
        </div>
        {status && <div className="text-sm px-3 py-2 rounded-md" style={{ background: status.type === "ok" ? "var(--success-soft)" : "var(--danger-soft)", color: status.type === "ok" ? "var(--success)" : "var(--danger)" }}>
            {status.message}
          </div>}
      </Card>

      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-medium text-sm">
            委託先スプレッドシートの取込結果
          </span>
          <Button variant="ghost" size="sm" icon={RefreshCw} onClick={fetchExternalImports} disabled={externalImportsBusy}>
            取込結果を取得
          </Button>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          委託先マスタで「スプレッドシートを自動取得」に設定した委託先の、Apps Scriptが毎朝巡回して集めた生データを確認できます。委託先ごとに形式が違うため、まずはTSV形式でコピーし、「取引記録」画面の「貼り付けで一括登録」に貼り付けて反映してください(委託先・取引種別はそちらで手動選択が必要です)。
        </p>
        {externalImportsStatus && <div className="text-sm px-3 py-2 rounded-md" style={{ background: externalImportsStatus.type === "ok" ? "var(--success-soft)" : "var(--danger-soft)", color: externalImportsStatus.type === "ok" ? "var(--success)" : "var(--danger)" }}>
            {externalImportsStatus.message}
          </div>}
        {externalImportGroups.length > 0 && <div className="space-y-2">
            {externalImportGroups.map((group) => <div key={group.name} className="border rounded-md" style={{ borderColor: "var(--border)" }}>
                <button type="button" className="w-full flex items-center justify-between px-3 py-2 text-left" onClick={() => setExpandedConsignee((c) => c === group.name ? null : group.name)}>
                  <span className="text-sm font-medium">
                    {group.name}
                    <span className="ml-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      {group.rows.length}行 / 最終取込 {group.latest || "-"}
                    </span>
                  </span>
                  {expandedConsignee === group.name ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {expandedConsignee === group.name && <div className="px-3 pb-3 space-y-2">
                    <div className="overflow-x-auto zk-scrollbar">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-left" style={{ color: "var(--text-muted)" }}>
                            {Object.keys(group.rows[0]?.parsed || {}).map((h) => <th key={h} className="py-1 pr-3 whitespace-nowrap">
                                {h}
                              </th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.slice(0, 10).map((r, i) => <tr key={i} className="border-t" style={{ borderColor: "var(--border)" }}>
                              {Object.keys(group.rows[0]?.parsed || {}).map((h) => <td key={h} className="py-1 pr-3 whitespace-nowrap">
                                  {String(r.parsed[h] ?? "")}
                                </td>)}
                            </tr>)}
                        </tbody>
                      </table>
                      {group.rows.length > 10 && <div className="text-xs pt-1" style={{ color: "var(--text-muted)" }}>
                          他{group.rows.length - 10}行(コピーには全件含まれます)
                        </div>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyGroupAsTsv(group)}>
                      {copiedConsignee === group.name ? "コピーしました" : "TSVをコピー(取引記録の一括登録に貼り付け用)"}
                    </Button>
                  </div>}
              </div>)}
          </div>}
      </Card>

      <Card className="p-4 space-y-3">
        <button className="flex items-center gap-2 w-full text-left" onClick={() => setShowCode((s) => !s)}>
          {showCode ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span className="font-medium text-sm">
            スプレッドシート側の設定手順とコードを見る
          </span>
        </button>
        {showCode && <div className="space-y-3">
            <ol className="text-sm list-decimal list-inside space-y-1" style={{ color: "var(--text-muted)" }}>
              <li>
                連携させたいGoogleスプレッドシートを開く（新規作成でもOK）
              </li>
              <li>メニューの「拡張機能」→「Apps Script」を開く</li>
              <li>エディタの中身を全て削除し、下記のコードを貼り付けて保存</li>
              <li>
                右上の「デプロイ」→「新しいデプロイ」→種類は「ウェブアプリ」を選択
              </li>
              <li>
                「アクセスできるユーザー」を「全員」にして「デプロイ」をクリック
              </li>
              <li>
                発行された「ウェブアプリのURL」をコピーし、上のURL欄に貼り付けて保存
              </li>
              <li>
                委託先マスタで「スプレッドシートを自動取得」に設定した委託先がいる場合は、一度「送信」を押してマスタ情報を反映させたあと、Apps Scriptエディタ上部の関数選択で
                <code className="mx-1 px-1 rounded" style={{ background: "var(--paper)" }}>createDailyImportTrigger</code>
                を選んで「実行」を押す(毎朝6時に自動巡回されるようになります)
              </li>
            </ol>
            <div className="relative">
              <pre className="text-xs p-3 rounded-md overflow-x-auto zk-scrollbar font-mono" style={{ background: "var(--ink)", color: "#DCEFE4", maxHeight: 320 }}>
                {APPS_SCRIPT_CODE}
              </pre>
              <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={copyCode} style={{ background: "white" }}>
                {copied ? "\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F" : "\u30B3\u30FC\u30C9\u3092\u30B3\u30D4\u30FC"}
              </Button>
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              ※
              ブラウザのセキュリティ制限(CORS)により、環境によっては送信・取得が失敗することがあります。その場合はデプロイ設定で「全員」アクセスになっているか、URLの末尾が
              /exec になっているかを確認してください。
            </p>
          </div>}
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} style={{ color: "var(--accent2)" }} />
          <span className="font-medium text-sm">
            経費管理シートなど、他のスプレッドシートに数字を渡したい場合
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          同期先のスプレッドシートには、上記に加えて「商品別販売集計」「委託先別売上集計」シートも自動で作られます。経費管理用の別スプレッドシート側で、次のような数式を入れれば自動的に反映されます(初回はアクセス許可のポップアップが出ます)。
        </p>
        <pre className="text-xs p-2 rounded-md overflow-x-auto zk-scrollbar font-mono" style={{ background: "var(--paper)", color: "var(--ink)" }}>
          {`=IMPORTRANGE("\u540C\u671F\u5148\u30B9\u30D7\u30EC\u30C3\u30C9\u30B7\u30FC\u30C8\u306EURL", "\u5546\u54C1\u5225\u8CA9\u58F2\u96C6\u8A08!A:D")`}
        </pre>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          委託先別の売上を渡したい場合はシート名を「委託先別売上集計」に変えてください。この2つのシートは「今すぐスプレッドシートへ送信」を押すたびに全期間の最新の数字で上書きされます。
        </p>
      </Card>

      <Card className="p-4 space-y-2">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} style={{ color: "var(--accent2)" }} />
          <span className="font-medium text-sm">
            委託先ごとの「品名×月」シートを自動更新したい場合
          </span>
        </div>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          「今すぐスプレッドシートへ送信」を押すと、委託契約の委託先ごとに「委託先名_販売数値」というシートが自動で作られ、品名×月(2月始まり〜1月締めの年度)の販売数・販売数合計・売上合計・手数料が毎回上書きされます。委託先に見てもらう用のシートとして、その委託先名のシートだけ共有・閲覧権限をつけて渡すことができます(入力は不要で、見るだけの自動反映シートです)。
        </p>
      </Card>

      <div className="pt-2">
        <button type="button" className="text-xs" style={{ color: "var(--text-muted)" }} onClick={() => setShowMaintenance((v) => !v)}>
          {showMaintenance ? "\u25BE" : "\u25B8"} その他のデータ管理
        </button>
        {showMaintenance && <Card className="p-4 space-y-4 mt-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trash2 size={14} style={{ color: "var(--text-muted)" }} />
                <span className="text-sm font-medium">
                  月次チェックの履歴を全て削除
                </span>
              </div>
              <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                半年に一度など、たまった月次チェックの記録をまとめて消したい時に使ってください。取引記録・発送依頼・確認リストなど他のデータには影響しません。
              </p>
              {confirmingClearChecks ? <ConfirmBar message="月次チェックの履歴を全て削除しますか？(元に戻せません)" onConfirm={() => {
    onClearMonthlyChecks?.();
    setConfirmingClearChecks(false);
  }} onCancel={() => setConfirmingClearChecks(false)} /> : <Button variant="ghost" size="sm" onClick={() => setConfirmingClearChecks(true)}>
                  月次チェックを全て削除
                </Button>}
            </div>
            <div className="pt-3 border-t" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-1">
                <Trash2 size={14} style={{ color: "var(--text-muted)" }} />
                <span className="text-sm font-medium">
                  発送依頼・確認リストを全て削除
                </span>
              </div>
              <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                完了済みも含めて、発送依頼・確認リストの記録をまとめて消したい時に使ってください。取引記録・在庫数には影響しません。
              </p>
              {confirmingClearShipping ? <ConfirmBar message="発送依頼・確認リストを全て削除しますか？(元に戻せません)" onConfirm={() => {
    onClearShippingRequests?.();
    setConfirmingClearShipping(false);
  }} onCancel={() => setConfirmingClearShipping(false)} /> : <Button variant="ghost" size="sm" onClick={() => setConfirmingClearShipping(true)}>
                  発送依頼・確認リストを全て削除
                </Button>}
            </div>
          </Card>}
      </div>
    </div>;
}
function SidebarLink({ item, active, onClick, badge }) {
  return <button onClick={onClick} className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-sm text-left transition ${active ? "zk-tab-active" : ""}`} style={{ background: active ? "rgba(255,255,255,0.08)" : "transparent", color: active ? "white" : "rgba(255,255,255,0.72)" }}>
      <item.icon size={16} />
      <span className="flex-1">{item.label}</span>
      {badge > 0 && <span className="zk-stamp px-1.5 py-0.5 text-[10px]" style={{ background: "var(--danger)", color: "white" }}>
          {badge}
        </span>}
    </button>;
}
function GoogleLoginScreen({ clientId, allowedDomain, onLogin }) {
  const btnRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState("");
  const [loginError, setLoginError] = useState("");
  useEffect(() => {
    if (!clientId) return;
    if (window.google?.accounts?.id) {
      setScriptLoaded(true);
      return;
    }
    const existing = document.querySelector('script[data-zk-google-gsi="1"]');
    if (existing) {
      existing.addEventListener("load", () => setScriptLoaded(true));
      existing.addEventListener("error", () => setScriptError("Googleログイン用のスクリプトを読み込めませんでした。ネットワーク環境をご確認ください。"));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.zkGoogleGsi = "1";
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptError("Googleログイン用のスクリプトを読み込めませんでした。ネットワーク環境をご確認ください。");
    document.head.appendChild(script);
  }, [clientId]);
  useEffect(() => {
    if (!scriptLoaded || !clientId || !btnRef.current || !window.google?.accounts?.id) return;
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (resp) => {
        const payload = decodeGoogleJwt(resp.credential);
        if (!payload || !payload.email) {
          setLoginError("ログイン情報の取得に失敗しました。もう一度お試しください。");
          return;
        }
        const domain = payload.email.split("@")[1] || "";
        if (allowedDomain && domain !== allowedDomain) {
          setLoginError(`${allowedDomain} のアカウントでログインしてください(${payload.email} は許可されていません)`);
          return;
        }
        setLoginError("");
        onLogin({ email: payload.email, name: payload.name || payload.email, picture: payload.picture || "", loggedInAt: (/* @__PURE__ */ new Date()).toISOString() });
      },
    });
    window.google.accounts.id.renderButton(btnRef.current, { theme: "outline", size: "large", width: 280, text: "signin_with" });
  }, [scriptLoaded, clientId, allowedDomain, onLogin]);
  return <div className="zk-root flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm rounded-xl border p-6 space-y-4 text-center" style={{ borderColor: "var(--border)", background: "white" }}>
        <div className="text-lg font-semibold" style={{ color: "var(--ink)" }}>
          THE NAZO STORE在庫台帳
        </div>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          続けるにはGoogleアカウントでログインしてください
        </p>
        {!clientId && <div className="text-sm px-3 py-2 rounded-md" style={{ background: "var(--accent-soft)", color: "#8A5E10" }}>
            Googleクライアント IDが未設定です。設定画面から入力してください。
          </div>}
        {clientId && <div className="flex justify-center" ref={btnRef} />}
        {scriptError && <div className="text-sm" style={{ color: "var(--danger)" }}>
            {scriptError}
          </div>}
        {loginError && <div className="text-sm" style={{ color: "var(--danger)" }}>
            {loginError}
          </div>}
      </div>
    </div>;
}
export default function App() {
  useInjectStyle(GLOBAL_STYLE);
  const [masters, setMasters, mastersLoaded] = usePersistentState(STORAGE_KEYS.masters, { products: SEED_PRODUCTS, consignees: SEED_CONSIGNEES, recipients: SEED_RECIPIENTS });
  const [customFaq, setCustomFaq] = usePersistentState(STORAGE_KEYS.customFaq, []);
  const [faqOverrides, setFaqOverrides] = usePersistentState(STORAGE_KEYS.faqOverrides, {});
  const [transactions, setTransactions, txLoaded, , appendTransactionsSafe] = usePersistentState(STORAGE_KEYS.transactions, []);
  const [settings, setSettings, settingsLoaded] = usePersistentState(STORAGE_KEYS.settings, { appsScriptUrl: "", company: DEFAULT_COMPANY_INFO, docNumbers: { nextDeliveryNum: 163, nextInvoiceNum: 417 }, googleClientId: "", allowedDomain: "bouken-works.co.jp", authUser: null, stockAlertLocationIds: [] });
  const [misc, setMisc] = usePersistentState(STORAGE_KEYS.misc, { adjustments: [], monthlyChecks: [], invoices: [] }, migrateMiscFromLegacyKeys);
  const adjustments = misc.adjustments;
  const monthlyChecks = misc.monthlyChecks;
  const invoices = misc.invoices;
  const setAdjustments = useCallback((updater) => setMisc((m) => ({ ...m, adjustments: typeof updater === "function" ? updater(m.adjustments) : updater })), [setMisc]);
  const setMonthlyChecks = useCallback((updater) => setMisc((m) => ({ ...m, monthlyChecks: typeof updater === "function" ? updater(m.monthlyChecks) : updater })), [setMisc]);
  const setInvoices = useCallback((updater) => setMisc((m) => ({ ...m, invoices: typeof updater === "function" ? updater(m.invoices) : updater })), [setMisc]);
  const [shipDocs, setShipDocs] = usePersistentState(STORAGE_KEYS.shipDocs, { shippingRequests: [], deliveryNotes: [] }, migrateShipDocsFromLegacyKeys);
  const shippingRequests = shipDocs.shippingRequests;
  const deliveryNotes = shipDocs.deliveryNotes;
  const setShippingRequests = useCallback((updater) => setShipDocs((m) => ({ ...m, shippingRequests: typeof updater === "function" ? updater(m.shippingRequests) : updater })), [setShipDocs]);
  const setDeliveryNotes = useCallback((updater) => setShipDocs((m) => ({ ...m, deliveryNotes: typeof updater === "function" ? updater(m.deliveryNotes) : updater })), [setShipDocs]);
  // Combined safe-append: writes new shipping requests and/or new delivery
  // notes to the SAME storage key in a single storage.set() call, instead of
  // two separate round-trips. This is what registering a transaction (which
  // can create both at once) now uses.
  const appendShipDocsSafe = useCallback(async ({ shippingRequests: newShip, deliveryNotes: newNotes }) => {
    const merged = {
      shippingRequests: newShip?.length ? [...shipDocs.shippingRequests, ...newShip] : shipDocs.shippingRequests,
      deliveryNotes: newNotes?.length ? [...shipDocs.deliveryNotes, ...newNotes] : shipDocs.deliveryNotes,
    };
    setShipDocs(merged);
    return await storageSet(STORAGE_KEYS.shipDocs, merged);
  }, [shipDocs, setShipDocs]);
  const appendShippingRequestsSafe = useCallback((newItems) => appendShipDocsSafe({ shippingRequests: newItems }), [appendShipDocsSafe]);
  const [coverLetters, setCoverLetters, , , appendCoverLettersSafe] = usePersistentState(STORAGE_KEYS.coverLetters, []);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const products = masters.products;
  const consignees = masters.consignees;
  const recipients = masters.recipients || [];
  const setProducts = useCallback((updater) => setMasters((m) => ({ ...m, products: typeof updater === "function" ? updater(m.products) : updater })), [setMasters]);
  const setConsignees = useCallback((updater) => setMasters((m) => ({ ...m, consignees: typeof updater === "function" ? updater(m.consignees) : updater })), [setMasters]);
  const setRecipients = useCallback((updater) => setMasters((m) => ({ ...m, recipients: typeof updater === "function" ? updater(m.recipients || []) : updater })), [setMasters]);
  const allLoaded = mastersLoaded && txLoaded && settingsLoaded;
  const docNumbersRef = useRef(settings.docNumbers || { nextDeliveryNum: 1, nextInvoiceNum: 1 });
  useEffect(() => {
    if (settings.docNumbers) docNumbersRef.current = settings.docNumbers;
  }, [settingsLoaded, settings.docNumbers]);
  const issueDeliveryNumbers = useCallback((count) => {
    const start = docNumbersRef.current.nextDeliveryNum ?? 1;
    const assigned = Array.from({ length: count }, (_, i) => formatDocNumber("D", start + i));
    docNumbersRef.current = { ...docNumbersRef.current, nextDeliveryNum: start + count };
    const toPersist = docNumbersRef.current;
    setSettings((s) => ({ ...s, docNumbers: toPersist }));
    return assigned;
  }, [setSettings]);
  const issueInvoiceNumbers = useCallback((count) => {
    const start = docNumbersRef.current.nextInvoiceNum ?? 1;
    const assigned = Array.from({ length: count }, (_, i) => formatDocNumber("I", start + i));
    docNumbersRef.current = { ...docNumbersRef.current, nextInvoiceNum: start + count };
    const toPersist = docNumbersRef.current;
    setSettings((s) => ({ ...s, docNumbers: toPersist }));
    return assigned;
  }, [setSettings]);
  const issueInvoiceNumber = useCallback(() => issueInvoiceNumbers(1)[0], [issueInvoiceNumbers]);
  const addTransactionsWithShipping = useCallback(async (newTxRaw) => {
    const consigneeById2 = Object.fromEntries(consignees.map((c) => [c.id, c]));
    const newTx = newTxRaw.map((t) => {
      if (t.type === "\u59D4\u8A17" && t.fromLocation) {
        const c = consigneeById2[t.fromLocation];
        if (c) return { ...t, feeRateAtEntry: Number(c.feeRate) || 0 };
      }
      return t;
    });
    await appendTransactionsSafe(newTx);
    const shipments = deriveShippingRequests(newTx, consignees);
    const newNotes = buildDeliveryNotesFromTransactions(newTx, consignees, products, issueDeliveryNumbers);
    if (newNotes.length) {
      for (const note of newNotes) {
        const match = shipments.find((s) => s.sourceBatchId === note.sourceBatchId);
        if (match) match.deliveryNoteId = note.id;
      }
    }
    const newInvoices = buildInvoicesFromTransactions(newTx, consignees, products, issueInvoiceNumbers);
    if (newInvoices.length) {
      for (const inv of newInvoices) {
        const match = shipments.find((s) => s.sourceBatchId === inv.sourceBatchId);
        if (match) match.invoiceId = inv.id;
      }
      setInvoices((prev) => [...prev, ...newInvoices]);
    }
    // One combined write for both delivery notes and shipping requests,
    // instead of two separate round-trips.
    if (newNotes.length || shipments.length) {
      await appendShipDocsSafe({ deliveryNotes: newNotes, shippingRequests: shipments });
    }
    return shipments;
  }, [appendTransactionsSafe, appendShipDocsSafe, consignees, products, issueDeliveryNumbers, issueInvoiceNumbers, setInvoices]);
  const [shippingFocusId, setShippingFocusId] = useState(null);
  const goToShipping = useCallback((id) => {
    setShippingFocusId(id);
    setPage("shipping");
  }, []);
  const [deliveryFocusId, setDeliveryFocusId] = useState(null);
  const createDeliveryNoteFromShipping = useCallback((req) => {
    const consignee = consignees.find((c) => c.id === req.consigneeId);
    const [number] = issueDeliveryNumbers(1);
    const monthLabel = `${(/* @__PURE__ */ new Date()).getMonth() + 1}\u6708\u767A\u9001\u5206`;
    const title = `${consignee?.name || ""}\u69D8 ${monthLabel}`;
    const note = buildDeliveryNoteFromShippingRequest(req, consignees, products, transactions, number, title);
    setDeliveryNotes((prev) => [...prev, note]);
    return note;
  }, [consignees, products, transactions, issueDeliveryNumbers, setDeliveryNotes]);
  const [invoiceFocusId, setInvoiceFocusId] = useState(null);
  const createInvoiceFromShipping = useCallback((req) => {
    const consignee = consignees.find((c) => c.id === req.consigneeId);
    const number = issueInvoiceNumber();
    const monthLabel = `${(/* @__PURE__ */ new Date()).getMonth() + 1}\u6708\u767A\u6CE8\u5206`;
    const title = `${consignee?.name || ""}\u69D8 ${monthLabel}`;
    const inv = buildInvoiceFromShippingRequest(req, consignees, products, transactions, number, title);
    setInvoices((prev) => [...prev, inv]);
    return inv;
  }, [consignees, products, transactions, issueInvoiceNumber, setInvoices]);
  // Regenerate the delivery note / invoice linked to a batch, using the
  // batch's CURRENT transaction data — used right after editing a
  // transaction, so the person can keep the linked documents in sync in the
  // same action instead of a separate "reissue" step later.
  const updateLinkedDeliveryNoteForBatch = useCallback((batchId, txSnapshot) => {
    const oldNote = deliveryNotes.find((d) => d.sourceBatchId === batchId && !d.voided);
    if (!oldNote) return null;
    const [number] = issueDeliveryNumbers(1);
    const newNote = buildDeliveryNoteFromBatchId(batchId, consignees, products, txSnapshot || transactions, number, oldNote.title);
    if (!newNote) return null;
    setDeliveryNotes((prev) => [...prev.filter((d) => d.id !== oldNote.id), newNote]);
    setShippingRequests((prev) => prev.map((r) => r.deliveryNoteId === oldNote.id ? { ...r, deliveryNoteId: newNote.id } : r));
    return newNote;
  }, [deliveryNotes, consignees, products, transactions, issueDeliveryNumbers, setDeliveryNotes, setShippingRequests]);
  const updateLinkedInvoiceForBatch = useCallback((batchId, txSnapshot) => {
    const oldInvoice = invoices.find((i) => i.sourceBatchId === batchId);
    if (!oldInvoice) return null;
    const number = issueInvoiceNumber();
    const newInvoice = buildInvoiceFromBatchId(batchId, consignees, products, txSnapshot || transactions, number, oldInvoice.title);
    if (!newInvoice) return null;
    setInvoices((prev) => [...prev.filter((i) => i.id !== oldInvoice.id), newInvoice]);
    setShippingRequests((prev) => prev.map((r) => r.invoiceId === oldInvoice.id ? { ...r, invoiceId: newInvoice.id } : r));
    return newInvoice;
  }, [invoices, consignees, products, transactions, issueInvoiceNumber, setInvoices, setShippingRequests]);
  // Keeps a shipping request's item quantities in sync with an edited
  // transaction — the request itself isn't recreated (deadline, assignee,
  // requester, sample quantities, etc. all stay as they were), only the
  // quantities are refreshed to match the batch's current move-leg data.
  const updateLinkedShippingForBatch = useCallback((batchId, txSnapshot) => {
    const req = shippingRequests.find((r) => r.sourceBatchId === batchId);
    if (!req) return null;
    const moveLegs = (txSnapshot || transactions).filter((t) => t.batchId === batchId && t.type === "\u79FB\u52D5");
    if (!moveLegs.length) return null;
    const newItems = moveLegs.map((move) => {
      const existing = req.items.find((it) => it.productId === move.productId);
      return { productId: move.productId, qty: Number(move.qty) || 0, sampleQty: existing?.sampleQty || 0 };
    });
    setShippingRequests((prev) => prev.map((r) => r.id === req.id ? { ...r, items: newItems } : r));
    return { ...req, items: newItems };
  }, [shippingRequests, transactions, setShippingRequests]);
  // Standalone delivery note, created directly (not from a transaction) —
  // does not touch inventory, for cases like sending extra stock without
  // recording it as a sale/movement.
  const createManualDeliveryNote = useCallback((form) => {
    const consignee = consignees.find((c) => c.id === form.consigneeId);
    const [number] = issueDeliveryNumbers(1);
    const monthLabel = `${new Date().getMonth() + 1}\u6708\u767A\u9001\u5206`;
    const total = form.items.reduce((s, it) => s + it.amount, 0);
    const note = { id: uid("DN"), number, date: todayStr(), consigneeId: form.consigneeId, title: `${consignee?.name || ""}\u69D8 ${monthLabel}`, items: form.items, ...splitTaxIncluded(total), memo: form.memo || "", invoiceId: null, sourceBatchId: null };
    setDeliveryNotes((prev) => [...prev, note]);
    return note;
  }, [consignees, issueDeliveryNumbers, setDeliveryNotes]);
  // Clears all transactions plus anything derived FROM a transaction
  // (identified by having a sourceBatchId) — manually-created shipping
  // requests, delivery notes, and invoices (sourceBatchId === null) are
  // left alone since they were never tied to a transaction in the first
  // place.
  const clearAllTransactions = useCallback(() => {
    setTransactions([]);
    setShippingRequests((prev) => prev.filter((r) => !r.sourceBatchId));
    setDeliveryNotes((prev) => prev.filter((d) => !d.sourceBatchId));
    setInvoices((prev) => prev.filter((i) => !i.sourceBatchId));
  }, [setTransactions, setShippingRequests, setDeliveryNotes, setInvoices]);
  const inventory = useMemo(() => computeInventory(transactions, products, consignees), [transactions, products, consignees]);
  const alerts = useMemo(() => computeStockAlerts(inventory, products, consignees, settings.stockAlertLocationIds), [inventory, products, consignees, settings.stockAlertLocationIds]);
  const productSalesSummary = useMemo(() => computeAnnualProductSales(transactions, products, "all").map((r) => ({ \u5546\u54C1\u540D: r.product.name, シリーズ: r.product.genre || "", \u8CA9\u58F2\u6570: r.qty, \u58F2\u4E0A\u91D1\u984D: r.amount })), [transactions, products]);
  const consigneeSalesSummary = useMemo(() => computeAnnualConsigneeSales(transactions, consignees, "all").map((r) => ({ \u59D4\u8A17\u5148\u540D: r.consignee.name, \u8CA9\u58F2\u6570: r.qty, \u58F2\u4E0A\u91D1\u984D: r.amount })), [transactions, consignees]);
  const consigneeMonthlySheets = useMemo(() => {
    const fy = fiscalYearOf(todayStr());
    return consignees.filter((c) => c.contractType === "\u59D4\u8A17" && c.status !== "\u9589\u5E97").map((c) => ({ sheetName: `${c.name}_\u8CA9\u58F2\u6570\u5024`, rows: computeConsigneeMonthlyPivot(c, transactions, products, fy) }));
  }, [consignees, transactions, products]);
  const fullState = { products, consignees, recipients, transactions, adjustments, monthlyChecks, shippingRequests, deliveryNotes, invoices, coverLetters, productSalesSummary, consigneeSalesSummary, consigneeMonthlySheets };
  const onPullApply = (data) => {
    if (data.products?.length) setMasters((m) => ({ ...m, products: data.products }));
    if (data.consignees?.length) setMasters((m) => ({ ...m, consignees: data.consignees }));
    if (data.recipients) setMasters((m) => ({ ...m, recipients: data.recipients }));
    if (data.transactions) setTransactions(data.transactions);
    if (data.adjustments) setAdjustments(data.adjustments);
    if (data.monthlyChecks) setMonthlyChecks(data.monthlyChecks);
    if (data.shippingRequests) setShippingRequests(data.shippingRequests);
    if (data.deliveryNotes) setDeliveryNotes(data.deliveryNotes);
    if (data.invoices) setInvoices(data.invoices);
    if (data.coverLetters) setCoverLetters(data.coverLetters);
  };
  if (!allLoaded) {
    return <div className="zk-root flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-sm zk-pulse" style={{ color: "var(--ink)" }}>
          <RefreshCw size={16} className="animate-spin" />{" "}
          データを読み込んでいます…
        </div>
      </div>;
  }
  if (settings.googleClientId && !settings.authUser) {
    return <GoogleLoginScreen clientId={settings.googleClientId} allowedDomain={settings.allowedDomain} onLogin={(user) => setSettings((s) => ({ ...s, authUser: user }))} />;
  }
  const currentMonth = monthKey(todayStr());
  const monthlyCheckTargets = consignees.filter((c) => c.status === "\u7A3C\u50CD\u4E2D" && c.cadence !== "spot" && (c.contractType === "\u59D4\u8A17" || c.contractType === "\u8CB7\u53D6"));
  const monthlyCheckPending = monthlyCheckTargets.filter((c) => !monthlyChecks.some((m) => m.consigneeId === c.id && m.month === currentMonth && m.kind === (c.contractType === "\u59D4\u8A17" ? "sales" : "invoice") && (m.state === "done" || m.state === "skip"))).length;
  const pageBadges = { inventory: alerts.zero.length + alerts.low.length, monthlyCheck: monthlyCheckPending, shipping: shippingRequests.filter((r) => r.status !== "done").length };
  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard products={products} consignees={consignees} transactions={transactions} inventory={inventory} alerts={alerts} monthlyChecks={monthlyChecks} shippingRequests={shippingRequests} goTo={setPage} appsScriptUrl={settings.appsScriptUrl} />;
      case "products":
        return <ProductMaster products={products} setProducts={setProducts} inventory={inventory} consignees={consignees} stockAlertLocationIds={settings.stockAlertLocationIds} />;
      case "consignees":
        return <ConsigneeMaster consignees={consignees} setConsignees={setConsignees} />;
      case "recipients":
        return <RecipientMaster recipients={recipients} setRecipients={setRecipients} />;
      case "ledger":
        return <Ledger transactions={transactions} setTransactions={setTransactions} addTransactions={addTransactionsWithShipping} products={products} setProducts={setProducts} consignees={consignees} inventory={inventory} goToShipping={goToShipping} shippingRequests={shippingRequests} setShippingRequests={setShippingRequests} deliveryNotes={deliveryNotes} setDeliveryNotes={setDeliveryNotes} invoices={invoices} setInvoices={setInvoices} updateLinkedDeliveryNoteForBatch={updateLinkedDeliveryNoteForBatch} updateLinkedInvoiceForBatch={updateLinkedInvoiceForBatch} updateLinkedShippingForBatch={updateLinkedShippingForBatch} />;
      case "inventory":
        return <InventoryStatus products={products} consignees={consignees} inventory={inventory} alerts={alerts} stockAlertLocationIds={settings.stockAlertLocationIds} />;
      case "valuation":
        return <InventoryValuation products={products} transactions={transactions} consignees={consignees} />;
      case "salesSummary":
        return <SalesSummary transactions={transactions} products={products} consignees={consignees} />;
      case "receivables":
        return <Receivables consignees={consignees} transactions={transactions} adjustments={adjustments} setAdjustments={setAdjustments} monthlyChecks={monthlyChecks} />;
      case "monthlyCheck":
        return <MonthlyChecklist consignees={consignees} monthlyChecks={monthlyChecks} setMonthlyChecks={setMonthlyChecks} />;
      case "shipping":
        return <ShippingRequests shippingRequests={shippingRequests} setShippingRequests={setShippingRequests} appendShippingRequestsSafe={appendShippingRequestsSafe} consignees={consignees} products={products} focusId={shippingFocusId} onFocusConsumed={() => setShippingFocusId(null)} onCreateDeliveryNote={createDeliveryNoteFromShipping} deliveryNotes={deliveryNotes} setDeliveryNotes={setDeliveryNotes} onCreateInvoice={createInvoiceFromShipping} invoices={invoices} setInvoices={setInvoices} coverLetters={coverLetters} setCoverLetters={setCoverLetters} appendCoverLettersSafe={appendCoverLettersSafe} settings={settings} recipients={recipients} setRecipients={setRecipients} goTo={setPage} />;
      case "deliveryNotes":
        return <DeliveryNotesPage deliveryNotes={deliveryNotes} setDeliveryNotes={setDeliveryNotes} setShippingRequests={setShippingRequests} consignees={consignees} products={products} settings={settings} focusId={deliveryFocusId} onFocusConsumed={() => setDeliveryFocusId(null)} onCreateManual={createManualDeliveryNote} />;
      case "invoices":
        return <InvoicesPage invoices={invoices} setInvoices={setInvoices} setShippingRequests={setShippingRequests} consignees={consignees} products={products} transactions={transactions} settings={settings} issueInvoiceNumber={issueInvoiceNumber} focusId={invoiceFocusId} onFocusConsumed={() => setInvoiceFocusId(null)} />;
      case "faq":
        return <FAQPage customFaq={customFaq} setCustomFaq={setCustomFaq} faqOverrides={faqOverrides} setFaqOverrides={setFaqOverrides} />;
      case "settings":
        return <Settings settings={settings} setSettings={setSettings} fullState={fullState} onPullApply={onPullApply} onClearMonthlyChecks={() => setMonthlyChecks([])} onClearShippingRequests={() => setShippingRequests([])} onClearTransactions={clearAllTransactions} consignees={consignees} />;
      default:
        return null;
    }
  };
  return <div className="zk-root">
      <SaveFailingBanner />
      <LoadBlockedBanner />
      <div className="flex">
        {}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 flex-shrink-0 flex flex-col transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`} style={{ background: "var(--ink)" }}>
          <div className="px-5 py-5 border-b flex items-start justify-between" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <div>
              <div className="font-display text-lg font-semibold text-white leading-tight">
                THE NAZO STORE在庫台帳
              </div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
                委託販売・在庫・入金管理
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-white/10 text-white/70">
              <X size={18} />
            </button>
          </div>
          <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto zk-scrollbar">
            {NAV_ITEMS.map((item) => <React.Fragment key={item.id}>
                {item.dividerBefore && <div className="my-2 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }} />}
                <SidebarLink item={item} active={page === item.id} badge={pageBadges[item.id] || 0} onClick={() => {
    setPage(item.id);
    setSidebarOpen(false);
  }} />
              </React.Fragment>)}
          </nav>
          <div className="px-4 py-3 text-[11px] border-t" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}>
            共有データ・チーム全員に反映されます
          </div>
          {settings.authUser && <div className="px-4 py-3 border-t flex items-center justify-between gap-2" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <div className="min-w-0">
                <div className="text-xs text-white/85 truncate">
                  {settings.authUser.name}
                </div>
                <div className="text-[10px] text-white/45 truncate">
                  {settings.authUser.email}
                </div>
              </div>
              <button onClick={() => setSettings((s) => ({ ...s, authUser: null }))} className="text-[11px] px-2 py-1 rounded shrink-0" style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.25)" }}>
                ログアウト
              </button>
            </div>}
        </aside>

        {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40" onClick={() => setSidebarOpen(false)} />}

        {}
        <main className="flex-1 min-w-0">
          <div className="flex items-center gap-3 px-4 py-3 border-b sticky top-0 z-20" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
            <button onClick={() => setSidebarOpen(true)} className="p-1 rounded hover:bg-black/5" aria-label="メニューを開く">
              <Menu size={20} />
            </button>
            <button onClick={() => setPage("dashboard")} className="font-display font-semibold text-left" style={{ color: "var(--ink)" }}>
              THE NAZO STORE在庫台帳
            </button>
          </div>
          <div className="p-4 md:p-8 max-w-6xl mx-auto">{renderPage()}</div>
        </main>
      </div>
    </div>;
}
