
export function formatMoney(money) {
    const { gold, silver, copper } = money;
    let res = "";

    if (gold) res += `${gold} Gold`;
    if (silver) res += `${gold ? ', ' : ''}${silver} Silver`;
    if (copper) res += `${gold || silver ? ', ' : ''}${copper} Copper`;

    return res;
}