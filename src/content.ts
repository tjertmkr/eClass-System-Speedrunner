const root = window.location.protocol + "//" + window.location.host + '/';
const createComponent = (
    query: string, 
    id: string,
    backgroundColor: string, 
    name: string,
    kj: string,
    to: string
): HTMLElement => {
    let element = document.createElement(query)
    element.id = id;
    element.innerHTML = `<span>${name}</span>`;
    element.style.backgroundColor = backgroundColor;
    element.addEventListener("click", function() {
        load(kj);
        document.location.href = root + to;
    });

    return element;
}
const load = (kjkey: string) => {
    $.ajax({
        url: "/ilos/st/course/eclass_room2.acl",
        type: "POST",
        data: {
            KJKEY: kjkey,
            returnData: "json",
            returnURI: "/ilos/st/course/submain_form.acl",
            encoding: "utf-8"
        },
        async: false
    });
}

document.addEventListener("readystatechange", () => {
    const boxs = document.getElementsByClassName("m-box2")[0];
    const eClassRooms = boxs.querySelector("ol")?.children;

    if (eClassRooms !== undefined) { 
        for (let i = 0; i < eClassRooms.length; i++) {
            const t = eClassRooms[i];

            if (t.className == "term_info" || eClassRooms.length - 1 == i) continue;
            else {
                const span = t.querySelector("span");
                const kj = t.querySelector("em")?.getAttribute("kj") as string;

                t.insertBefore(document.createElement("div"), span); // add empty element
                t.insertBefore(createComponent(
                    "div", 
                    "direct", 
                    "orange", 
                    "과제",
                    kj,
                    "ilos/st/course/report_list_form.acl"), 
                    span
                );
                t.insertBefore(createComponent(
                    "div", 
                    "direct", 
                    "green", 
                    "출석",
                    kj,
                    "ilos/st/course/attendance_list_form.acl"), 
                    span
                );
            }
        }
    }
})