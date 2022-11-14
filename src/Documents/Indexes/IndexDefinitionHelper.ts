import { IndexType } from "./Enums";
import { throwError } from "../../Exceptions/index";
import { StringUtil } from "../../Utility/StringUtil";
import * as XRegExp from "xregexp";
import { IndexSourceType } from "./IndexSourceType";

const COMMENT_REGEX = XRegExp("(?:/\\*(?:[^*]|(?:\\*+[^*/]))*\\*+/)|(?://.*)", "gm");

export class IndexDefinitionHelper {
    public static detectStaticIndexType(map: string, reduce: string): IndexType {
        if (!map) {
            throwError("InvalidArgumentException", "Index definitions contains no Maps");
        }

        map = IndexDefinitionHelper._stripComments(map);
        map = IndexDefinitionHelper._unifyWhiteSpace(map);

        const mapLower = map.toLocaleLowerCase();

        if (mapLower.startsWith("from")
            || mapLower.startsWith("docs")
            || (mapLower.startsWith("timeseries") && !mapLower.startsWith("timeseries.map"))
            || (mapLower.startsWith("counters") && !mapLower.startsWith("counters.map"))) {
            // C# indexes must start with "from" for query syntax or
            // "docs" for method syntax

            if (StringUtil.isNullOrWhitespace(reduce)) {
                return "Map";
            }
            return "MapReduce";
        }

        if (StringUtil.isNullOrWhitespace(reduce)) {
            return "JavaScriptMap";
        }

        return "JavaScriptMapReduce";
    }

    /**
     * Extract runtime enum notation
     * @param provider
     */
    public static extractEnumNotation(functionBody: string): string {
        functionBody = functionBody.trim();

        if (functionBody.endsWith(";")) {
            return IndexDefinitionHelper.extractEnumNotation(functionBody.substring(0, functionBody.length - 1));
        }

        if (functionBody.startsWith("return")) {
            return IndexDefinitionHelper.extractEnumNotation(functionBody.substring("return".length));
        }

        const openBracketIdx = functionBody.indexOf("{");
        const closeBracketIdx = functionBody.lastIndexOf("}");

        if (openBracketIdx < closeBracketIdx && openBracketIdx !== -1 && closeBracketIdx !== -1) {
            const body = functionBody.substring(openBracketIdx + 1, closeBracketIdx);
            return IndexDefinitionHelper.extractEnumNotation(body);
        }

        const hasArrow = functionBody.indexOf("=>");
        if (hasArrow !== -1) {
            return IndexDefinitionHelper.extractEnumNotation(functionBody.substring(hasArrow + 2));
        }

        const openParentesis = functionBody.indexOf("(");
        const closeParentesis = functionBody.lastIndexOf(")");

        if (openParentesis < closeParentesis && openParentesis !== -1 && closeParentesis !== -1) {
            const body = functionBody.substring(openParentesis + 1, closeParentesis);
            return IndexDefinitionHelper.extractEnumNotation(body);
        }

        return functionBody;
    }

    public static detectStaticIndexSourceType(map: string): IndexSourceType {
        if (StringUtil.isNullOrWhitespace(map)) {
            throwError("InvalidArgumentException", "Value cannot be null or whitespace.");
        }

        map = IndexDefinitionHelper._stripComments(map);
        map = IndexDefinitionHelper._unifyWhiteSpace(map);

        // detect first supported syntax: timeseries.Companies.HeartRate.Where
        const mapLower = map.toLocaleLowerCase();
        if (mapLower.startsWith("timeseries")) {
            return "TimeSeries";
        }

        if (mapLower.startsWith("counters")) {
            return "Counters";
        }

        if (mapLower.startsWith("from")) {
            // detect `from ts in timeseries` or `from ts in timeseries.Users.HeartRate`

            const tokens = mapLower.split(" ", 4)
                .filter(x => !StringUtil.isNullOrEmpty(x));

            if (tokens.length >= 4 && "in" === tokens[2].toLocaleLowerCase()) {
                if (tokens[3].startsWith("timeseries")) {
                    return "TimeSeries";
                }
                if (tokens[3].startsWith("counters")) {
                    return "Counters";
                }
            }
        }

        // fallback to documents based index
        return "Documents";
    }

    private static _stripComments(input: string): string {
        return input.replace(COMMENT_REGEX, "").trim();
    }

    private static _unifyWhiteSpace(input: string): string {
        return input.replace(/(\s+)/g, " ");
    }
}
