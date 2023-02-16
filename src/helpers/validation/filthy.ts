const badPatterns = [
    '.*(о|а)н(о|а)нист.*',
    '.*ошар.*',
    '.*к(а|о)злина$',
    '.*к(о|а)зел$',
    '.*сволоч(ь|ъ|и|уга|ам|ами).*',
    '.*лох[уеыаоэяию].*',
    '.*урод(ы|у|ам|ина|ины).*',
    '.*бля(т|д).*',
    '.*гандо.*',
    '.*м(а|о)нд(а|о).*',
    '.*сперма.*',
    '.*[уеыаоэяию]еб$',
    '.*сучк(а|у|и|е|ой|ай).*',
    '.*придур(ок|ки).*',
    '.*д(е|и)би(л|лы).*',
    '.*сос(ать|и|ешь|у)$',
    '.*залуп.*',
    '.*муд(е|ил|о|а|я|еб).*',
    '.*шалав(а|ы|ам|е|ами).*',
    '.*пр(а|о)ст(и|е)т(у|е)тк(а|и|ам|е|ами).*',
    '.*шлюх(а|и|ам|е|ами).*',
    '.*ху(й|и|я|е|л(и|е)|йло).*',
    '.*п(и|е|ы)зд.*',
    '.*бл(я|т|д).*',
    '.*(с|сц)ук(а|о|и|у).*',
    '^еб.*',
    '.*(д(о|а)лб(о|а)|разъ|разь|за|вы|по)ебы*.*',
    '.*пид(а|о|е)р.*',
    '.*хер.*',
]

export default (word: string) => {
    return !badPatterns.find((pattern) => new RegExp(pattern, 'i').test(word))
}