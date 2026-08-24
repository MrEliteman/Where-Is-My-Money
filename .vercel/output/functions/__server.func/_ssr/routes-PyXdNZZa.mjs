import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as Download, C as Leaf, D as Gift, E as HeartPulse, F as Car, I as Calendar, L as Bus, M as Clapperboard, N as ChevronDown, O as Gamepad2, P as Check, R as BookOpen, S as Moon, T as Heart, _ as Plane, a as Upload, b as PawPrint, c as Sun, d as Shirt, f as Settings2, g as Plus, h as Repeat, i as Utensils, j as Coffee, k as Ellipsis, l as Star, m as Scissors, n as Wrench, p as Search, r as Wallet, s as Trash2, t as X, u as ShoppingCart, v as Phone, w as House, x as Music, y as Pencil, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Label2, c as Separator2, i as ItemIndicator2, l as Trigger, n as Content2, o as Portal2, r as Item2, s as Root2, t as CheckboxItem2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as cn, r as uid } from "./router-DjR_40os.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { t as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-PyXdNZZa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAP = {
	food: Utensils,
	transport: Bus,
	home: House,
	fun: Clapperboard,
	health: HeartPulse,
	clothes: Shirt,
	beauty: Scissors,
	gifts: Gift,
	pets: PawPrint,
	study: BookOpen,
	subs: Repeat,
	other: Ellipsis,
	star: Star,
	heart: Heart,
	coffee: Coffee,
	car: Car,
	plane: Plane,
	phone: Phone,
	game: Gamepad2,
	music: Music,
	wallet: Wallet,
	cart: ShoppingCart,
	leaf: Leaf,
	wrench: Wrench
};
function CategoryIcon({ id, className }) {
	const Icon = MAP[id] ?? Ellipsis;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className: cn("size-4", className),
		strokeWidth: 1.75
	});
}
function Donut({ slices, size = 148, stroke = 22 }) {
	const { paths, total } = (0, import_react.useMemo)(() => {
		const total = slices.reduce((s, x) => s + x.value, 0);
		const r = (size - stroke) / 2;
		const c = 2 * Math.PI * r;
		let offset = 0;
		return {
			paths: slices.filter((s) => s.value > 0).map((s) => {
				const len = total > 0 ? s.value / total * c : 0;
				const item = {
					...s,
					dash: `${len} ${c - len}`,
					offset
				};
				offset -= len;
				return item;
			}),
			total
		};
	}, [
		slices,
		size,
		stroke
	]);
	const r = (size - stroke) / 2;
	const cx = size / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: `0 0 ${size} ${size}`,
		className: "shrink-0 -rotate-90",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy: cx,
			r,
			fill: "none",
			stroke: "var(--color-surface-2)",
			strokeWidth: stroke
		}), total > 0 && paths.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx,
			cy: cx,
			r,
			fill: "none",
			stroke: p.color,
			strokeWidth: stroke,
			strokeDasharray: p.dash,
			strokeDashoffset: p.offset,
			strokeLinecap: "butt",
			style: { transition: "stroke-dasharray 400ms cubic-bezier(0.22, 1, 0.36, 1), stroke-dashoffset 400ms cubic-bezier(0.22, 1, 0.36, 1)" }
		}, p.id))]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-[transform,background-color,color,opacity,box-shadow] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-[var(--color-accent)] text-[var(--color-accent-fg)] hover:opacity-90",
			secondary: "bg-[var(--color-surface-2)] text-[var(--color-fg)] hover:bg-[var(--color-border-strong)]",
			ghost: "bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-surface-2)]",
			outline: "bg-transparent text-[var(--color-fg)] shadow-[var(--shadow-border)] hover:bg-[var(--color-surface-2)]",
			danger: "bg-[var(--color-danger)] text-white hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-[13px]",
			lg: "h-12 px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-[var(--radius-md)] bg-[var(--color-surface-2)] px-3 text-base text-[var(--color-fg)] shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-[var(--color-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-[var(--color-muted)]", className),
	...props
}));
Label.displayName = Root.displayName;
var CURRENCIES = [
	{
		code: "RUB",
		symbol: "₽",
		nations: ["ru"],
		name: {
			ru: "Российский рубль",
			en: "Russian ruble",
			uk: "Російський рубль",
			kk: "Ресей рублі",
			es: "Rublo ruso",
			fr: "Rouble russe",
			de: "Russischer Rubel",
			pt: "Rublo russo",
			tr: "Rus rublesi",
			az: "Rusiya rublu",
			pl: "Rubel rosyjski",
			it: "Rublo russo"
		}
	},
	{
		code: "USD",
		symbol: "$",
		nations: ["en"],
		name: {
			ru: "Доллар США",
			en: "US dollar",
			uk: "Долар США",
			kk: "АҚШ доллары",
			es: "Dólar estadounidense",
			fr: "Dollar américain",
			de: "US-Dollar",
			pt: "Dólar americano",
			tr: "ABD doları",
			az: "ABŞ dolları",
			pl: "Dolar amerykański",
			it: "Dollaro USA"
		}
	},
	{
		code: "EUR",
		symbol: "€",
		nations: [
			"de",
			"fr",
			"es",
			"it",
			"pt"
		],
		name: {
			ru: "Евро",
			en: "Euro",
			uk: "Євро",
			kk: "Еуро",
			es: "Euro",
			fr: "Euro",
			de: "Euro",
			pt: "Euro",
			tr: "Euro",
			az: "Avro",
			pl: "Euro",
			it: "Euro"
		}
	},
	{
		code: "UAH",
		symbol: "₴",
		nations: ["uk"],
		name: {
			ru: "Гривна",
			en: "Ukrainian hryvnia",
			uk: "Гривня",
			kk: "Гривна",
			es: "Grivna ucraniana",
			fr: "Hryvnia ukrainienne",
			de: "Ukrainische Hrywnja",
			pt: "Hryvnia ucraniana",
			tr: "Ukrayna grivnası",
			az: "Ukrayna qrivnası",
			pl: "Hrywna",
			it: "Grivnia ucraina"
		}
	},
	{
		code: "KZT",
		symbol: "₸",
		nations: ["kk"],
		name: {
			ru: "Тенге",
			en: "Kazakh tenge",
			uk: "Тенге",
			kk: "Теңге",
			es: "Tenge kazajo",
			fr: "Tenge kazakh",
			de: "Kasachischer Tenge",
			pt: "Tenge cazaque",
			tr: "Kazak tengesi",
			az: "Qazax təngəsi",
			pl: "Tenge",
			it: "Tenge kazako"
		}
	},
	{
		code: "BYN",
		symbol: "Br",
		nations: [],
		name: {
			ru: "Белорусский рубль",
			en: "Belarusian ruble",
			uk: "Білоруський рубль",
			kk: "Беларусь рублі",
			es: "Rublo bielorruso",
			fr: "Rouble biélorusse",
			de: "Belarussischer Rubel",
			pt: "Rublo bielorrusso",
			tr: "Belarus rublesi",
			az: "Belarus rublu",
			pl: "Rubel białoruski",
			it: "Rublo bielorusso"
		}
	},
	{
		code: "PLN",
		symbol: "zł",
		nations: ["pl"],
		name: {
			ru: "Злотый",
			en: "Polish zloty",
			uk: "Злотий",
			kk: "Злотый",
			es: "Zloty polaco",
			fr: "Zloty polonais",
			de: "Polnischer Zloty",
			pt: "Zloty polonês",
			tr: "Polonya zlotisi",
			az: "Polşa zlotisi",
			pl: "Polski złoty",
			it: "Zloty polacco"
		}
	},
	{
		code: "CZK",
		symbol: "Kč",
		nations: [],
		name: {
			ru: "Чешская крона",
			en: "Czech koruna",
			uk: "Чеська крона",
			kk: "Чех кронасы",
			es: "Corona checa",
			fr: "Couronne tchèque",
			de: "Tschechische Krone",
			pt: "Coroa checa",
			tr: "Çek korunası",
			az: "Çex kronu",
			pl: "Korona czeska",
			it: "Corona ceca"
		}
	},
	{
		code: "GBP",
		symbol: "£",
		nations: ["en"],
		name: {
			ru: "Фунт стерлингов",
			en: "British pound",
			uk: "Фунт стерлінгів",
			kk: "Фунт стерлинг",
			es: "Libra esterlina",
			fr: "Livre sterling",
			de: "Pfund Sterling",
			pt: "Libra esterlina",
			tr: "İngiliz sterlini",
			az: "Britaniya funtu",
			pl: "Funt szterling",
			it: "Sterlina britannica"
		}
	},
	{
		code: "TRY",
		symbol: "₺",
		nations: ["tr"],
		name: {
			ru: "Турецкая лира",
			en: "Turkish lira",
			uk: "Турецька ліра",
			kk: "Түрік лирасы",
			es: "Lira turca",
			fr: "Livre turque",
			de: "Türkische Lira",
			pt: "Lira turca",
			tr: "Türk lirası",
			az: "Türk lirəsi",
			pl: "Lira turecka",
			it: "Lira turca"
		}
	},
	{
		code: "AZN",
		symbol: "₼",
		nations: ["az"],
		name: {
			ru: "Азербайджанский манат",
			en: "Azerbaijani manat",
			uk: "Азербайджанський манат",
			kk: "Әзірбайжан манаты",
			es: "Manat azerí",
			fr: "Manat azerbaïdjanais",
			de: "Aserbaidschan-Manat",
			pt: "Manat azeri",
			tr: "Azerbaycan manatı",
			az: "Azərbaycan manatı",
			pl: "Manat azerbejdżański",
			it: "Manat azero"
		}
	},
	{
		code: "BRL",
		symbol: "R$",
		nations: ["pt"],
		name: {
			ru: "Бразильский реал",
			en: "Brazilian real",
			uk: "Бразильський реал",
			kk: "Бразилия реалы",
			es: "Real brasileño",
			fr: "Réal brésilien",
			de: "Brasilianischer Real",
			pt: "Real brasileiro",
			tr: "Brezilya reali",
			az: "Braziliya realı",
			pl: "Real brazylijski",
			it: "Real brasiliano"
		}
	},
	{
		code: "CNY",
		symbol: "¥",
		nations: [],
		name: {
			ru: "Китайский юань",
			en: "Chinese yuan",
			uk: "Китайський юань",
			kk: "Қытай юані",
			es: "Yuan chino",
			fr: "Yuan chinois",
			de: "Chinesischer Yuan",
			pt: "Yuan chinês",
			tr: "Çin yuanı",
			az: "Çin yuanı",
			pl: "Yuan chiński",
			it: "Yuan cinese"
		}
	},
	{
		code: "JPY",
		symbol: "¥",
		nations: [],
		name: {
			ru: "Японская иена",
			en: "Japanese yen",
			uk: "Японська єна",
			kk: "Жапон иенасы",
			es: "Yen japonés",
			fr: "Yen japonais",
			de: "Japanischer Yen",
			pt: "Iene japonês",
			tr: "Japon yeni",
			az: "Yapon yeni",
			pl: "Jen japoński",
			it: "Yen giapponese"
		}
	},
	{
		code: "KRW",
		symbol: "₩",
		nations: [],
		name: {
			ru: "Южнокорейская вона",
			en: "South Korean won",
			uk: "Південнокорейська вона",
			kk: "Оңтүстік Корея воны",
			es: "Won surcoreano",
			fr: "Won sud-coréen",
			de: "Südkoreanischer Won",
			pt: "Won sul-coreano",
			tr: "Güney Kore wonu",
			az: "Cənubi Koreya vonu",
			pl: "Won południowokoreański",
			it: "Won sudcoreano"
		}
	},
	{
		code: "INR",
		symbol: "₹",
		nations: [],
		name: {
			ru: "Индийская рупия",
			en: "Indian rupee",
			uk: "Індійська рупія",
			kk: "Үнді рупиясы",
			es: "Rupia india",
			fr: "Roupie indienne",
			de: "Indische Rupie",
			pt: "Rupia indiana",
			tr: "Hindistan rupisi",
			az: "Hindistan rupisi",
			pl: "Rupia indyjska",
			it: "Rupia indiana"
		}
	},
	{
		code: "CHF",
		symbol: "Fr",
		nations: [
			"de",
			"fr",
			"it"
		],
		name: {
			ru: "Швейцарский франк",
			en: "Swiss franc",
			uk: "Швейцарський франк",
			kk: "Швейцария франкі",
			es: "Franco suizo",
			fr: "Franc suisse",
			de: "Schweizer Franken",
			pt: "Franco suíço",
			tr: "İsviçre frangı",
			az: "İsveçrə frankı",
			pl: "Frank szwajcarski",
			it: "Franco svizzero"
		}
	},
	{
		code: "SEK",
		symbol: "kr",
		nations: [],
		name: {
			ru: "Шведская крона",
			en: "Swedish krona",
			uk: "Шведська крона",
			kk: "Швед кронасы",
			es: "Corona sueca",
			fr: "Couronne suédoise",
			de: "Schwedische Krone",
			pt: "Coroa sueca",
			tr: "İsveç kronu",
			az: "İsveç kronu",
			pl: "Korona szwedzka",
			it: "Corona svedese"
		}
	},
	{
		code: "NOK",
		symbol: "kr",
		nations: [],
		name: {
			ru: "Норвежская крона",
			en: "Norwegian krone",
			uk: "Норвезька крона",
			kk: "Норвег кронасы",
			es: "Corona noruega",
			fr: "Couronne norvégienne",
			de: "Norwegische Krone",
			pt: "Coroa norueguesa",
			tr: "Norveç kronu",
			az: "Norveç kronu",
			pl: "Korona norweska",
			it: "Corona norvegese"
		}
	},
	{
		code: "CAD",
		symbol: "C$",
		nations: ["en", "fr"],
		name: {
			ru: "Канадский доллар",
			en: "Canadian dollar",
			uk: "Канадський долар",
			kk: "Канада доллары",
			es: "Dólar canadiense",
			fr: "Dollar canadien",
			de: "Kanadischer Dollar",
			pt: "Dólar canadense",
			tr: "Kanada doları",
			az: "Kanada dolları",
			pl: "Dolar kanadyjski",
			it: "Dollaro canadese"
		}
	},
	{
		code: "AUD",
		symbol: "A$",
		nations: ["en"],
		name: {
			ru: "Австралийский доллар",
			en: "Australian dollar",
			uk: "Австралійський долар",
			kk: "Аустралия доллары",
			es: "Dólar australiano",
			fr: "Dollar australien",
			de: "Australischer Dollar",
			pt: "Dólar australiano",
			tr: "Avustralya doları",
			az: "Avstraliya dolları",
			pl: "Dolar australijski",
			it: "Dollaro australiano"
		}
	},
	{
		code: "MXN",
		symbol: "MX$",
		nations: ["es"],
		name: {
			ru: "Мексиканское песо",
			en: "Mexican peso",
			uk: "Мексиканське песо",
			kk: "Мексика песосы",
			es: "Peso mexicano",
			fr: "Peso mexicain",
			de: "Mexikanischer Peso",
			pt: "Peso mexicano",
			tr: "Meksika pesosu",
			az: "Meksika pesosu",
			pl: "Peso meksykańskie",
			it: "Peso messicano"
		}
	},
	{
		code: "GEL",
		symbol: "₾",
		nations: [],
		name: {
			ru: "Грузинский лари",
			en: "Georgian lari",
			uk: "Грузинський ларі",
			kk: "Грузин лариі",
			es: "Lari georgiano",
			fr: "Lari géorgien",
			de: "Georgischer Lari",
			pt: "Lari georgiano",
			tr: "Gürcistan larisi",
			az: "Gürcü larisi",
			pl: "Lari gruzińskie",
			it: "Lari georgiano"
		}
	},
	{
		code: "AMD",
		symbol: "֏",
		nations: [],
		name: {
			ru: "Армянский драм",
			en: "Armenian dram",
			uk: "Вірменський драм",
			kk: "Армян драмы",
			es: "Dram armenio",
			fr: "Dram arménien",
			de: "Armenischer Dram",
			pt: "Dram armênio",
			tr: "Ermeni dramı",
			az: "Erməni dramı",
			pl: "Dram ormiański",
			it: "Dram armeno"
		}
	},
	{
		code: "UZS",
		symbol: "so'm",
		nations: [],
		name: {
			ru: "Узбекский сум",
			en: "Uzbek som",
			uk: "Узбецький сум",
			kk: "Өзбек сомы",
			es: "Som uzbeko",
			fr: "Sum ouzbek",
			de: "Usbekischer Sum",
			pt: "Som uzbeque",
			tr: "Özbek somu",
			az: "Özbək somu",
			pl: "Sum uzbecki",
			it: "Som uzbeco"
		}
	},
	{
		code: "AED",
		symbol: "د.إ",
		nations: [],
		name: {
			ru: "Дирхам ОАЭ",
			en: "UAE dirham",
			uk: "Дирхам ОАЕ",
			kk: "БАӘ дирхамы",
			es: "Dírham de los EAU",
			fr: "Dirham des EAU",
			de: "VAE-Dirham",
			pt: "Dirham dos EAU",
			tr: "BAE dirhemi",
			az: "BƏƏ dirhəmi",
			pl: "Dirham ZEA",
			it: "Dirham degli EAU"
		}
	}
];
var CURRENCY_BY_CODE = Object.fromEntries(CURRENCIES.map((c) => [c.code, c]));
var DEFAULT_CURRENCY_BY_LANG = {
	ru: "RUB",
	en: "USD",
	uk: "UAH",
	kk: "KZT",
	es: "EUR",
	fr: "EUR",
	de: "EUR",
	pt: "BRL",
	tr: "TRY",
	az: "AZN",
	pl: "PLN",
	it: "EUR"
};
function currencySymbol(code) {
	return CURRENCY_BY_CODE[code]?.symbol ?? code;
}
var LANGUAGES = [
	{
		code: "ru",
		native: "Русский",
		english: "Russian"
	},
	{
		code: "en",
		native: "English",
		english: "English"
	},
	{
		code: "uk",
		native: "Українська",
		english: "Ukrainian"
	},
	{
		code: "kk",
		native: "Қазақша",
		english: "Kazakh"
	},
	{
		code: "es",
		native: "Español",
		english: "Spanish"
	},
	{
		code: "fr",
		native: "Français",
		english: "French"
	},
	{
		code: "de",
		native: "Deutsch",
		english: "German"
	},
	{
		code: "pt",
		native: "Português",
		english: "Portuguese"
	},
	{
		code: "tr",
		native: "Türkçe",
		english: "Turkish"
	},
	{
		code: "az",
		native: "Azərbaycan",
		english: "Azerbaijani"
	},
	{
		code: "pl",
		native: "Polski",
		english: "Polish"
	},
	{
		code: "it",
		native: "Italiano",
		english: "Italian"
	}
];
LANGUAGES.map((l) => l.code);
var dict = {
	ru: {
		appTitle: "Мои траты",
		version: "1.3.0-beta",
		spent: "Потрачено",
		remaining: "Осталось",
		overLimit: "Лимит превышен",
		ofLimit: "из",
		avgPerDay: "В среднем в день",
		topCategory: "Больше всего",
		noTopCategory: "Пока нет лидера",
		periodWeek: "Неделя",
		periodMonth: "Месяц",
		periodAll: "Всё время",
		addExpense: "Добавить трату",
		amount: "Сумма",
		noteOptional: "Комментарий (необязательно)",
		save: "Сохранить",
		cancel: "Отмена",
		delete: "Удалить",
		edit: "Изменить",
		searchHint: "Поиск по категории или комментарию",
		emptyHistory: "Пока пусто — выбери категорию выше, чтобы добавить первую трату.",
		emptySearch: "Ничего не нашлось",
		monthlyLimit: "Лимит на месяц",
		setLimit: "Задать лимит",
		changeLimit: "Изменить лимит",
		noLimit: "Без лимита",
		newCategory: "Новая категория",
		createCategory: "Создать категорию",
		categoryNameHint: "Название категории",
		colorLabel: "Цвет",
		iconLabel: "Иконка",
		ownCategory: "Своя",
		ownCategoryHint: "своя категория",
		errorAmount: "Введи сумму больше нуля",
		errorCategoryName: "Введи название категории",
		settings: "Настройки",
		language: "Язык",
		currency: "Валюта",
		displayCurrency: "Основная валюта",
		expenseCurrency: "Валюта траты",
		theme: "Тема",
		themeDark: "Тёмная",
		themeLight: "Светлая",
		themeSystem: "Как в системе",
		ratesUpdated: "Курсы обновлены",
		ratesOffline: "Офлайн-курсы",
		onboardTitle: "Считать деньги спокойно",
		onboardSub: "Личная книга трат. Всё остаётся на этом устройстве — без аккаунтов и облака.",
		onboardLang: "Язык интерфейса",
		onboardCurrency: "В какой валюте считать",
		onboardLimit: "Месячный лимит (необязательно)",
		onboardSkip: "Пропустить",
		onboardStart: "Начать",
		today: "Сегодня",
		yesterday: "Вчера",
		selectDate: "Дата",
		confirmDelete: "Удалить эту трату?",
		exportData: "Экспорт",
		importData: "Импорт",
		resetData: "Сбросить всё",
		resetConfirm: "Удалить все траты и настройки на этом устройстве?",
		pickCategory: "Категория",
		convertedTo: "в",
		nameLabel: "Как к тебе обращаться",
		namePlaceholder: "необязательно",
		hello: "Привет",
		helloGuest: "Твои траты",
		done: "Готово",
		close: "Закрыть",
		add: "Добавить",
		history: "История",
		thisMonth: "Этот месяц",
		limitHint: "Сумма в основной валюте",
		backupHint: "Копия всех данных в файл JSON",
		imported: "Данные загружены",
		importError: "Не удалось прочитать файл",
		demoFill: "Заполнить примерами",
		demoClear: "Убрать примеры",
		noExpensesDay: "В этот день трат нет",
		customCategory: "Своя категория",
		cat_food: "Еда",
		cat_transport: "Транспорт",
		cat_home: "Жильё",
		cat_fun: "Развлечения",
		cat_health: "Здоровье",
		cat_clothes: "Одежда",
		cat_beauty: "Красота",
		cat_gifts: "Подарки",
		cat_pets: "Питомцы",
		cat_study: "Учёба",
		cat_subs: "Подписки",
		cat_other: "Другое",
		hint_food: "например: шаурма, кофе, продукты",
		hint_transport: "например: такси, бензин, автобус",
		hint_home: "например: аренда, коммуналка",
		hint_fun: "например: кино, игры, концерт",
		hint_health: "например: аптека, врач",
		hint_clothes: "например: кроссовки, куртка",
		hint_beauty: "например: стрижка, косметика",
		hint_gifts: "например: другу, родным",
		hint_pets: "например: корм, ветеринар",
		hint_study: "например: курсы, книги",
		hint_subs: "например: музыка, стриминг",
		hint_other: "что угодно ещё",
		footer: "Локально на устройстве · 1.3.0-beta",
		mixedCurrencies: "в разных валютах",
		allCategories: "Все"
	},
	en: {
		appTitle: "My Expenses",
		version: "1.3.0-beta",
		spent: "Spent",
		remaining: "Left",
		overLimit: "Limit exceeded",
		ofLimit: "of",
		avgPerDay: "Avg. per day",
		topCategory: "Top category",
		noTopCategory: "No leader yet",
		periodWeek: "Week",
		periodMonth: "Month",
		periodAll: "All time",
		addExpense: "Add expense",
		amount: "Amount",
		noteOptional: "Note (optional)",
		save: "Save",
		cancel: "Cancel",
		delete: "Delete",
		edit: "Edit",
		searchHint: "Search by category or note",
		emptyHistory: "Nothing yet — pick a category above to add your first expense.",
		emptySearch: "No matches",
		monthlyLimit: "Monthly limit",
		setLimit: "Set monthly limit",
		changeLimit: "Change limit",
		noLimit: "No limit",
		newCategory: "New category",
		createCategory: "Create category",
		categoryNameHint: "Category name",
		colorLabel: "Color",
		iconLabel: "Icon",
		ownCategory: "Custom",
		ownCategoryHint: "custom category",
		errorAmount: "Enter an amount greater than zero",
		errorCategoryName: "Enter a category name",
		settings: "Settings",
		language: "Language",
		currency: "Currency",
		displayCurrency: "Display currency",
		expenseCurrency: "Expense currency",
		theme: "Theme",
		themeDark: "Dark",
		themeLight: "Light",
		themeSystem: "System",
		ratesUpdated: "Rates updated",
		ratesOffline: "Offline rates",
		onboardTitle: "Count money, quietly",
		onboardSub: "A private ledger. Everything stays on this device — no accounts, no cloud.",
		onboardLang: "Interface language",
		onboardCurrency: "Currency to count in",
		onboardLimit: "Monthly limit (optional)",
		onboardSkip: "Skip",
		onboardStart: "Get started",
		today: "Today",
		yesterday: "Yesterday",
		selectDate: "Date",
		confirmDelete: "Delete this expense?",
		exportData: "Export",
		importData: "Import",
		resetData: "Reset everything",
		resetConfirm: "Delete all expenses and settings on this device?",
		pickCategory: "Category",
		convertedTo: "in",
		nameLabel: "What should we call you",
		namePlaceholder: "optional",
		hello: "Hello",
		helloGuest: "Your expenses",
		done: "Done",
		close: "Close",
		add: "Add",
		history: "History",
		thisMonth: "This month",
		limitHint: "Amount in display currency",
		backupHint: "A JSON copy of everything stored here",
		imported: "Data imported",
		importError: "Could not read that file",
		demoFill: "Fill with examples",
		demoClear: "Remove examples",
		noExpensesDay: "No expenses on this day",
		customCategory: "Custom category",
		cat_food: "Food",
		cat_transport: "Transport",
		cat_home: "Home",
		cat_fun: "Fun",
		cat_health: "Health",
		cat_clothes: "Clothes",
		cat_beauty: "Beauty",
		cat_gifts: "Gifts",
		cat_pets: "Pets",
		cat_study: "Study",
		cat_subs: "Subscriptions",
		cat_other: "Other",
		hint_food: "e.g. shawarma, coffee, groceries",
		hint_transport: "e.g. taxi, fuel, bus",
		hint_home: "e.g. rent, utilities",
		hint_fun: "e.g. movies, games, concert",
		hint_health: "e.g. pharmacy, doctor",
		hint_clothes: "e.g. sneakers, jacket",
		hint_beauty: "e.g. haircut, cosmetics",
		hint_gifts: "e.g. for a friend, family",
		hint_pets: "e.g. food, vet",
		hint_study: "e.g. courses, books",
		hint_subs: "e.g. music, streaming",
		hint_other: "anything else",
		footer: "Stored on this device · 1.3.0-beta",
		mixedCurrencies: "in mixed currencies",
		allCategories: "All"
	},
	uk: {
		appTitle: "Мої витрати",
		version: "1.3.0-beta",
		spent: "Витрачено",
		remaining: "Залишилось",
		overLimit: "Ліміт перевищено",
		ofLimit: "з",
		avgPerDay: "У середньому на день",
		topCategory: "Найбільше",
		noTopCategory: "Поки немає лідера",
		periodWeek: "Тиждень",
		periodMonth: "Місяць",
		periodAll: "Весь час",
		addExpense: "Додати витрату",
		amount: "Сума",
		noteOptional: "Коментар (необов’язково)",
		save: "Зберегти",
		cancel: "Скасувати",
		delete: "Видалити",
		edit: "Змінити",
		searchHint: "Пошук за категорією або коментарем",
		emptyHistory: "Поки порожньо — оберіть категорію вище, щоб додати першу витрату.",
		emptySearch: "Нічого не знайдено",
		monthlyLimit: "Ліміт на місяць",
		setLimit: "Задати ліміт",
		changeLimit: "Змінити ліміт",
		noLimit: "Без ліміту",
		newCategory: "Нова категорія",
		createCategory: "Створити категорію",
		categoryNameHint: "Назва категорії",
		colorLabel: "Колір",
		iconLabel: "Іконка",
		ownCategory: "Своя",
		ownCategoryHint: "своя категорія",
		errorAmount: "Введіть суму більшу за нуль",
		errorCategoryName: "Введіть назву категорії",
		settings: "Налаштування",
		language: "Мова",
		currency: "Валюта",
		displayCurrency: "Основна валюта",
		expenseCurrency: "Валюта витрати",
		theme: "Тема",
		themeDark: "Темна",
		themeLight: "Світла",
		themeSystem: "Як у системі",
		ratesUpdated: "Курси оновлено",
		ratesOffline: "Офлайн-курси",
		onboardTitle: "Рахувати гроші спокійно",
		onboardSub: "Особиста книга витрат. Усе лишається на цьому пристрої — без акаунтів і хмари.",
		onboardLang: "Мова інтерфейсу",
		onboardCurrency: "У якій валюті рахувати",
		onboardLimit: "Місячний ліміт (необов’язково)",
		onboardSkip: "Пропустити",
		onboardStart: "Почати",
		today: "Сьогодні",
		yesterday: "Вчора",
		selectDate: "Дата",
		confirmDelete: "Видалити цю витрату?",
		exportData: "Експорт",
		importData: "Імпорт",
		resetData: "Скинути все",
		resetConfirm: "Видалити всі витрати й налаштування на цьому пристрої?",
		pickCategory: "Категорія",
		convertedTo: "у",
		nameLabel: "Як до тебе звертатись",
		namePlaceholder: "необов’язково",
		hello: "Привіт",
		helloGuest: "Твої витрати",
		done: "Готово",
		close: "Закрити",
		add: "Додати",
		history: "Історія",
		thisMonth: "Цей місяць",
		limitHint: "Сума в основній валюті",
		backupHint: "Копія всіх даних у файл JSON",
		imported: "Дані завантажено",
		importError: "Не вдалося прочитати файл",
		demoFill: "Заповнити прикладами",
		demoClear: "Прибрати приклади",
		noExpensesDay: "Цього дня витрат немає",
		customCategory: "Своя категорія",
		cat_food: "Їжа",
		cat_transport: "Транспорт",
		cat_home: "Житло",
		cat_fun: "Розваги",
		cat_health: "Здоров’я",
		cat_clothes: "Одяг",
		cat_beauty: "Краса",
		cat_gifts: "Подарунки",
		cat_pets: "Улюбленці",
		cat_study: "Навчання",
		cat_subs: "Підписки",
		cat_other: "Інше",
		hint_food: "наприклад: шаурма, кава, продукти",
		hint_transport: "наприклад: таксі, пальне, автобус",
		hint_home: "наприклад: оренда, комуналка",
		hint_fun: "наприклад: кіно, ігри, концерт",
		hint_health: "наприклад: аптека, лікар",
		hint_clothes: "наприклад: кросівки, куртка",
		hint_beauty: "наприклад: стрижка, косметика",
		hint_gifts: "наприклад: другу, рідним",
		hint_pets: "наприклад: корм, ветеринар",
		hint_study: "наприклад: курси, книжки",
		hint_subs: "наприклад: музика, стримінг",
		hint_other: "будь-що інше",
		footer: "Локально на пристрої · 1.3.0-beta",
		mixedCurrencies: "у різних валютах",
		allCategories: "Усі"
	},
	kk: {
		appTitle: "Менің шығындарым",
		version: "1.3.0-beta",
		spent: "Жұмсалды",
		remaining: "Қалды",
		overLimit: "Лимит асты",
		ofLimit: "/",
		avgPerDay: "Күніне орташа",
		topCategory: "Ең көп",
		noTopCategory: "Әзірге көшбасшы жоқ",
		periodWeek: "Апта",
		periodMonth: "Ай",
		periodAll: "Барлық уақыт",
		addExpense: "Шығын қосу",
		amount: "Сома",
		noteOptional: "Ескертпе (міндетті емес)",
		save: "Сақтау",
		cancel: "Бас тарту",
		delete: "Жою",
		edit: "Өзгерту",
		searchHint: "Санат немесе ескертпе бойынша іздеу",
		emptyHistory: "Әзірге бос — алғашқы шығынды қосу үшін жоғарыдан санат таңдаңыз.",
		emptySearch: "Ештеңе табылмады",
		monthlyLimit: "Айлық лимит",
		setLimit: "Лимит қою",
		changeLimit: "Лимитті өзгерту",
		noLimit: "Лимитсіз",
		newCategory: "Жаңа санат",
		createCategory: "Санат құру",
		categoryNameHint: "Санат атауы",
		colorLabel: "Түс",
		iconLabel: "Белгі",
		ownCategory: "Өз санат",
		ownCategoryHint: "өз санаты",
		errorAmount: "Нөлден үлкен сома енгізіңіз",
		errorCategoryName: "Санат атауын енгізіңіз",
		settings: "Баптаулар",
		language: "Тіл",
		currency: "Валюта",
		displayCurrency: "Негізгі валюта",
		expenseCurrency: "Шығын валютасы",
		theme: "Тақырып",
		themeDark: "Қараңғы",
		themeLight: "Жарық",
		themeSystem: "Жүйе бойынша",
		ratesUpdated: "Бағамдар жаңартылды",
		ratesOffline: "Офлайн бағамдар",
		onboardTitle: "Ақшаны байсалды есептеу",
		onboardSub: "Жеке шығын кітабы. Барлығы осы құрылғыда қалады — аккаунт пен бұлт жоқ.",
		onboardLang: "Интерфейс тілі",
		onboardCurrency: "Қай валютада есептеу",
		onboardLimit: "Айлық лимит (міндетті емес)",
		onboardSkip: "Өткізу",
		onboardStart: "Бастау",
		today: "Бүгін",
		yesterday: "Кеше",
		selectDate: "Күні",
		confirmDelete: "Бұл шығынды жою керек пе?",
		exportData: "Экспорт",
		importData: "Импорт",
		resetData: "Барлығын тазалау",
		resetConfirm: "Осы құрылғыдағы барлық шығын мен баптауды жою керек пе?",
		pickCategory: "Санат",
		convertedTo: "",
		nameLabel: "Сізді қалай атау керек",
		namePlaceholder: "міндетті емес",
		hello: "Сәлем",
		helloGuest: "Сіздің шығындарыңыз",
		done: "Дайын",
		close: "Жабу",
		add: "Қосу",
		history: "Тарих",
		thisMonth: "Осы ай",
		limitHint: "Негізгі валютадағы сома",
		backupHint: "Барлық деректердің JSON көшірмесі",
		imported: "Деректер жүктелді",
		importError: "Файлды оқу мүмкін болмады",
		demoFill: "Мысалдармен толтыру",
		demoClear: "Мысалдарды алып тастау",
		noExpensesDay: "Бұл күні шығын жоқ",
		customCategory: "Өз санаты",
		cat_food: "Тамақ",
		cat_transport: "Көлік",
		cat_home: "Тұрғын үй",
		cat_fun: "Ойын-сауық",
		cat_health: "Денсаулық",
		cat_clothes: "Киім",
		cat_beauty: "Сұлулық",
		cat_gifts: "Сыйлықтар",
		cat_pets: "Үй жануарлары",
		cat_study: "Оқу",
		cat_subs: "Жазылымдар",
		cat_other: "Басқа",
		hint_food: "мысалы: шаурма, кофе, азық-түлік",
		hint_transport: "мысалы: такси, бензин, автобус",
		hint_home: "мысалы: жалдау, коммуналдық",
		hint_fun: "мысалы: кино, ойын, концерт",
		hint_health: "мысалы: дәріхана, дәрігер",
		hint_clothes: "мысалы: кроссовка, куртка",
		hint_beauty: "мысалы: шаш қию, косметика",
		hint_gifts: "мысалы: досқа, туысқа",
		hint_pets: "мысалы: жем, ветеринар",
		hint_study: "мысалы: курстар, кітаптар",
		hint_subs: "мысалы: музыка, стриминг",
		hint_other: "басқаның бәрі",
		footer: "Құрылғыда жергілікті · 1.3.0-beta",
		mixedCurrencies: "әр валютада",
		allCategories: "Барлығы"
	},
	es: {
		appTitle: "Mis Gastos",
		version: "1.3.0-beta",
		spent: "Gastado",
		remaining: "Queda",
		overLimit: "Límite superado",
		ofLimit: "de",
		avgPerDay: "Promedio diario",
		topCategory: "Mayor gasto",
		noTopCategory: "Aún no hay líder",
		periodWeek: "Semana",
		periodMonth: "Mes",
		periodAll: "Todo",
		addExpense: "Añadir gasto",
		amount: "Importe",
		noteOptional: "Nota (opcional)",
		save: "Guardar",
		cancel: "Cancelar",
		delete: "Eliminar",
		edit: "Editar",
		searchHint: "Buscar por categoría o nota",
		emptyHistory: "Aún vacío — elige una categoría arriba para el primer gasto.",
		emptySearch: "Sin resultados",
		monthlyLimit: "Límite mensual",
		setLimit: "Fijar límite mensual",
		changeLimit: "Cambiar límite",
		noLimit: "Sin límite",
		newCategory: "Nueva categoría",
		createCategory: "Crear categoría",
		categoryNameHint: "Nombre de la categoría",
		colorLabel: "Color",
		iconLabel: "Icono",
		ownCategory: "Propia",
		ownCategoryHint: "categoría propia",
		errorAmount: "Ingresa un monto mayor que cero",
		errorCategoryName: "Ingresa un nombre de categoría",
		settings: "Ajustes",
		language: "Idioma",
		currency: "Moneda",
		displayCurrency: "Moneda principal",
		expenseCurrency: "Moneda del gasto",
		theme: "Tema",
		themeDark: "Oscuro",
		themeLight: "Claro",
		themeSystem: "Sistema",
		ratesUpdated: "Tipos actualizados",
		ratesOffline: "Tipos sin conexión",
		onboardTitle: "Contar el dinero con calma",
		onboardSub: "Un libro de gastos privado. Todo se queda en este dispositivo — sin cuentas ni nube.",
		onboardLang: "Idioma de la interfaz",
		onboardCurrency: "Moneda para contar",
		onboardLimit: "Límite mensual (opcional)",
		onboardSkip: "Saltar",
		onboardStart: "Empezar",
		today: "Hoy",
		yesterday: "Ayer",
		selectDate: "Fecha",
		confirmDelete: "¿Eliminar este gasto?",
		exportData: "Exportar",
		importData: "Importar",
		resetData: "Restablecer todo",
		resetConfirm: "¿Borrar todos los gastos y ajustes de este dispositivo?",
		pickCategory: "Categoría",
		convertedTo: "en",
		nameLabel: "Cómo te llamamos",
		namePlaceholder: "opcional",
		hello: "Hola",
		helloGuest: "Tus gastos",
		done: "Listo",
		close: "Cerrar",
		add: "Añadir",
		history: "Historial",
		thisMonth: "Este mes",
		limitHint: "Importe en la moneda principal",
		backupHint: "Copia JSON de todos los datos",
		imported: "Datos importados",
		importError: "No se pudo leer el archivo",
		demoFill: "Rellenar con ejemplos",
		demoClear: "Quitar ejemplos",
		noExpensesDay: "No hay gastos este día",
		customCategory: "Categoría propia",
		cat_food: "Comida",
		cat_transport: "Transporte",
		cat_home: "Hogar",
		cat_fun: "Ocio",
		cat_health: "Salud",
		cat_clothes: "Ropa",
		cat_beauty: "Belleza",
		cat_gifts: "Regalos",
		cat_pets: "Mascotas",
		cat_study: "Estudios",
		cat_subs: "Suscripciones",
		cat_other: "Otros",
		hint_food: "ej: shawarma, café, supermercado",
		hint_transport: "ej: taxi, gasolina, bus",
		hint_home: "ej: alquiler, servicios",
		hint_fun: "ej: cine, juego, concierto",
		hint_health: "ej: farmacia, médico",
		hint_clothes: "ej: zapatillas, chaqueta",
		hint_beauty: "ej: peluquería, cosmética",
		hint_gifts: "ej: a un amigo, familia",
		hint_pets: "ej: comida, veterinario",
		hint_study: "ej: cursos, libros",
		hint_subs: "ej: música, streaming",
		hint_other: "cualquier otra cosa",
		footer: "Local en el dispositivo · 1.3.0-beta",
		mixedCurrencies: "en varias monedas",
		allCategories: "Todas"
	},
	fr: {
		appTitle: "Mes dépenses",
		version: "1.3.0-beta",
		spent: "Dépensé",
		remaining: "Reste",
		overLimit: "Limite dépassée",
		ofLimit: "sur",
		avgPerDay: "Moyenne par jour",
		topCategory: "Plus grosse dépense",
		noTopCategory: "Pas encore de leader",
		periodWeek: "Semaine",
		periodMonth: "Mois",
		periodAll: "Tout",
		addExpense: "Ajouter une dépense",
		amount: "Montant",
		noteOptional: "Note (facultatif)",
		save: "Enregistrer",
		cancel: "Annuler",
		delete: "Supprimer",
		edit: "Modifier",
		searchHint: "Rechercher par catégorie ou note",
		emptyHistory: "Encore vide — choisis une catégorie ci-dessus pour la première dépense.",
		emptySearch: "Aucun résultat",
		monthlyLimit: "Limite mensuelle",
		setLimit: "Définir la limite mensuelle",
		changeLimit: "Changer la limite",
		noLimit: "Sans limite",
		newCategory: "Nouvelle catégorie",
		createCategory: "Créer une catégorie",
		categoryNameHint: "Nom de la catégorie",
		colorLabel: "Couleur",
		iconLabel: "Icône",
		ownCategory: "Perso",
		ownCategoryHint: "catégorie personnalisée",
		errorAmount: "Saisis un montant supérieur à zéro",
		errorCategoryName: "Saisis un nom de catégorie",
		settings: "Réglages",
		language: "Langue",
		currency: "Devise",
		displayCurrency: "Devise principale",
		expenseCurrency: "Devise de la dépense",
		theme: "Thème",
		themeDark: "Sombre",
		themeLight: "Clair",
		themeSystem: "Système",
		ratesUpdated: "Taux mis à jour",
		ratesOffline: "Taux hors ligne",
		onboardTitle: "Compter l’argent, tranquillement",
		onboardSub: "Un carnet privé. Tout reste sur cet appareil — sans compte ni nuage.",
		onboardLang: "Langue de l’interface",
		onboardCurrency: "Devise de calcul",
		onboardLimit: "Limite mensuelle (facultatif)",
		onboardSkip: "Passer",
		onboardStart: "Commencer",
		today: "Aujourd’hui",
		yesterday: "Hier",
		selectDate: "Date",
		confirmDelete: "Supprimer cette dépense ?",
		exportData: "Exporter",
		importData: "Importer",
		resetData: "Tout réinitialiser",
		resetConfirm: "Supprimer toutes les dépenses et réglages de cet appareil ?",
		pickCategory: "Catégorie",
		convertedTo: "en",
		nameLabel: "Comment t’appeler",
		namePlaceholder: "facultatif",
		hello: "Salut",
		helloGuest: "Tes dépenses",
		done: "OK",
		close: "Fermer",
		add: "Ajouter",
		history: "Historique",
		thisMonth: "Ce mois",
		limitHint: "Montant dans la devise principale",
		backupHint: "Copie JSON de toutes les données",
		imported: "Données importées",
		importError: "Impossible de lire le fichier",
		demoFill: "Remplir d’exemples",
		demoClear: "Retirer les exemples",
		noExpensesDay: "Aucune dépense ce jour-là",
		customCategory: "Catégorie perso",
		cat_food: "Nourriture",
		cat_transport: "Transport",
		cat_home: "Logement",
		cat_fun: "Loisirs",
		cat_health: "Santé",
		cat_clothes: "Vêtements",
		cat_beauty: "Beauté",
		cat_gifts: "Cadeaux",
		cat_pets: "Animaux",
		cat_study: "Études",
		cat_subs: "Abonnements",
		cat_other: "Autre",
		hint_food: "ex : shawarma, café, courses",
		hint_transport: "ex : taxi, essence, bus",
		hint_home: "ex : loyer, charges",
		hint_fun: "ex : cinéma, jeu, concert",
		hint_health: "ex : pharmacie, médecin",
		hint_clothes: "ex : baskets, veste",
		hint_beauty: "ex : coiffeur, cosmétique",
		hint_gifts: "ex : pour un ami, la famille",
		hint_pets: "ex : nourriture, véto",
		hint_study: "ex : cours, livres",
		hint_subs: "ex : musique, streaming",
		hint_other: "tout le reste",
		footer: "Local sur l’appareil · 1.3.0-beta",
		mixedCurrencies: "en plusieurs devises",
		allCategories: "Toutes"
	},
	de: {
		appTitle: "Meine Ausgaben",
		version: "1.3.0-beta",
		spent: "Ausgegeben",
		remaining: "Übrig",
		overLimit: "Limit überschritten",
		ofLimit: "von",
		avgPerDay: "Ø pro Tag",
		topCategory: "Größte Ausgabe",
		noTopCategory: "Noch kein Spitzenreiter",
		periodWeek: "Woche",
		periodMonth: "Monat",
		periodAll: "Gesamt",
		addExpense: "Ausgabe hinzufügen",
		amount: "Betrag",
		noteOptional: "Notiz (optional)",
		save: "Speichern",
		cancel: "Abbrechen",
		delete: "Löschen",
		edit: "Bearbeiten",
		searchHint: "Nach Kategorie oder Notiz suchen",
		emptyHistory: "Noch leer — wähle oben eine Kategorie für die erste Ausgabe.",
		emptySearch: "Nichts gefunden",
		monthlyLimit: "Monatslimit",
		setLimit: "Monatslimit setzen",
		changeLimit: "Limit ändern",
		noLimit: "Kein Limit",
		newCategory: "Neue Kategorie",
		createCategory: "Kategorie erstellen",
		categoryNameHint: "Kategoriename",
		colorLabel: "Farbe",
		iconLabel: "Symbol",
		ownCategory: "Eigene",
		ownCategoryHint: "eigene Kategorie",
		errorAmount: "Gib einen Betrag größer als null ein",
		errorCategoryName: "Gib einen Kategorienamen ein",
		settings: "Einstellungen",
		language: "Sprache",
		currency: "Währung",
		displayCurrency: "Hauptwährung",
		expenseCurrency: "Währung der Ausgabe",
		theme: "Darstellung",
		themeDark: "Dunkel",
		themeLight: "Hell",
		themeSystem: "System",
		ratesUpdated: "Kurse aktualisiert",
		ratesOffline: "Offline-Kurse",
		onboardTitle: "Geld ruhig zählen",
		onboardSub: "Ein privates Haushaltsbuch. Alles bleibt auf diesem Gerät — ohne Konto, ohne Cloud.",
		onboardLang: "Sprache der Oberfläche",
		onboardCurrency: "Währung zum Zählen",
		onboardLimit: "Monatslimit (optional)",
		onboardSkip: "Überspringen",
		onboardStart: "Loslegen",
		today: "Heute",
		yesterday: "Gestern",
		selectDate: "Datum",
		confirmDelete: "Diese Ausgabe löschen?",
		exportData: "Exportieren",
		importData: "Importieren",
		resetData: "Alles zurücksetzen",
		resetConfirm: "Alle Ausgaben und Einstellungen auf diesem Gerät löschen?",
		pickCategory: "Kategorie",
		convertedTo: "in",
		nameLabel: "Wie sollen wir dich nennen",
		namePlaceholder: "optional",
		hello: "Hallo",
		helloGuest: "Deine Ausgaben",
		done: "Fertig",
		close: "Schließen",
		add: "Hinzufügen",
		history: "Verlauf",
		thisMonth: "Dieser Monat",
		limitHint: "Betrag in der Hauptwährung",
		backupHint: "JSON-Kopie aller Daten",
		imported: "Daten importiert",
		importError: "Datei konnte nicht gelesen werden",
		demoFill: "Mit Beispielen füllen",
		demoClear: "Beispiele entfernen",
		noExpensesDay: "Keine Ausgaben an diesem Tag",
		customCategory: "Eigene Kategorie",
		cat_food: "Essen",
		cat_transport: "Transport",
		cat_home: "Wohnen",
		cat_fun: "Freizeit",
		cat_health: "Gesundheit",
		cat_clothes: "Kleidung",
		cat_beauty: "Schönheit",
		cat_gifts: "Geschenke",
		cat_pets: "Tiere",
		cat_study: "Lernen",
		cat_subs: "Abos",
		cat_other: "Sonstiges",
		hint_food: "z. B. Döner, Kaffee, Lebensmittel",
		hint_transport: "z. B. Taxi, Benzin, Bus",
		hint_home: "z. B. Miete, Nebenkosten",
		hint_fun: "z. B. Kino, Spiele, Konzert",
		hint_health: "z. B. Apotheke, Arzt",
		hint_clothes: "z. B. Sneaker, Jacke",
		hint_beauty: "z. B. Haarschnitt, Kosmetik",
		hint_gifts: "z. B. für Freunde, Familie",
		hint_pets: "z. B. Futter, Tierarzt",
		hint_study: "z. B. Kurse, Bücher",
		hint_subs: "z. B. Musik, Streaming",
		hint_other: "alles andere",
		footer: "Lokal auf dem Gerät · 1.3.0-beta",
		mixedCurrencies: "in verschiedenen Währungen",
		allCategories: "Alle"
	},
	pt: {
		appTitle: "Meus Gastos",
		version: "1.3.0-beta",
		spent: "Gasto",
		remaining: "Restante",
		overLimit: "Limite excedido",
		ofLimit: "de",
		avgPerDay: "Média por dia",
		topCategory: "Maior gasto",
		noTopCategory: "Ainda sem líder",
		periodWeek: "Semana",
		periodMonth: "Mês",
		periodAll: "Tudo",
		addExpense: "Adicionar gasto",
		amount: "Valor",
		noteOptional: "Nota (opcional)",
		save: "Salvar",
		cancel: "Cancelar",
		delete: "Excluir",
		edit: "Editar",
		searchHint: "Buscar por categoria ou nota",
		emptyHistory: "Ainda vazio — escolha uma categoria acima para o primeiro gasto.",
		emptySearch: "Nada encontrado",
		monthlyLimit: "Limite mensal",
		setLimit: "Definir limite mensal",
		changeLimit: "Alterar limite",
		noLimit: "Sem limite",
		newCategory: "Nova categoria",
		createCategory: "Criar categoria",
		categoryNameHint: "Nome da categoria",
		colorLabel: "Cor",
		iconLabel: "Ícone",
		ownCategory: "Própria",
		ownCategoryHint: "categoria própria",
		errorAmount: "Digite um valor maior que zero",
		errorCategoryName: "Digite o nome da categoria",
		settings: "Ajustes",
		language: "Idioma",
		currency: "Moeda",
		displayCurrency: "Moeda principal",
		expenseCurrency: "Moeda do gasto",
		theme: "Tema",
		themeDark: "Escuro",
		themeLight: "Claro",
		themeSystem: "Sistema",
		ratesUpdated: "Cotações atualizadas",
		ratesOffline: "Cotações offline",
		onboardTitle: "Contar o dinheiro com calma",
		onboardSub: "Um livro de gastos privado. Tudo fica neste aparelho — sem contas nem nuvem.",
		onboardLang: "Idioma da interface",
		onboardCurrency: "Moeda para contar",
		onboardLimit: "Limite mensal (opcional)",
		onboardSkip: "Pular",
		onboardStart: "Começar",
		today: "Hoje",
		yesterday: "Ontem",
		selectDate: "Data",
		confirmDelete: "Excluir este gasto?",
		exportData: "Exportar",
		importData: "Importar",
		resetData: "Redefinir tudo",
		resetConfirm: "Apagar todos os gastos e ajustes neste aparelho?",
		pickCategory: "Categoria",
		convertedTo: "em",
		nameLabel: "Como te chamar",
		namePlaceholder: "opcional",
		hello: "Olá",
		helloGuest: "Seus gastos",
		done: "Pronto",
		close: "Fechar",
		add: "Adicionar",
		history: "Histórico",
		thisMonth: "Este mês",
		limitHint: "Valor na moeda principal",
		backupHint: "Cópia JSON de todos os dados",
		imported: "Dados importados",
		importError: "Não foi possível ler o arquivo",
		demoFill: "Preencher com exemplos",
		demoClear: "Remover exemplos",
		noExpensesDay: "Nenhum gasto neste dia",
		customCategory: "Categoria própria",
		cat_food: "Comida",
		cat_transport: "Transporte",
		cat_home: "Moradia",
		cat_fun: "Lazer",
		cat_health: "Saúde",
		cat_clothes: "Roupas",
		cat_beauty: "Beleza",
		cat_gifts: "Presentes",
		cat_pets: "Pets",
		cat_study: "Estudos",
		cat_subs: "Assinaturas",
		cat_other: "Outros",
		hint_food: "ex: shawarma, café, mercado",
		hint_transport: "ex: táxi, combustível, ônibus",
		hint_home: "ex: aluguel, contas",
		hint_fun: "ex: cinema, jogo, show",
		hint_health: "ex: farmácia, médico",
		hint_clothes: "ex: tênis, jaqueta",
		hint_beauty: "ex: corte, cosmética",
		hint_gifts: "ex: para um amigo, família",
		hint_pets: "ex: ração, veterinário",
		hint_study: "ex: cursos, livros",
		hint_subs: "ex: música, streaming",
		hint_other: "qualquer outra coisa",
		footer: "Local no aparelho · 1.3.0-beta",
		mixedCurrencies: "em várias moedas",
		allCategories: "Todas"
	},
	tr: {
		appTitle: "Harcamalarım",
		version: "1.3.0-beta",
		spent: "Harcanan",
		remaining: "Kalan",
		overLimit: "Limit aşıldı",
		ofLimit: "/",
		avgPerDay: "Günlük ortalama",
		topCategory: "En çok",
		noTopCategory: "Henüz lider yok",
		periodWeek: "Hafta",
		periodMonth: "Ay",
		periodAll: "Tüm zamanlar",
		addExpense: "Harcama ekle",
		amount: "Tutar",
		noteOptional: "Not (isteğe bağlı)",
		save: "Kaydet",
		cancel: "Vazgeç",
		delete: "Sil",
		edit: "Düzenle",
		searchHint: "Kategori veya nota göre ara",
		emptyHistory: "Henüz boş — ilk harcama için yukarıdan bir kategori seç.",
		emptySearch: "Sonuç yok",
		monthlyLimit: "Aylık limit",
		setLimit: "Aylık limit koy",
		changeLimit: "Limiti değiştir",
		noLimit: "Limitsiz",
		newCategory: "Yeni kategori",
		createCategory: "Kategori oluştur",
		categoryNameHint: "Kategori adı",
		colorLabel: "Renk",
		iconLabel: "Simge",
		ownCategory: "Özel",
		ownCategoryHint: "özel kategori",
		errorAmount: "Sıfırdan büyük bir tutar gir",
		errorCategoryName: "Kategori adı gir",
		settings: "Ayarlar",
		language: "Dil",
		currency: "Para birimi",
		displayCurrency: "Ana para birimi",
		expenseCurrency: "Harcama para birimi",
		theme: "Tema",
		themeDark: "Koyu",
		themeLight: "Açık",
		themeSystem: "Sistem",
		ratesUpdated: "Kurlar güncellendi",
		ratesOffline: "Çevrimdışı kurlar",
		onboardTitle: "Parayı sakin say",
		onboardSub: "Kişisel gider defteri. Her şey bu cihazda kalır — hesap yok, bulut yok.",
		onboardLang: "Arayüz dili",
		onboardCurrency: "Hangi para biriminde sayılsın",
		onboardLimit: "Aylık limit (isteğe bağlı)",
		onboardSkip: "Atla",
		onboardStart: "Başla",
		today: "Bugün",
		yesterday: "Dün",
		selectDate: "Tarih",
		confirmDelete: "Bu harcama silinsin mi?",
		exportData: "Dışa aktar",
		importData: "İçe aktar",
		resetData: "Her şeyi sıfırla",
		resetConfirm: "Bu cihazdaki tüm harcama ve ayarlar silinsin mi?",
		pickCategory: "Kategori",
		convertedTo: "",
		nameLabel: "Sana nasıl hitap edelim",
		namePlaceholder: "isteğe bağlı",
		hello: "Merhaba",
		helloGuest: "Harcamaların",
		done: "Tamam",
		close: "Kapat",
		add: "Ekle",
		history: "Geçmiş",
		thisMonth: "Bu ay",
		limitHint: "Ana para birimindeki tutar",
		backupHint: "Tüm verilerin JSON kopyası",
		imported: "Veriler yüklendi",
		importError: "Dosya okunamadı",
		demoFill: "Örneklerle doldur",
		demoClear: "Örnekleri kaldır",
		noExpensesDay: "Bu günde harcama yok",
		customCategory: "Özel kategori",
		cat_food: "Yemek",
		cat_transport: "Ulaşım",
		cat_home: "Konut",
		cat_fun: "Eğlence",
		cat_health: "Sağlık",
		cat_clothes: "Giyim",
		cat_beauty: "Güzellik",
		cat_gifts: "Hediyeler",
		cat_pets: "Evcil hayvanlar",
		cat_study: "Eğitim",
		cat_subs: "Abonelikler",
		cat_other: "Diğer",
		hint_food: "örn: dürüm, kahve, market",
		hint_transport: "örn: taksi, benzin, otobüs",
		hint_home: "örn: kira, faturalar",
		hint_fun: "örn: sinema, oyun, konser",
		hint_health: "örn: eczane, doktor",
		hint_clothes: "örn: spor ayakkabı, ceket",
		hint_beauty: "örn: kuaför, kozmetik",
		hint_gifts: "örn: bir dosta, aileye",
		hint_pets: "örn: mama, veteriner",
		hint_study: "örn: kurslar, kitaplar",
		hint_subs: "örn: müzik, yayın",
		hint_other: "her ne olursa",
		footer: "Cihazda yerel · 1.3.0-beta",
		mixedCurrencies: "karışık para birimleri",
		allCategories: "Tümü"
	},
	az: {
		appTitle: "Xərclərim",
		version: "1.3.0-beta",
		spent: "Xərclənib",
		remaining: "Qalıb",
		overLimit: "Limit aşıldı",
		ofLimit: "/",
		avgPerDay: "Gündəlik orta",
		topCategory: "Ən çox",
		noTopCategory: "Hələ lider yoxdur",
		periodWeek: "Həftə",
		periodMonth: "Ay",
		periodAll: "Bütün vaxt",
		addExpense: "Xərc əlavə et",
		amount: "Məbləğ",
		noteOptional: "Qeyd (istəyə bağlı)",
		save: "Yadda saxla",
		cancel: "Ləğv et",
		delete: "Sil",
		edit: "Dəyiş",
		searchHint: "Kateqoriya və ya qeydə görə axtar",
		emptyHistory: "Hələ boşdur — ilk xərc üçün yuxarıdan kateqoriya seç.",
		emptySearch: "Heç nə tapılmadı",
		monthlyLimit: "Aylıq limit",
		setLimit: "Aylıq limit qoy",
		changeLimit: "Limiti dəyiş",
		noLimit: "Limitsiz",
		newCategory: "Yeni kateqoriya",
		createCategory: "Kateqoriya yarat",
		categoryNameHint: "Kateqoriya adı",
		colorLabel: "Rəng",
		iconLabel: "İkon",
		ownCategory: "Öz",
		ownCategoryHint: "öz kateqoriya",
		errorAmount: "Sıfırdan böyük məbləğ daxil et",
		errorCategoryName: "Kateqoriya adı daxil et",
		settings: "Ayarlar",
		language: "Dil",
		currency: "Valyuta",
		displayCurrency: "Əsas valyuta",
		expenseCurrency: "Xərc valyutası",
		theme: "Mövzu",
		themeDark: "Tünd",
		themeLight: "Açıq",
		themeSystem: "Sistem",
		ratesUpdated: "Kurslar yeniləndi",
		ratesOffline: "Oflayn kurslar",
		onboardTitle: "Pulu sakit say",
		onboardSub: "Şəxsi xərc dəftəri. Hər şey bu cihazda qalır — hesab yox, bulud yox.",
		onboardLang: "İnterfeys dili",
		onboardCurrency: "Hansı valyutada sayılsın",
		onboardLimit: "Aylıq limit (istəyə bağlı)",
		onboardSkip: "Keç",
		onboardStart: "Başla",
		today: "Bu gün",
		yesterday: "Dünən",
		selectDate: "Tarix",
		confirmDelete: "Bu xərc silinsin?",
		exportData: "İxrac",
		importData: "İdxal",
		resetData: "Hamısını sıfırla",
		resetConfirm: "Bu cihazdakı bütün xərc və ayarlar silinsin?",
		pickCategory: "Kateqoriya",
		convertedTo: "",
		nameLabel: "Sənə necə müraciət edək",
		namePlaceholder: "istəyə bağlı",
		hello: "Salam",
		helloGuest: "Xərclərin",
		done: "Hazır",
		close: "Bağla",
		add: "Əlavə et",
		history: "Tarixçə",
		thisMonth: "Bu ay",
		limitHint: "Əsas valyutadakı məbləğ",
		backupHint: "Bütün məlumatların JSON nüsxəsi",
		imported: "Məlumat yükləndi",
		importError: "Fayl oxuna bilmədi",
		demoFill: "Nümunələrlə doldur",
		demoClear: "Nümunələri sil",
		noExpensesDay: "Bu gün xərc yoxdur",
		customCategory: "Öz kateqoriya",
		cat_food: "Yemək",
		cat_transport: "Nəqliyyat",
		cat_home: "Ev",
		cat_fun: "Əyləncə",
		cat_health: "Sağlamlıq",
		cat_clothes: "Geyim",
		cat_beauty: "Gözəllik",
		cat_gifts: "Hədiyyələr",
		cat_pets: "Ev heyvanları",
		cat_study: "Təhsil",
		cat_subs: "Abunəliklər",
		cat_other: "Digər",
		hint_food: "məs: şaurma, qəhvə, ərzaq",
		hint_transport: "məs: taksi, benzin, avtobus",
		hint_home: "məs: kirayə, kommunal",
		hint_fun: "məs: kino, oyun, konsert",
		hint_health: "məs: aptek, həkim",
		hint_clothes: "məs: krossovka, gödəkçə",
		hint_beauty: "məs: saç kəsimi, kosmetika",
		hint_gifts: "məs: dosta, ailəyə",
		hint_pets: "məs: yem, baytar",
		hint_study: "məs: kurslar, kitablar",
		hint_subs: "məs: musiqi, yayım",
		hint_other: "hər şey başqa",
		footer: "Cihazda yerli · 1.3.0-beta",
		mixedCurrencies: "müxtəlif valyutalarda",
		allCategories: "Hamısı"
	},
	pl: {
		appTitle: "Moje wydatki",
		version: "1.3.0-beta",
		spent: "Wydane",
		remaining: "Zostało",
		overLimit: "Limit przekroczony",
		ofLimit: "z",
		avgPerDay: "Średnio dziennie",
		topCategory: "Najwięcej",
		noTopCategory: "Jeszcze bez lidera",
		periodWeek: "Tydzień",
		periodMonth: "Miesiąc",
		periodAll: "Całość",
		addExpense: "Dodaj wydatek",
		amount: "Kwota",
		noteOptional: "Notatka (opcjonalnie)",
		save: "Zapisz",
		cancel: "Anuluj",
		delete: "Usuń",
		edit: "Edytuj",
		searchHint: "Szukaj po kategorii lub notatce",
		emptyHistory: "Pusto — wybierz kategorię powyżej, by dodać pierwszy wydatek.",
		emptySearch: "Nic nie znaleziono",
		monthlyLimit: "Limit miesięczny",
		setLimit: "Ustaw limit miesięczny",
		changeLimit: "Zmień limit",
		noLimit: "Bez limitu",
		newCategory: "Nowa kategoria",
		createCategory: "Utwórz kategorię",
		categoryNameHint: "Nazwa kategorii",
		colorLabel: "Kolor",
		iconLabel: "Ikona",
		ownCategory: "Własna",
		ownCategoryHint: "własna kategoria",
		errorAmount: "Podaj kwotę większą od zera",
		errorCategoryName: "Podaj nazwę kategorii",
		settings: "Ustawienia",
		language: "Język",
		currency: "Waluta",
		displayCurrency: "Waluta główna",
		expenseCurrency: "Waluta wydatku",
		theme: "Motyw",
		themeDark: "Ciemny",
		themeLight: "Jasny",
		themeSystem: "Systemowy",
		ratesUpdated: "Kursy zaktualizowane",
		ratesOffline: "Kursy offline",
		onboardTitle: "Liczyć pieniądze spokojnie",
		onboardSub: "Prywatna książka wydatków. Wszystko zostaje na tym urządzeniu — bez konta i chmury.",
		onboardLang: "Język interfejsu",
		onboardCurrency: "W jakiej walucie liczyć",
		onboardLimit: "Limit miesięczny (opcjonalnie)",
		onboardSkip: "Pomiń",
		onboardStart: "Zacznij",
		today: "Dzisiaj",
		yesterday: "Wczoraj",
		selectDate: "Data",
		confirmDelete: "Usunąć ten wydatek?",
		exportData: "Eksport",
		importData: "Import",
		resetData: "Wyczyść wszystko",
		resetConfirm: "Usunąć wszystkie wydatki i ustawienia na tym urządzeniu?",
		pickCategory: "Kategoria",
		convertedTo: "w",
		nameLabel: "Jak się do ciebie zwracać",
		namePlaceholder: "opcjonalnie",
		hello: "Cześć",
		helloGuest: "Twoje wydatki",
		done: "Gotowe",
		close: "Zamknij",
		add: "Dodaj",
		history: "Historia",
		thisMonth: "Ten miesiąc",
		limitHint: "Kwota w walucie głównej",
		backupHint: "Kopia JSON wszystkich danych",
		imported: "Dane wczytane",
		importError: "Nie udało się odczytać pliku",
		demoFill: "Wypełnij przykładami",
		demoClear: "Usuń przykłady",
		noExpensesDay: "Tego dnia brak wydatków",
		customCategory: "Własna kategoria",
		cat_food: "Jedzenie",
		cat_transport: "Transport",
		cat_home: "Mieszkanie",
		cat_fun: "Rozrywka",
		cat_health: "Zdrowie",
		cat_clothes: "Ubrania",
		cat_beauty: "Uroda",
		cat_gifts: "Prezenty",
		cat_pets: "Zwierzęta",
		cat_study: "Nauka",
		cat_subs: "Subskrypcje",
		cat_other: "Inne",
		hint_food: "np. kebab, kawa, zakupy",
		hint_transport: "np. taxi, paliwo, autobus",
		hint_home: "np. czynsz, media",
		hint_fun: "np. kino, gry, koncert",
		hint_health: "np. apteka, lekarz",
		hint_clothes: "np. buty, kurtka",
		hint_beauty: "np. fryzjer, kosmetyki",
		hint_gifts: "np. dla przyjaciela, rodziny",
		hint_pets: "np. karma, weterynarz",
		hint_study: "np. kursy, książki",
		hint_subs: "np. muzyka, streaming",
		hint_other: "cokolwiek innego",
		footer: "Lokalnie na urządzeniu · 1.3.0-beta",
		mixedCurrencies: "w różnych walutach",
		allCategories: "Wszystkie"
	},
	it: {
		appTitle: "Le mie spese",
		version: "1.3.0-beta",
		spent: "Speso",
		remaining: "Rimasto",
		overLimit: "Limite superato",
		ofLimit: "di",
		avgPerDay: "Media al giorno",
		topCategory: "Di più",
		noTopCategory: "Ancora nessun leader",
		periodWeek: "Settimana",
		periodMonth: "Mese",
		periodAll: "Tutto",
		addExpense: "Aggiungi spesa",
		amount: "Importo",
		noteOptional: "Nota (facoltativa)",
		save: "Salva",
		cancel: "Annulla",
		delete: "Elimina",
		edit: "Modifica",
		searchHint: "Cerca per categoria o nota",
		emptyHistory: "Ancora vuoto — scegli una categoria sopra per la prima spesa.",
		emptySearch: "Nessun risultato",
		monthlyLimit: "Limite mensile",
		setLimit: "Imposta limite mensile",
		changeLimit: "Cambia limite",
		noLimit: "Senza limite",
		newCategory: "Nuova categoria",
		createCategory: "Crea categoria",
		categoryNameHint: "Nome della categoria",
		colorLabel: "Colore",
		iconLabel: "Icona",
		ownCategory: "Propria",
		ownCategoryHint: "categoria propria",
		errorAmount: "Inserisci un importo maggiore di zero",
		errorCategoryName: "Inserisci il nome della categoria",
		settings: "Impostazioni",
		language: "Lingua",
		currency: "Valuta",
		displayCurrency: "Valuta principale",
		expenseCurrency: "Valuta della spesa",
		theme: "Tema",
		themeDark: "Scuro",
		themeLight: "Chiaro",
		themeSystem: "Sistema",
		ratesUpdated: "Cambi aggiornati",
		ratesOffline: "Cambi offline",
		onboardTitle: "Contare i soldi con calma",
		onboardSub: "Un libro spese privato. Tutto resta su questo dispositivo — niente account, niente cloud.",
		onboardLang: "Lingua dell’interfaccia",
		onboardCurrency: "Valuta in cui contare",
		onboardLimit: "Limite mensile (facoltativo)",
		onboardSkip: "Salta",
		onboardStart: "Inizia",
		today: "Oggi",
		yesterday: "Ieri",
		selectDate: "Data",
		confirmDelete: "Eliminare questa spesa?",
		exportData: "Esporta",
		importData: "Importa",
		resetData: "Azzera tutto",
		resetConfirm: "Eliminare tutte le spese e le impostazioni su questo dispositivo?",
		pickCategory: "Categoria",
		convertedTo: "in",
		nameLabel: "Come ti chiamiamo",
		namePlaceholder: "facoltativo",
		hello: "Ciao",
		helloGuest: "Le tue spese",
		done: "Fatto",
		close: "Chiudi",
		add: "Aggiungi",
		history: "Cronologia",
		thisMonth: "Questo mese",
		limitHint: "Importo nella valuta principale",
		backupHint: "Copia JSON di tutti i dati",
		imported: "Dati importati",
		importError: "Impossibile leggere il file",
		demoFill: "Riempi con esempi",
		demoClear: "Rimuovi esempi",
		noExpensesDay: "Nessuna spesa in questo giorno",
		customCategory: "Categoria propria",
		cat_food: "Cibo",
		cat_transport: "Trasporti",
		cat_home: "Casa",
		cat_fun: "Svago",
		cat_health: "Salute",
		cat_clothes: "Abbigliamento",
		cat_beauty: "Bellezza",
		cat_gifts: "Regali",
		cat_pets: "Animali",
		cat_study: "Studio",
		cat_subs: "Abbonamenti",
		cat_other: "Altro",
		hint_food: "es. shawarma, caffè, spesa",
		hint_transport: "es. taxi, carburante, bus",
		hint_home: "es. affitto, utenze",
		hint_fun: "es. cinema, giochi, concerto",
		hint_health: "es. farmacia, medico",
		hint_clothes: "es. sneakers, giacca",
		hint_beauty: "es. taglio, cosmetici",
		hint_gifts: "es. per un amico, famiglia",
		hint_pets: "es. cibo, veterinario",
		hint_study: "es. corsi, libri",
		hint_subs: "es. musica, streaming",
		hint_other: "qualunque altra cosa",
		footer: "Locale sul dispositivo · 1.3.0-beta",
		mixedCurrencies: "in valute diverse",
		allCategories: "Tutte"
	}
};
function t(lang, key) {
	return dict[lang][key] ?? dict.en[key];
}
function catName(lang, id, customName) {
	if (customName) return customName;
	const key = `cat_${id}`;
	if (key in dict.en) return t(lang, key);
	return id;
}
function catHint(lang, id) {
	const key = `hint_${id}`;
	if (key in dict.en) return t(lang, key);
	return "";
}
/** Approximate USD-based fallbacks used when the network is unavailable. */
var FALLBACK_USD = {
	USD: 1,
	EUR: .92,
	GBP: .78,
	RUB: 82,
	UAH: 41.5,
	KZT: 510,
	BYN: 3.27,
	PLN: 3.85,
	CZK: 22.8,
	TRY: 39,
	AZN: 1.7,
	BRL: 5.45,
	CNY: 7.18,
	JPY: 149,
	KRW: 1380,
	INR: 84,
	CHF: .86,
	SEK: 10.6,
	NOK: 10.9,
	CAD: 1.37,
	AUD: 1.53,
	MXN: 18.6,
	GEL: 2.72,
	AMD: 387,
	UZS: 12800,
	AED: 3.6725
};
function convert(amount, from, to, quotes) {
	if (from === to) return amount;
	const fromRate = quotes[from] ?? FALLBACK_USD[from] ?? 1;
	const toRate = quotes[to] ?? FALLBACK_USD[to] ?? 1;
	if (!fromRate || !toRate) return amount;
	return amount / fromRate * toRate;
}
async function fetchUsdRates() {
	const res = await fetch("https://open.er-api.com/v6/latest/USD", { headers: { Accept: "application/json" } });
	if (!res.ok) throw new Error("rates");
	const data = await res.json();
	if (data.result !== "success" || !data.rates) throw new Error("rates");
	const wanted = new Set(CURRENCIES.map((c) => c.code));
	const quotes = { USD: 1 };
	for (const code of wanted) {
		const v = data.rates[code];
		if (typeof v === "number" && v > 0) quotes[code] = v;
		else if (FALLBACK_USD[code]) quotes[code] = FALLBACK_USD[code];
	}
	return {
		base: "USD",
		date: data.time_last_update_utc ?? (/* @__PURE__ */ new Date()).toISOString(),
		quotes,
		fetchedAt: Date.now()
	};
}
function quotesOf(cache) {
	return cache?.quotes ?? FALLBACK_USD;
}
var APP_VERSION = "1.3.0-beta";
var STORAGE_KEY = "moi-traty-v13";
function defaults() {
	return {
		version: APP_VERSION,
		expenses: [],
		customCategories: [],
		monthlyLimit: null,
		theme: "dark",
		language: "ru",
		displayCurrency: "RUB",
		onboardingDone: false,
		period: "month",
		lastCategoryId: null,
		rates: null,
		userName: ""
	};
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const dark = theme === "system" ? systemDark : theme === "dark";
	document.documentElement.classList.toggle("dark", dark);
	document.documentElement.style.colorScheme = dark ? "dark" : "light";
}
var useLedger = create()(persist((set, get) => ({
	...defaults(),
	hydrateTheme: () => applyTheme(get().theme),
	setLanguage: (language) => set({ language }),
	setDisplayCurrency: (displayCurrency) => set({ displayCurrency }),
	setTheme: (theme) => {
		applyTheme(theme);
		set({ theme });
	},
	setPeriod: (period) => set({ period }),
	setLastCategory: (lastCategoryId) => set({ lastCategoryId }),
	setMonthlyLimit: (monthlyLimit) => set({ monthlyLimit }),
	setUserName: (userName) => set({ userName }),
	completeOnboarding: (partial) => {
		applyTheme(partial?.theme ?? get().theme);
		set({
			...partial,
			onboardingDone: true
		});
	},
	addExpense: (e) => set({
		expenses: [{
			...e,
			id: uid("exp"),
			createdAt: Date.now(),
			note: e.note.trim()
		}, ...get().expenses],
		lastCategoryId: e.categoryId
	}),
	updateExpense: (id, patch) => set({ expenses: get().expenses.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) }),
	deleteExpense: (id) => set({ expenses: get().expenses.filter((x) => x.id !== id) }),
	addCustomCategory: (c) => {
		const cat = {
			...c,
			id: uid("cat"),
			createdAt: Date.now()
		};
		set({ customCategories: [...get().customCategories, cat] });
		return cat;
	},
	deleteCustomCategory: (id) => set({
		customCategories: get().customCategories.filter((c) => c.id !== id),
		expenses: get().expenses.filter((e) => e.categoryId !== id),
		lastCategoryId: get().lastCategoryId === id ? null : get().lastCategoryId
	}),
	refreshRates: async () => {
		try {
			set({ rates: await fetchUsdRates() });
			return true;
		} catch {
			return false;
		}
	},
	importState: (raw) => {
		if (!raw || typeof raw !== "object") return false;
		const d = raw;
		if (!Array.isArray(d.expenses)) return false;
		set({
			expenses: d.expenses,
			customCategories: Array.isArray(d.customCategories) ? d.customCategories : [],
			monthlyLimit: typeof d.monthlyLimit === "number" || d.monthlyLimit === null ? d.monthlyLimit : get().monthlyLimit,
			theme: d.theme ?? get().theme,
			language: d.language ?? get().language,
			displayCurrency: d.displayCurrency ?? get().displayCurrency,
			period: d.period ?? get().period,
			lastCategoryId: d.lastCategoryId ?? null,
			userName: typeof d.userName === "string" ? d.userName : get().userName,
			onboardingDone: true
		});
		applyTheme(get().theme);
		return true;
	},
	exportState: () => {
		const s = get();
		return JSON.stringify({
			version: APP_VERSION,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			expenses: s.expenses,
			customCategories: s.customCategories,
			monthlyLimit: s.monthlyLimit,
			theme: s.theme,
			language: s.language,
			displayCurrency: s.displayCurrency,
			period: s.period,
			lastCategoryId: s.lastCategoryId,
			userName: s.userName
		}, null, 2);
	},
	resetAll: () => {
		const next = defaults();
		applyTheme(next.theme);
		set({
			...next,
			onboardingDone: false
		});
	},
	seedDemo: () => {
		const { displayCurrency, language } = get();
		const today = /* @__PURE__ */ new Date();
		const iso = (offset) => {
			const d = new Date(today);
			d.setDate(d.getDate() - offset);
			return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
		};
		set({
			expenses: [
				{
					amount: 420,
					currency: displayCurrency,
					categoryId: "food",
					note: language === "en" ? "coffee & lunch" : "",
					date: iso(0)
				},
				{
					amount: 180,
					currency: displayCurrency,
					categoryId: "transport",
					note: "",
					date: iso(0)
				},
				{
					amount: 1290,
					currency: displayCurrency,
					categoryId: "home",
					note: "",
					date: iso(2)
				},
				{
					amount: 650,
					currency: displayCurrency,
					categoryId: "fun",
					note: "",
					date: iso(3)
				},
				{
					amount: 890,
					currency: displayCurrency,
					categoryId: "clothes",
					note: "",
					date: iso(5)
				},
				{
					amount: 299,
					currency: displayCurrency,
					categoryId: "subs",
					note: "",
					date: iso(6)
				},
				{
					amount: 540,
					currency: displayCurrency,
					categoryId: "food",
					note: "",
					date: iso(1)
				},
				{
					amount: 210,
					currency: displayCurrency,
					categoryId: "health",
					note: "",
					date: iso(4)
				}
			].map((e, i) => ({
				...e,
				id: uid("demo"),
				createdAt: Date.now() - i * 1e3
			})),
			monthlyLimit: get().monthlyLimit ?? 25e3
		});
	}
}), {
	name: STORAGE_KEY,
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	}),
	partialize: (s) => ({
		version: s.version,
		expenses: s.expenses,
		customCategories: s.customCategories,
		monthlyLimit: s.monthlyLimit,
		theme: s.theme,
		language: s.language,
		displayCurrency: s.displayCurrency,
		onboardingDone: s.onboardingDone,
		period: s.period,
		lastCategoryId: s.lastCategoryId,
		rates: s.rates,
		userName: s.userName
	}),
	onRehydrateStorage: () => (state) => {
		if (state) applyTheme(state.theme);
	}
}));
function Onboarding() {
	const complete = useLedger((s) => s.completeOnboarding);
	const seedDemo = useLedger((s) => s.seedDemo);
	const initialLang = useLedger((s) => s.language);
	const initialCur = useLedger((s) => s.displayCurrency);
	const [lang, setLang] = (0, import_react.useState)(initialLang);
	const [currency, setCurrency] = (0, import_react.useState)(initialCur);
	const [theme, setTheme] = (0, import_react.useState)("dark");
	const [limit, setLimit] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [withDemo, setWithDemo] = (0, import_react.useState)(false);
	const tr = (k) => t(lang, k);
	function finish() {
		const n = Number(limit.replace(",", "."));
		complete({
			language: lang,
			displayCurrency: currency,
			theme,
			userName: name.trim(),
			monthlyLimit: Number.isFinite(n) && n > 0 ? n : null
		});
		if (withDemo) seedDemo();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-8 pb-[5.5rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-in text-[11px] font-medium tracking-[0.18em] text-[var(--color-muted)] uppercase",
				children: "1.3.0-beta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "rise-in mt-2 font-[family-name:var(--font-display)] text-[1.85rem] leading-[1.15] tracking-[-0.03em] text-[var(--color-fg)] sm:text-[2.15rem]",
				style: { animationDelay: "40ms" },
				children: tr("onboardTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-in mt-2 max-w-md text-sm leading-relaxed text-[var(--color-muted)]",
				style: { animationDelay: "80ms" },
				children: tr("onboardSub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rise-in",
						style: { animationDelay: "120ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: tr("onboardLang") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setLang(l.code);
									setCurrency(DEFAULT_CURRENCY_BY_LANG[l.code]);
								},
								className: cn("h-9 rounded-full px-3 text-sm transition-[background-color,color] duration-150", lang === l.code ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)]"),
								children: l.native
							}, l.code))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rise-in",
						style: { animationDelay: "160ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: tr("onboardCurrency") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: CURRENCIES.slice(0, 12).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setCurrency(c.code),
								className: cn("flex h-9 items-center gap-1.5 rounded-full px-3 text-sm tabular transition-[background-color,color] duration-150", currency === c.code ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)]"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-70",
									children: c.symbol
								})]
							}, c.code))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rise-in grid grid-cols-2 gap-3",
						style: { animationDelay: "200ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: tr("theme") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-2",
							children: ["dark", "light"].map((th) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTheme(th),
								className: cn("h-10 flex-1 rounded-[var(--radius-md)] text-sm", theme === th ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface)] shadow-[var(--shadow-border)]"),
								children: th === "dark" ? tr("themeDark") : tr("themeLight")
							}, th))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: tr("onboardLimit") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2 h-10 tabular",
							inputMode: "decimal",
							placeholder: "—",
							value: limit,
							onChange: (e) => setLimit(e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rise-in",
						style: { animationDelay: "240ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: tr("nameLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2 h-10",
							placeholder: tr("namePlaceholder"),
							value: name,
							onChange: (e) => setName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "rise-in flex min-h-11 items-center gap-3 text-sm text-[var(--color-muted)]",
						style: { animationDelay: "280ms" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: withDemo,
							onChange: (e) => setWithDemo(e.target.checked),
							className: "size-4 accent-[var(--color-accent)]"
						}), tr("demoFill")]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-bg)]/95 px-5 py-3 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-12 w-full",
						onClick: finish,
						children: [tr("onboardStart"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			})
		]
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-[var(--color-border)]", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root$1.displayName;
var Sheet = Dialog$1;
var SheetPortal = DialogPortal$1;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
SheetOverlay.displayName = DialogOverlay$1.displayName;
var SheetContent = import_react.forwardRef(({ className, children, side = "right", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed z-50 flex flex-col bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)] transition ease-[cubic-bezier(0.22,1,0.36,1)] data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-full max-w-md data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", side === "bottom" && "inset-x-0 bottom-0 max-h-[92vh] rounded-t-[var(--radius-xl)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-[var(--radius-sm)] p-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent$1.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-6 pb-2", className),
		...props
	});
}
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-[family-name:var(--font-display)] text-xl font-medium", className),
	...props
}));
SheetTitle.displayName = DialogTitle$1.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-[var(--color-muted)]", className),
	...props
}));
SheetDescription.displayName = DialogDescription$1.displayName;
function SettingsSheet({ open, onOpenChange }) {
	const lang = useLedger((s) => s.language);
	const theme = useLedger((s) => s.theme);
	const currency = useLedger((s) => s.displayCurrency);
	const limit = useLedger((s) => s.monthlyLimit);
	const userName = useLedger((s) => s.userName);
	const rates = useLedger((s) => s.rates);
	const setLanguage = useLedger((s) => s.setLanguage);
	const setTheme = useLedger((s) => s.setTheme);
	const setDisplayCurrency = useLedger((s) => s.setDisplayCurrency);
	const setMonthlyLimit = useLedger((s) => s.setMonthlyLimit);
	const setUserName = useLedger((s) => s.setUserName);
	const exportState = useLedger((s) => s.exportState);
	const importState = useLedger((s) => s.importState);
	const resetAll = useLedger((s) => s.resetAll);
	const refreshRates = useLedger((s) => s.refreshRates);
	const fileRef = (0, import_react.useRef)(null);
	function download() {
		const blob = new Blob([exportState()], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `moi-traty-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}
	async function onFile(file) {
		try {
			const text = await file.text();
			const ok = importState(JSON.parse(text));
			toast(ok ? t(lang, "imported") : t(lang, "importError"));
		} catch {
			toast(t(lang, "importError"));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: t(lang, "settings") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: t(lang, "footer") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 px-6 pb-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "nameLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mt-2",
						value: userName,
						placeholder: t(lang, "namePlaceholder"),
						onChange: (e) => setUserName(e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "language") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLanguage(l.code),
							className: cn("h-10 rounded-[var(--radius-md)] px-3 text-left text-sm", lang === l.code ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface-2)]"),
							children: l.native
						}, l.code))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "displayCurrency") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setDisplayCurrency(c.code),
								className: cn("flex h-9 items-center gap-1.5 rounded-full px-3 text-sm tabular", currency === c.code ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface-2)]"),
								children: [c.code, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-70",
									children: c.symbol
								})]
							}, c.code))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-2 text-xs text-[var(--color-muted)] underline-offset-2 hover:underline",
							onClick: async () => {
								const ok = await refreshRates();
								toast(ok ? t(lang, "ratesUpdated") : t(lang, "ratesOffline"));
							},
							children: rates ? t(lang, "ratesUpdated") : t(lang, "ratesOffline")
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "theme") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex gap-2",
						children: [[
							"dark",
							t(lang, "themeDark"),
							Moon
						], [
							"light",
							t(lang, "themeLight"),
							Sun
						]].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTheme(id),
							className: cn("flex h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm", theme === id ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface-2)]"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
						}, id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "monthlyLimit") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-[var(--color-subtle)]",
							children: t(lang, "limitHint")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2 tabular",
							inputMode: "decimal",
							value: limit ?? "",
							placeholder: "—",
							onChange: (e) => {
								const v = e.target.value.replace(",", ".");
								if (v === "") setMonthlyLimit(null);
								else {
									const n = Number(v);
									if (Number.isFinite(n) && n >= 0) setMonthlyLimit(n);
								}
							}
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--color-subtle)]",
								children: t(lang, "backupHint")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										onClick: download,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), t(lang, "exportData")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										onClick: () => fileRef.current?.click(),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {}), t(lang, "importData")]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "application/json",
										className: "hidden",
										onChange: (e) => {
											const f = e.target.files?.[0];
											if (f) onFile(f);
											e.target.value = "";
										}
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								className: "text-[var(--color-danger)]",
								onClick: () => {
									if (window.confirm(t(lang, "resetConfirm"))) {
										resetAll();
										onOpenChange(false);
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), t(lang, "resetData")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-[var(--color-subtle)]",
						children: ["Moi Traty · ", APP_VERSION]
					})
				]
			})]
		})
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-80 min-w-44 overflow-auto rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-1 text-[var(--color-fg)] shadow-[var(--shadow-border)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm outline-none transition-colors focus:bg-[var(--color-surface-2)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)] py-2 pl-8 pr-3 text-sm outline-none transition-colors focus:bg-[var(--color-surface-2)]", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-4 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-3 py-1.5 text-xs text-[var(--color-muted)]", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-[var(--color-border)]", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-6 text-[var(--color-fg)] shadow-[var(--shadow-border)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-[var(--radius-sm)] p-1 text-[var(--color-muted)] transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-[family-name:var(--font-display)] text-xl font-medium", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-[var(--color-muted)]", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var BUILTIN_CATEGORIES = [
	{
		id: "food",
		color: "#b56a4a",
		icon: "food"
	},
	{
		id: "transport",
		color: "#6d7c8a",
		icon: "transport"
	},
	{
		id: "home",
		color: "#8a7a62",
		icon: "home"
	},
	{
		id: "fun",
		color: "#a56d72",
		icon: "fun"
	},
	{
		id: "health",
		color: "#6f8f6a",
		icon: "health"
	},
	{
		id: "clothes",
		color: "#7a6b5c",
		icon: "clothes"
	},
	{
		id: "beauty",
		color: "#8b7570",
		icon: "beauty"
	},
	{
		id: "gifts",
		color: "#7d8a62",
		icon: "gifts"
	},
	{
		id: "pets",
		color: "#9a7a4a",
		icon: "pets"
	},
	{
		id: "study",
		color: "#5e6e7a",
		icon: "study"
	},
	{
		id: "subs",
		color: "#5f7a78",
		icon: "subs"
	},
	{
		id: "other",
		color: "#7a7a74",
		icon: "other"
	}
];
var CATEGORY_COLORS = [
	"#b56a4a",
	"#6d7c8a",
	"#8a7a62",
	"#a56d72",
	"#6f8f6a",
	"#7a6b5c",
	"#8b7570",
	"#7d8a62",
	"#9a7a4a",
	"#5e6e7a",
	"#5f7a78",
	"#7a7a74",
	"#4f5d4a",
	"#8c5a4a",
	"#4a5a6a"
];
var CUSTOM_ICONS = [
	"star",
	"heart",
	"coffee",
	"car",
	"plane",
	"phone",
	"game",
	"music",
	"wallet",
	"cart",
	"leaf",
	"wrench"
];
function isBuiltin(id) {
	return BUILTIN_CATEGORIES.some((c) => c.id === id);
}
var LOCALE = {
	ru: "ru-RU",
	en: "en-US",
	uk: "uk-UA",
	kk: "kk-KZ",
	es: "es-ES",
	fr: "fr-FR",
	de: "de-DE",
	pt: "pt-BR",
	tr: "tr-TR",
	az: "az-AZ",
	pl: "pl-PL",
	it: "it-IT"
};
function localeOf(lang) {
	return LOCALE[lang];
}
function formatMoney(amount, currency, lang, opts) {
	const abs = Math.abs(amount);
	const maxFrac = opts?.maxFrac ?? (abs >= 1e3 ? 0 : abs >= 100 ? 0 : abs >= 10 ? 1 : 2);
	try {
		return new Intl.NumberFormat(localeOf(lang), {
			style: "currency",
			currency,
			currencyDisplay: "symbol",
			maximumFractionDigits: maxFrac,
			minimumFractionDigits: maxFrac === 0 ? 0 : Math.min(2, maxFrac),
			notation: opts?.compact && abs >= 1e4 ? "compact" : "standard"
		}).format(amount);
	} catch {
		return `${amount.toLocaleString(localeOf(lang), {
			maximumFractionDigits: maxFrac,
			minimumFractionDigits: 0
		})} ${currencySymbol(currency)}`;
	}
}
function isoDate(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseIso(date) {
	const [y, m, d] = date.split("-").map(Number);
	return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function startOfWeek(d) {
	const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	const day = x.getDay();
	const diff = day === 0 ? 6 : day - 1;
	x.setDate(x.getDate() - diff);
	return x;
}
function startOfMonth(d) {
	return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addDays(d, n) {
	const x = new Date(d);
	x.setDate(x.getDate() + n);
	return x;
}
function LedgerApp() {
	const onboardingDone = useLedger((s) => s.onboardingDone);
	const hydrateTheme = useLedger((s) => s.hydrateTheme);
	const refreshRates = useLedger((s) => s.refreshRates);
	const rates = useLedger((s) => s.rates);
	(0, import_react.useEffect)(() => {
		hydrateTheme();
	}, [hydrateTheme]);
	(0, import_react.useEffect)(() => {
		if (!onboardingDone) return;
		if (!rates || Date.now() - rates.fetchedAt > 432e5) refreshRates();
	}, [
		onboardingDone,
		rates,
		refreshRates
	]);
	if (!onboardingDone) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Onboarding, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home$2, {});
}
function Home$2() {
	const lang = useLedger((s) => s.language);
	const theme = useLedger((s) => s.theme);
	const displayCurrency = useLedger((s) => s.displayCurrency);
	const period = useLedger((s) => s.period);
	const setPeriod = useLedger((s) => s.setPeriod);
	const expenses = useLedger((s) => s.expenses);
	const customCategories = useLedger((s) => s.customCategories);
	const monthlyLimit = useLedger((s) => s.monthlyLimit);
	const lastCategoryId = useLedger((s) => s.lastCategoryId);
	const setLastCategory = useLedger((s) => s.setLastCategory);
	const userName = useLedger((s) => s.userName);
	const rates = useLedger((s) => s.rates);
	const addExpense = useLedger((s) => s.addExpense);
	const updateExpense = useLedger((s) => s.updateExpense);
	const deleteExpense = useLedger((s) => s.deleteExpense);
	const addCustomCategory = useLedger((s) => s.addCustomCategory);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [selectedCat, setSelectedCat] = (0, import_react.useState)(lastCategoryId);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(isoDate());
	const [expCurrency, setExpCurrency] = (0, import_react.useState)(displayCurrency);
	const [amountError, setAmountError] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [newCatOpen, setNewCatOpen] = (0, import_react.useState)(false);
	const [newCatName, setNewCatName] = (0, import_react.useState)("");
	const [newCatColor, setNewCatColor] = (0, import_react.useState)(CATEGORY_COLORS[0]);
	const [newCatIcon, setNewCatIcon] = (0, import_react.useState)("star");
	(0, import_react.useEffect)(() => {
		setExpCurrency(displayCurrency);
	}, [displayCurrency]);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
		const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const dark = theme === "system" ? systemDark : theme === "dark";
		document.documentElement.classList.toggle("dark", dark);
	}, [lang, theme]);
	const quotes = quotesOf(rates);
	const toDisplay = (e) => convert(e.amount, e.currency, displayCurrency, quotes);
	const inPeriod = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const from = period === "week" ? startOfWeek(now) : period === "month" ? startOfMonth(now) : null;
		return expenses.filter((e) => {
			if (!from) return true;
			return parseIso(e.date) >= from;
		});
	}, [expenses, period]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return inPeriod;
		return inPeriod.filter((e) => {
			return catName(lang, e.categoryId, customCategories.find((c) => c.id === e.categoryId)?.name).toLowerCase().includes(q) || e.note.toLowerCase().includes(q);
		});
	}, [
		inPeriod,
		query,
		lang,
		customCategories
	]);
	const spent = filtered.reduce((s, e) => s + toDisplay(e), 0);
	const monthSpent = (0, import_react.useMemo)(() => {
		const from = startOfMonth(/* @__PURE__ */ new Date());
		return expenses.filter((e) => parseIso(e.date) >= from).reduce((s, e) => s + toDisplay(e), 0);
	}, [
		expenses,
		displayCurrency,
		quotes
	]);
	const avg = spent / (period === "week" ? 7 : period === "month" ? (/* @__PURE__ */ new Date()).getDate() : Math.max(1, uniqueDays(filtered)));
	const byCat = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const e of filtered) map.set(e.categoryId, (map.get(e.categoryId) ?? 0) + toDisplay(e));
		return [...map.entries()].sort((a, b) => b[1] - a[1]);
	}, [
		filtered,
		displayCurrency,
		quotes
	]);
	const top = byCat[0];
	const slices = byCat.map(([id, value]) => ({
		id,
		value,
		color: colorOf(id, customCategories)
	}));
	const remaining = monthlyLimit != null ? monthlyLimit - monthSpent : null;
	const over = remaining != null && remaining < 0;
	const limitPct = monthlyLimit && monthlyLimit > 0 ? Math.min(100, monthSpent / monthlyLimit * 100) : 0;
	const grouped = (0, import_react.useMemo)(() => groupByDay(filtered), [filtered]);
	function submit() {
		const n = Number(amount.replace(",", "."));
		if (!Number.isFinite(n) || n <= 0) {
			setAmountError(true);
			return;
		}
		if (!selectedCat) return;
		setAmountError(false);
		if (editing) {
			updateExpense(editing.id, {
				amount: n,
				currency: expCurrency,
				categoryId: selectedCat,
				note,
				date
			});
			setEditing(null);
		} else addExpense({
			amount: n,
			currency: expCurrency,
			categoryId: selectedCat,
			note,
			date
		});
		setAmount("");
		setNote("");
		setDate(isoDate());
	}
	function startEdit(e) {
		setEditing(e);
		setSelectedCat(e.categoryId);
		setAmount(String(e.amount));
		setNote(e.note);
		setDate(e.date);
		setExpCurrency(e.currency);
		setLastCategory(e.categoryId);
	}
	function createCat() {
		const name = newCatName.trim();
		if (!name) {
			toast(t(lang, "errorCategoryName"));
			return;
		}
		const cat = addCustomCategory({
			name,
			color: newCatColor,
			icon: newCatIcon
		});
		setSelectedCat(cat.id);
		setLastCategory(cat.id);
		setNewCatOpen(false);
		setNewCatName("");
	}
	const greeting = userName.trim() ? `${t(lang, "hello")}, ${userName.trim()}` : t(lang, "helloGuest");
	const convertedPreview = (() => {
		const n = Number(amount.replace(",", "."));
		if (!Number.isFinite(n) || n <= 0 || expCurrency === displayCurrency) return null;
		return convert(n, expCurrency, displayCurrency, quotes);
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[var(--color-bg)] text-[var(--color-fg)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 pb-28 pt-5 sm:px-6 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-[0.16em] text-[var(--color-muted)] uppercase",
								children: t(lang, "appTitle")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate font-[family-name:var(--font-display)] text-2xl tracking-[-0.03em] sm:text-[1.75rem]",
								children: greeting
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": t(lang, "searchHint"),
								onClick: () => setSearchOpen((v) => !v),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": t(lang, "settings"),
								onClick: () => setSettingsOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-5" })
							})]
						})]
					}),
					searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-subtle)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							autoFocus: true,
							className: "pl-9",
							placeholder: t(lang, "searchHint"),
							value: query,
							onChange: (e) => setQuery(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-1 shadow-[var(--shadow-border)]",
						children: [
							"week",
							"month",
							"all"
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPeriod(p),
							className: cn("h-10 flex-1 rounded-[var(--radius-md)] text-sm font-medium transition-[background-color,color] duration-150", period === p ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "text-[var(--color-muted)]"),
							children: p === "week" ? t(lang, "periodWeek") : p === "month" ? t(lang, "periodMonth") : t(lang, "periodAll")
						}, p))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-4 lg:grid-cols-[1.2fr_0.8fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-border)] sm:p-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase",
											children: t(lang, "spent")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 font-[family-name:var(--font-display)] text-[2.35rem] leading-none tracking-[-0.03em] tabular sm:text-5xl",
											children: formatMoney(spent, displayCurrency, lang)
										}),
										monthlyLimit != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 max-w-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-1.5 flex items-baseline justify-between gap-3 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("font-medium", over ? "text-[var(--color-danger)]" : "text-[var(--color-ok)]"),
													children: over ? t(lang, "overLimit") : `${t(lang, "remaining")} ${formatMoney(remaining ?? 0, displayCurrency, lang)}`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[var(--color-subtle)] tabular",
													children: [
														formatMoney(monthSpent, displayCurrency, lang, { maxFrac: 0 }),
														" ",
														t(lang, "ofLimit"),
														" ",
														formatMoney(monthlyLimit, displayCurrency, lang, { maxFrac: 0 })
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-2)]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: cn("h-full rounded-full transition-[width] duration-300", over ? "bg-[var(--color-danger)]" : "bg-[var(--color-ok)]"),
													style: { width: `${limitPct}%` }
												})
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Donut, { slices })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: t(lang, "avgPerDay"),
									value: formatMoney(avg || 0, displayCurrency, lang)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: t(lang, "topCategory"),
									value: top ? catName(lang, top[0], customCategories.find((c) => c.id === top[0])?.name) : t(lang, "noTopCategory"),
									hint: top ? formatMoney(top[1], displayCurrency, lang) : void 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: t(lang, "thisMonth"),
									value: formatMoney(monthSpent, displayCurrency, lang)
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase",
							children: t(lang, "pickCategory")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-[var(--color-muted)] underline-offset-2 hover:underline",
							onClick: () => setNewCatOpen(true),
							children: t(lang, "newCategory")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
						children: [BUILTIN_CATEGORIES.map((c) => {
							const active = selectedCat === c.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSelectedCat(c.id);
									setLastCategory(c.id);
									setEditing(null);
								},
								className: cn("flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm transition-[background-color,color,box-shadow] duration-150", active ? "text-white" : "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-border)]"),
								style: active ? { backgroundColor: c.color } : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { id: c.icon }), catName(lang, c.id)]
							}, c.id);
						}), customCategories.map((c) => {
							const active = selectedCat === c.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSelectedCat(c.id);
									setLastCategory(c.id);
									setEditing(null);
								},
								className: cn("flex h-11 shrink-0 items-center gap-2 rounded-full px-3.5 text-sm", active ? "text-white" : "bg-[var(--color-surface)] shadow-[var(--shadow-border)]"),
								style: active ? { backgroundColor: c.color } : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { id: c.icon }), c.name]
							}, c.id);
						})]
					})] }),
					selectedCat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-[var(--radius-xl)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-border)] sm:p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: editing ? t(lang, "edit") : t(lang, "addExpense")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[var(--color-muted)]",
									children: catHint(lang, selectedCat) || catName(lang, selectedCat, customCategories.find((c) => c.id === selectedCat)?.name)
								})] }), editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon-sm",
									onClick: () => {
										setEditing(null);
										setAmount("");
										setNote("");
										setDate(isoDate());
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid items-start gap-3 sm:grid-cols-[1fr_auto]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "amount") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "mt-1.5 h-14 font-[family-name:var(--font-display)] text-2xl tabular",
										inputMode: "decimal",
										placeholder: "0",
										value: amount,
										onChange: (e) => {
											setAmount(e.target.value);
											setAmountError(false);
										},
										onKeyDown: (e) => {
											if (e.key === "Enter") submit();
										}
									}),
									amountError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-[var(--color-danger)]",
										children: t(lang, "errorAmount")
									}),
									convertedPreview != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-[var(--color-muted)]",
										children: ["≈ ", formatMoney(convertedPreview, displayCurrency, lang)]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "expenseCurrency") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "mt-1.5 h-14 min-w-32 justify-between px-3 text-base",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular",
											children: [
												expCurrency,
												" ",
												CURRENCIES.find((c) => c.code === expCurrency)?.symbol
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-60" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									align: "end",
									className: "max-h-72 min-w-44",
									children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onSelect: () => setExpCurrency(c.code),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											children: c.code
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular text-[var(--color-muted)]",
											children: c.symbol
										})]
									}, c.code))
								})] })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid gap-3 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "noteOptional") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-1.5",
									value: note,
									onChange: (e) => setNote(e.target.value),
									placeholder: catHint(lang, selectedCat)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "selectDate") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--color-subtle)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										className: "pl-9",
										value: date,
										onChange: (e) => setDate(e.target.value)
									})]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-4 h-12 w-full",
								onClick: submit,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), editing ? t(lang, "save") : t(lang, "add")]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs font-medium tracking-[0.14em] text-[var(--color-muted)] uppercase",
						children: t(lang, "history")
					}), grouped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-[var(--radius-xl)] bg-[var(--color-surface)] px-5 py-10 text-center text-sm leading-relaxed text-[var(--color-muted)] shadow-[var(--shadow-border)]",
						children: query ? t(lang, "emptySearch") : t(lang, "emptyHistory")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-5",
						children: grouped.map(([day, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-medium text-[var(--color-subtle)]",
							children: formatDayLabel(day, lang, t(lang, "today"), t(lang, "yesterday"))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-surface)] shadow-[var(--shadow-border)]",
							children: items.map((e, i) => {
								const custom = customCategories.find((c) => c.id === e.categoryId);
								const color = colorOf(e.categoryId, customCategories);
								const icon = custom?.icon ?? BUILTIN_CATEGORIES.find((c) => c.id === e.categoryId)?.icon ?? "other";
								const converted = toDisplay(e);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("flex items-center gap-3 px-3 py-3", i > 0 && "border-t border-[var(--color-border)]"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-white",
											style: { backgroundColor: color },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
												id: icon,
												className: "size-4"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-medium",
												children: catName(lang, e.categoryId, custom?.name)
											}), e.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-xs text-[var(--color-muted)]",
												children: e.note
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "tabular text-sm font-medium",
												children: formatMoney(e.amount, e.currency, lang)
											}), e.currency !== displayCurrency && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "tabular text-[11px] text-[var(--color-subtle)]",
												children: ["≈ ", formatMoney(converted, displayCurrency, lang)]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "grid size-10 place-items-center text-[var(--color-muted)] hover:text-[var(--color-fg)]",
												"aria-label": t(lang, "edit"),
												onClick: () => startEdit(e),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "grid size-10 place-items-center text-[var(--color-muted)] hover:text-[var(--color-danger)]",
												"aria-label": t(lang, "delete"),
												onClick: () => {
													if (window.confirm(t(lang, "confirmDelete"))) {
														deleteExpense(e.id);
														if (editing?.id === e.id) setEditing(null);
													}
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})]
										})
									]
								}, e.id);
							})
						})] }, day))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pb-4 text-center text-xs text-[var(--color-subtle)]",
						children: t(lang, "footer")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsSheet, {
				open: settingsOpen,
				onOpenChange: setSettingsOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: newCatOpen,
				onOpenChange: setNewCatOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: t(lang, "createCategory") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: t(lang, "ownCategoryHint") })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "categoryNameHint") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "mt-1.5",
								value: newCatName,
								onChange: (e) => setNewCatName(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "colorLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: CATEGORY_COLORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setNewCatColor(c),
									className: cn("size-8 rounded-full", newCatColor === c && "ring-2 ring-[var(--color-ring)] ring-offset-2 ring-offset-[var(--color-surface)]"),
									style: { backgroundColor: c },
									"aria-label": c
								}, c))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t(lang, "iconLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-2",
								children: CUSTOM_ICONS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setNewCatIcon(id),
									className: cn("grid size-10 place-items-center rounded-[var(--radius-md)]", newCatIcon === id ? "bg-[var(--color-accent)] text-[var(--color-accent-fg)]" : "bg-[var(--color-surface-2)]"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, { id })
								}, id))
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setNewCatOpen(false),
						children: t(lang, "cancel")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: createCat,
						children: t(lang, "save")
					})] })
				] })
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-lg)] bg-[var(--color-surface)] px-4 py-3 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-medium tracking-[0.12em] text-[var(--color-muted)] uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate font-[family-name:var(--font-display)] text-xl tracking-tight tabular",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[var(--color-subtle)] tabular",
				children: hint
			}) : null
		]
	});
}
function colorOf(id, custom) {
	if (isBuiltin(id)) return BUILTIN_CATEGORIES.find((c) => c.id === id)?.color ?? "#7a7a74";
	return custom.find((c) => c.id === id)?.color ?? "#7a7a74";
}
function uniqueDays(items) {
	return new Set(items.map((e) => e.date)).size || 1;
}
function groupByDay(items) {
	const map = /* @__PURE__ */ new Map();
	for (const e of items) {
		const list = map.get(e.date) ?? [];
		list.push(e);
		map.set(e.date, list);
	}
	return [...map.entries()].sort((a, b) => a[0] < b[0] ? 1 : -1);
}
function formatDayLabel(iso, lang, todayLabel, yesterdayLabel) {
	const today = isoDate();
	const yest = isoDate(addDays(/* @__PURE__ */ new Date(), -1));
	if (iso === today) return todayLabel;
	if (iso === yest) return yesterdayLabel;
	return parseIso(iso).toLocaleDateString(localeOf(lang), {
		weekday: "short",
		day: "numeric",
		month: "short"
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedgerApp, {});
}
//#endregion
export { Home as component };
