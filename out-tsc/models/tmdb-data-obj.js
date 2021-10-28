// Type guard
export const isMovie = (pet) => pet.title !== undefined;
export const getYear = (item) => { var _a, _b, _c; return (_c = (_b = (_a = (isMovie(item) ? item === null || item === void 0 ? void 0 : item.release_date : item === null || item === void 0 ? void 0 : item.first_air_date)) === null || _a === void 0 ? void 0 : _a.split('-')) === null || _b === void 0 ? void 0 : _b.at(0)) !== null && _c !== void 0 ? _c : ''; };
export var Department;
(function (Department) {
    Department["Acting"] = "Acting";
    Department["Art"] = "Art";
    Department["Camera"] = "Camera";
    Department["CostumeMakeUp"] = "Costume & Make-Up";
    Department["Crew"] = "Crew";
    Department["Directing"] = "Directing";
    Department["Editing"] = "Editing";
    Department["Lighting"] = "Lighting";
    Department["Production"] = "Production";
    Department["Sound"] = "Sound";
    Department["Writing"] = "Writing";
})(Department || (Department = {}));
export var Note;
(function (Note) {
    Note["BluRayDVD"] = "Blu-Ray + DVD";
    Note["Empty"] = "";
    Note["Netflix"] = "Netflix";
    Note["VeniceFilmFestival"] = "Venice Film Festival";
})(Note || (Note = {}));
//# sourceMappingURL=tmdb-data-obj.js.map