#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <cctype>

using namespace std;

void showTasks(const vector<string> &tasks)
{
    cout << "To-Do List:\n";
    for (size_t i = 0; i < tasks.size(); ++i)
    {
        cout << i + 1 << ". " << tasks[i] << '\n';
    }
}

void loadTasks(vector<string> &tasks, const string &filename)
{
    ifstream inputFile(filename);
    if (!inputFile)
    {
        cerr << "Failed to open " << filename << '\n';
        return;
    }

    string task;
    while (getline(inputFile, task))
    {
        tasks.push_back(task);
    }
}

void saveTasks(const vector<string> &tasks, const string &filename)
{
    ofstream outputFile(filename);
    if (!outputFile)
    {
        cerr << "Failed to open " << filename << '\n';
        return;
    }

    for (const auto &task : tasks)
    {
        outputFile << task << '\n';
    }
}

int main()
{
    vector<string> tasks;
    string task;
    char choice;

    loadTasks(tasks, "tasks.txt");

    do
    {
        cout << "A - Add a task\nV - View tasks\nQ - Quit\nEnter your choice: ";
        cin >> choice;
        cin.ignore(); // Clears the input buffer

        switch (tolower(choice))
        {
        case 'a':
            cout << "Enter a task: ";
            getline(cin, task);
            tasks.push_back(task);
            break;
        case 'v':
            showTasks(tasks);
            break;
        }
    } while (tolower(choice) != 'q');

    saveTasks(tasks, "tasks.txt");

    return 0;
}